# devtools-web

A collection of small developer tools in one SvelteKit app. Every tool runs entirely in the browser; nothing is sent to a server.

Tools: UUID (plus ULID/NanoID), QR, password, hash, Lorem Ipsum, and fake data generators; Base64 (text and file), URL, JWT, and HTML entity encoders/decoders; JSON formatter and timestamp, color, and case converters. The dashboard shows the tools you star and the ones you used recently; ⌘K / Ctrl+K opens a command palette to jump to any tool. Favorites and history are kept in `localStorage`. See [ROADMAP.md](ROADMAP.md) for what's shipped and planned.

## Quick start

Requires Node 24.22.1 (pinned in `package.json` `engines`) and pnpm 10.24.0 (`engine-strict=true`).

```sh
pnpm install
pnpm dev
```

## Scripts

```sh
pnpm dev       # vite dev server
pnpm build     # production build
pnpm preview   # preview the production build
pnpm check     # svelte-kit sync + svelte-check
pnpm lint      # prettier --check + eslint
pnpm format    # prettier --write
```

No test runner is configured.

## Deployment

Uses `@sveltejs/adapter-node`. `pnpm build` writes `build/`; start it with `node build` (port from `PORT`).

Docker: `docker compose up -d --build` builds the multi-stage `Dockerfile` (`node:24.22.1-alpine`, container port 3000) and publishes it on `127.0.0.1:4003`.

CI/CD: on push to `master`, Drone (`.drone.yml`, SSH pipeline) pulls `master` on the deploy host, runs `pnpm check` and `pnpm lint` in a Node container, then rebuilds the image and swaps the running container in place (`docker compose up -d`, no `down`) and prunes Docker. Open tabs poll `_app/version.json` every 60s and show a "Refresh" toast when a new build is live. Host, user, SSH key, and app path come from Drone secrets.

## Project layout

```
src/
  routes/<tool>/+page.svelte        thin page: title, description, feature component
  lib/features/<group>/<feature>/   feature component, logic, README.md
  lib/features/dashboard/           dashboard, favorites, recently used history
  lib/components/app-menu/          sidebar, header, command palette; menu.ts lists the tools
  lib/components/                   shared components (Container, Title, CopyRow, ...)
  lib/components/ui/                shadcn-svelte generated components
```

Stack: SvelteKit 2, Svelte 5, Tailwind CSS v4, shadcn-svelte, TanStack Svelte Query. Conventions and architecture notes live in [CLAUDE.md](CLAUDE.md).
