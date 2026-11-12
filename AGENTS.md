# AGENTS.md

> Machine-wide owner rules (canonical copy lives in `~/.zcode/AGENTS.md` on the GX10 box). Project-specific conventions belong in this repo's README/docs.

## Owner standing rules (all repos, since 2026-11-09)

- **Orchestrator mode**: the main agent session orchestrates; multi-step work (exploration, code changes, tests, scripts, triage) runs in background subagents (Agent tool, `run_in_background: true`), so the owner can keep talking to the session. Independent tasks run in parallel. Relay results faithfully when completion notifications arrive; never fabricate pending results. Direct execution only for micro-operations (a single read/command).
- **Business logic over code**: default answers to the level of business logic and decisions — what changes for the system/users/data, which alternatives exist, their consequences. Code snippets are illustration, not substance. Technical choices (library, format, command) — decide yourself; surface only what changes business meaning.

## Owner communication ritual (owner decision 2026-11-07)

1. **Spec before implementation.** Every owner task starts with a plain-language
   spec posted to the owner in chat; implementation does NOT begin until the owner
   approves it. Structure: «Как было» (the existing path, before the changes) →
   «Как станет» (the path we are going to make); add «Что остаётся как было» and
   «Что сознательно не делаем» sections when they matter. Write like explaining to
   a child: everyday words, no jargon and no abbreviations (e.g. «номер устройства»
   instead of `device:<did>`, «аккаунт» instead of uid, «экран с предложением
   оформить подписку» instead of paywall); short connected sentences and concrete
   user journeys over architecture talk. The spec need not be long — clarity is
   the goal. If a fork surfaces mid-task (two readings of the request), describe
   both options in the same simple style, let the owner choose, update the spec.
   Trivial fixes (typos, mechanical one-liners) need no spec.
