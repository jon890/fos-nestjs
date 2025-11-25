# Repository Guidelines

## Project Structure & Module Organization
- Source lives in `src/`. `main.ts` boots Nest via Vite; `app.module.ts` wires Config, Drizzle, telemetry, and request logging.
- Business logic follows a DDD-ish split under `src/fosplace`: `domain` (entities/services/repositories) and `infra` (mappers, Drizzle repositories, schemas); modules live in `application`.
- Shared concerns: `src/config` (env-backed settings), `src/drizzle` (DB bootstrap), `src/middleware` (logging), `src/telemetry` (OTel SDK setup).
- Database migrations and Drizzle config sit in `drizzle/`; build output lands in `dist/`. Docs/notes belong in `docs/` when applicable.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (pnpm is expected).
- `pnpm start:dev` — run the server with Vite’s dev server (vite-plugin-node); hot reload for backend routes.
- `pnpm start:debug` — dev server with the inspector open for debugging.
- `pnpm build` — Vite build; outputs to `dist/` for production.
- `pnpm start:prod` — run the compiled app from `dist/main`.
- `pnpm lint` / `pnpm format` — lint with ESLint and format with Prettier.
- `pnpm db:generate` / `pnpm db:push` — generate or push Drizzle migrations using `drizzle/drizzle.config.ts`; ensure env vars are set.

## Coding Style & Naming Conventions
- TypeScript, NestJS, and Vite. Prefer 2-space indentation and Prettier defaults; run `pnpm format` before committing.
- Keep files kebab-case with dotted roles (e.g., `order.repository.drizzle.ts`). Classes are PascalCase, instances camelCase, constants SCREAMING_SNAKE_CASE.
- Follow Nest patterns: `*.module.ts` for wiring, `*.service.ts` for business logic, `*.repository.ts` interfaces with `*.repository.drizzle.ts` implementations.
- Validate inputs near the boundary (e.g., Zod pipes) and keep domain services free of transport/framework details.

## Testing Guidelines
- Vitest is configured (`vitest.config.ts`). Use `pnpm test` for the suite, `pnpm test:watch` during development, and `pnpm test:cov` for coverage.
- Name tests `*.spec.ts` alongside the code they cover (preferred) or under a `test/` subtree when integration-style.
- Mock external IO; for Drizzle-dependent logic, prefer repository interfaces with in-memory fakes. Add coverage when adding new domain behaviors or interceptors/middleware.

## Commit & Pull Request Guidelines
- Commit history favors short, emoji-led titles (e.g., `🔧 Drizzle config`, `🦺 Add Zod validation pipe`). Keep messages imperative and scoped; include context in the body if needed.
- Before a PR: run lint, tests, and relevant DB commands; note new env vars (`DB_URL`, `DB_USER`, `OTEL_EXPORTER_OTLP_ENDPOINT`, etc.) or migration impacts.
- PR descriptions should state the change, rationale, and verification (commands run). Link issues/tasks; include screenshots or sample requests/responses when touching APIs or telemetry.
