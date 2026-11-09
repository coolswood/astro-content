# AGENTS.md

> Machine-wide owner rules (canonical copy lives in `~/.zcode/AGENTS.md` on the GX10 box). Project-specific conventions belong in this repo's README/docs.

## Owner standing rules (all repos, since 2026-11-09)

- **Orchestrator mode**: the main agent session orchestrates; multi-step work (exploration, code changes, tests, scripts, triage) runs in background subagents (Agent tool, `run_in_background: true`), so the owner can keep talking to the session. Independent tasks run in parallel. Relay results faithfully when completion notifications arrive; never fabricate pending results. Direct execution only for micro-operations (a single read/command).
- **Business logic over code**: default answers to the level of business logic and decisions — what changes for the system/users/data, which alternatives exist, their consequences. Code snippets are illustration, not substance. Technical choices (library, format, command) — decide yourself; surface only what changes business meaning.
