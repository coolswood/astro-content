"""Шим подписки Antigravity (agy CLI) → OpenAI-совместимый /v1 (для translate.ts).

Копия механизма ~/pr-agent-lab/agy_proxy.py (лаба — автор; здесь адаптированная
ветка под конвейер перевода): старшая модель Gemini из ПОДПИСКИ Google (токены
разработки, не API-ключ) для отдельных стадий конвейера — «критик, а не
генератор» (review-стадия, слепой судья qa/eval.ts). Авторизация живёт у agy CLI
(~/.gemini/antigravity-cli, `agy login`), вызов headless — промпт в stdin
(--input-format text), ответ одним JSON-конвертом (--output-format json).
Каждый вызов тащит ~12k input-токенов системного промпта агента — плановая плата
за подписочную авторизацию, поэтому беречь = минимизировать ЧИСЛО вызовов.

Маршрутизация по имени модели в теле запроса (единый endpoint для раннера):
  gemini-*/claude-*/gpt-oss-*       → agy CLI (подписка, семафор AGY_MAX_CONCURRENCY)
  всё остальное (google/gemma-*...) → насквозь к локальному vLLM (UPSTREAM).
Раннер с --stage-model review=gemini-3.1-pro-high держит один --endpoint на этот
шим: bulk-стадии идут пасструзом на gemma, старшая модель — только там, где решено.

Не-модифицирующие параметры запроса (temperature, max_tokens, response_format,
top_p) agy не принимает — игнорируются; streaming эмулируется одним чанком.
Не-SUCCESS конверт или пустой response → HTTP 502 (клиент считает это ошибкой
провайдера). /v1/models отдаёт upstream-список + модели agy (кэш `agy models`),
чтобы preflight VllmClient проходил и для подписочных имён.

Порт 127.0.0.1:8107 (только loopback). Запуск (зависимости — venv pr-agent-лабы):
  TRANSLATE_AGY_PORT=8107 TRANSLATE_AGY_UPSTREAM=http://127.0.0.1:8000 \
    uv run --project ~/pr-agent-lab/pr-agent python scripts/agy_proxy.py
"""
import asyncio
import json
import logging
import os
import signal
import time
import uuid
from contextlib import asynccontextmanager
from pathlib import Path

import httpx
import uvicorn
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.responses import JSONResponse, StreamingResponse
from starlette.routing import Route

AGY_BIN = os.environ.get("AGY_BIN", str(Path.home() / ".local/bin/agy"))
UPSTREAM_BASE = os.environ.get("TRANSLATE_AGY_UPSTREAM", "http://127.0.0.1:8000")
PORT = int(os.environ.get("TRANSLATE_AGY_PORT", "8107"))
MAX_CONCURRENCY = int(os.environ.get("AGY_MAX_CONCURRENCY", "2"))
# Запас на ожидание в семафоре прокси: клиентский таймаут translate.ts — 300 c.
AGY_TIMEOUT = int(os.environ.get("AGY_TIMEOUT", "540"))
# Модели каталога agy (см. `agy models`); префикс "agy/" допустим в конфиге.
AGY_PREFIXES = ("gemini-", "claude-", "gpt-oss-")
SOURCE = "astro-translate-agy"

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("agy-proxy")

sem = asyncio.Semaphore(MAX_CONCURRENCY)
state = {"agy_calls": 0, "agy_errors": 0, "agy_inflight": 0, "passthrough": 0}

HOP = {"host", "content-length", "connection", "transfer-encoding", "keep-alive"}


def agy_model_of(name: str) -> str | None:
    """Имя модели agy из запроса или None, если модель не подписочная."""
    if not name:
        return None
    for p in ("openai/", "agy/"):
        if name.startswith(p):
            name = name[len(p):]
    return name if name.startswith(AGY_PREFIXES) else None


def build_prompt(messages: list[dict]) -> str:
    """Сообщения OpenAI → один промпт для однопроходного вызова agy.

    Общий случай pr-agent — один system + один user; диалоговые повороты
    (few-shot в describe/improve) размечаются префиксами ролей.
    """
    system, turns = [], []
    for m in messages:
        role, content = m.get("role", "user"), str(m.get("content") or "")
        if role == "system":
            system.append(content)
        else:
            turns.append(f"{'User' if role == 'user' else 'Assistant'}: {content}")
    parts = ["\n\n".join(system)] if system else []
    parts.extend(turns)
    return "\n\n".join(p for p in parts if p.strip())


async def call_agy(model: str, prompt: str) -> dict:
    """Один headless-вызов agy; возвращает контент и usage в формате OpenAI.

    Бросает RuntimeError с человекочитаемой причиной →Handler отдаёт 502.
    """
    cmd = [AGY_BIN, "--input-format", "text", "--output-format", "json",
           "--model", model, "--print-timeout", f"{AGY_TIMEOUT}s"]
    # agy — агентный CLI: запускаем в пустом каталоге, чтобы он не считывал
    # чекаут репозитория вокруг и не пытался работать с файлами проекта.
    cwd = Path(os.environ.get("AGY_WORKDIR", "/tmp")) / f"agy-shim-{os.getpid()}"
    cwd.mkdir(exist_ok=True)

    proc = await asyncio.create_subprocess_exec(
        *cmd, stdin=asyncio.subprocess.PIPE, stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE, start_new_session=True, cwd=str(cwd))
    try:
        out, err = await asyncio.wait_for(
            proc.communicate(prompt.encode()), AGY_TIMEOUT + 15)
    except asyncio.TimeoutError:
        # Группа процессов (start_new_session): убиваем agy с его детьми.
        try:
            os.killpg(proc.pid, signal.SIGKILL)
        except ProcessLookupError:
            pass
        raise RuntimeError(f"agy timeout after {AGY_TIMEOUT}s (model={model})") from None

    if proc.returncode != 0:
        detail = err.decode(errors="replace")[-800:] or f"exit {proc.returncode}"
        raise RuntimeError(f"agy exit {proc.returncode}: {detail}")
    try:
        envelope = json.loads(out)
    except ValueError:
        raise RuntimeError(f"agy: не-JSON ответ: {out[:300]!r}") from None

    if envelope.get("status") != "SUCCESS":
        raise RuntimeError(f"agy status={envelope.get('status')}: "
                           f"{str(envelope.get('response'))[:300]}")
    content = envelope.get("response")
    if not content or not content.strip():
        raise RuntimeError("agy: пустой response при SUCCESS")

    u = envelope.get("usage") or {}
    return {
        "content": content,
        "usage": {
            "prompt_tokens": u.get("input_tokens", 0) + u.get("cache_read_tokens", 0),
            "completion_tokens": u.get("output_tokens", 0) + u.get("thinking_tokens", 0),
            "total_tokens": u.get("total_tokens", 0),
        },
    }


def completion_payload(model: str, content: str, usage: dict) -> dict:
    return {
        "id": f"chatcmpl-agy-{uuid.uuid4().hex[:12]}",
        "object": "chat.completion",
        "created": int(time.time()),
        "model": model,
        "choices": [{"index": 0, "finish_reason": "stop",
                     "message": {"role": "assistant", "content": content}}],
        "usage": usage,
    }


async def health(request: Request):
    return JSONResponse({
        "ok": True,
        "agy_bin": AGY_BIN,
        "upstream": UPSTREAM_BASE,
        "max_concurrency": MAX_CONCURRENCY,
        "agy_timeout": AGY_TIMEOUT,
        "prefixes": list(AGY_PREFIXES),
        **state,
    })


agy_models_cache: list[str] | None = None


async def agy_model_ids() -> list[str]:
    """Кэш вывода `agy models` (id первой колонки); сбой → пустой список."""
    global agy_models_cache
    if agy_models_cache is None:
        try:
            proc = await asyncio.create_subprocess_exec(
                AGY_BIN, "models", stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.DEVNULL)
            out, _ = await asyncio.wait_for(proc.communicate(), 30)
            ids = [ln.split("\t")[0].strip() for ln in out.decode(errors="replace").splitlines()]
            agy_models_cache = [i for i in ids if i.startswith(AGY_PREFIXES)]
        except Exception as e:  # noqa: BLE001 — каталог не критичен для ретинга
            log.warning("agy models недоступен: %s", e)
            agy_models_cache = []
    return agy_models_cache


async def models(request: Request):
    """Upstream-модели + подписочные agy: preflight VllmClient проверяет имя
    модели в этом списке, и без agy-имён судья/стадии на gemini-* не стартуют."""
    ids: list[str] = []
    client: httpx.AsyncClient = request.app.state.client
    try:
        resp = await client.get("/v1/models")
        ids = [m.get("id") for m in resp.json().get("data", []) if m.get("id")]
    except Exception as e:  # noqa: BLE001
        log.warning("upstream /v1/models недоступен: %s", e)
    ids.extend(m for m in await agy_model_ids() if m not in ids)
    return JSONResponse({"object": "list", "data": [{"id": i} for i in ids]})


async def chat_completions(request: Request):
    body = await request.body()
    try:
        data = json.loads(body)
    except ValueError:
        return JSONResponse({"error": {"message": "invalid JSON body"}}, status_code=400)

    model = agy_model_of(str(data.get("model") or ""))
    if model is None:
        return await passthrough(request, body)

    messages = data.get("messages") or []
    prompt = build_prompt(messages)
    state["waiting"] = state.get("waiting", 0) + 1
    await sem.acquire()
    state["waiting"] -= 1
    state["agy_inflight"] += 1
    state["agy_calls"] += 1
    started = time.monotonic()
    try:
        result = await call_agy(model, prompt)
    except RuntimeError as e:
        state["agy_errors"] += 1
        log.warning("agy ошибка (%.1fs): %s", time.monotonic() - started, e)
        return JSONResponse({"error": {"message": str(e), "type": "agy_error",
                                       "source": SOURCE}}, status_code=502)
    else:
        log.info("agy %s: %.1fs, in=%d out=%d", model, time.monotonic() - started,
                 result["usage"]["prompt_tokens"], result["usage"]["completion_tokens"])
    finally:
        state["agy_inflight"] -= 1
        sem.release()

    payload = completion_payload(model, result["content"], result["usage"])
    if data.get("stream"):
        # Один чанк из полного ответа + [DONE] — клиенту нужен SSE-поток.
        chunk = {"id": payload["id"], "object": "chat.completion.chunk",
                 "created": payload["created"], "model": model,
                 "choices": [{"index": 0, "finish_reason": None,
                              "delta": {"role": "assistant", "content": result["content"]}}]}
        stop = dict(chunk, choices=[{"index": 0, "finish_reason": "stop", "delta": {}}])

        async def sse():
            for c in (chunk, stop):
                yield f"data: {json.dumps(c, ensure_ascii=False)}\n\n"
            yield "data: [DONE]\n\n"
        return StreamingResponse(sse(), media_type="text/event-stream")
    return JSONResponse(payload)


async def passthrough(request: Request, body: bytes | None = None):
    """Не-agy трафик (локальная gemma из translate.config.json) — к vLLM насквозь."""
    if body is None:
        body = await request.body()
    state["passthrough"] += 1
    headers = {k: v for k, v in request.headers.items() if k.lower() not in HOP}
    client: httpx.AsyncClient = request.app.state.client
    try:
        upstream = client.build_request(request.method, request.url.path,
                                        params=dict(request.query_params),
                                        content=body, headers=headers)
        resp = await client.send(upstream, stream=True)
    except httpx.HTTPError as e:
        log.warning("upstream недоступен: %s", e)
        return JSONResponse({"error": f"upstream unreachable: {e}"}, status_code=502)

    resp_headers = {k: v for k, v in resp.headers.items() if k.lower() not in HOP}

    async def stream():
        try:
            async for chunk in resp.aiter_raw():
                yield chunk
        finally:
            await resp.aclose()

    return StreamingResponse(stream(), status_code=resp.status_code, headers=resp_headers)


@asynccontextmanager
async def lifespan(app: Starlette):
    app.state.client = httpx.AsyncClient(
        base_url=UPSTREAM_BASE, timeout=httpx.Timeout(900.0, connect=10.0))
    log.info("agy-шим translate на 127.0.0.1:%d → %s | подписка: %s (конкуррентность %d, таймаут %ds)",
             PORT, UPSTREAM_BASE, AGY_BIN, MAX_CONCURRENCY, AGY_TIMEOUT)
    yield
    await app.state.client.aclose()


async def catch_all(request: Request):
    return await passthrough(request)


app = Starlette(
    routes=[
        Route("/health", health),
        Route("/v1/models", models, methods=["GET"]),
        Route("/v1/chat/completions", chat_completions, methods=["POST"]),
        Route("/{path:path}", catch_all,
              methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]),
    ],
    lifespan=lifespan,
)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=PORT, log_level="warning")
