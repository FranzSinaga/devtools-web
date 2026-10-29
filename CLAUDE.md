# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm** (`engine-strict=true`).

```sh
pnpm dev            # vite dev server
pnpm build          # production build
pnpm check          # svelte-kit sync + svelte-check (type checking)
pnpm lint           # prettier --check + eslint
pnpm format         # prettier --write
```

There is no test runner configured.

## Git workflow

Work directly on the currently checked-out branch. No new worktrees (including EnterWorktree), branches, commits, or pushes unless the user explicitly asks; leave changes uncommitted for the user to review.

## Stack

SvelteKit 2 + Svelte 5 (runes forced on for all non-`node_modules` files), Tailwind CSS v4 (configured in `src/routes/layout.css`, no `tailwind.config`), shadcn-svelte (`bits-ui`), TanStack Svelte Query, Hugeicons. Formatting: tabs, single quotes, no trailing commas, width 100.

Experimental flags enabled in `svelte.config.js`: Svelte `async` and SvelteKit `remoteFunctions`.

## Architecture

- **SPA mode**: `src/routes/+layout.ts` sets `ssr = false` and creates the `QueryClient` (queries only enabled in browser, 60s staleTime, no retry, no refetch on focus), passed to `QueryClientProvider` in `+layout.svelte`.
- **Server code goes through remote functions**: server-only logic lives in `*.remote.ts` files using `query` from `$app/server`. Client components consume them via TanStack `queryOptions` factories in a sibling `query.ts`. None exist yet (all tools run client-side); the `remoteFunctions` flag stays enabled for when one is needed.
- **Feature folders**: `src/lib/features/<group>/<feature>/` (group = the sidebar group in `menu.ts`, e.g. `generator/uuid-generator`) holds the feature component, any plain-TS logic (e.g. `hash.ts`), any `query.ts` / `*.remote.ts`, and a `README.md` (keep it in sync when changing the feature). Code shared within a group sits at the group level (e.g. `encoder-decoder/codec.svelte`, the two-pane encode/decode UI). `features/dashboard/` has no group: it holds the `/` page plus favorites and history. Route pages in `src/routes/<tool>/+page.svelte` are thin: `Container` + `Title` + description + feature component. `Title` adds the favorite star itself on tool routes.
- **Navigation**: sidebar entries are data-driven from `src/lib/components/app-menu/menu.ts`. Adding a new tool page = add the route and an entry there (nested `items` render as a collapsible group). The root layout also uses each nested entry's `title`/`description` for the page `<title>` and meta description; other pages fall back to a default description in `+layout.svelte` that lists the tools, so update it too. The flattened `tools` export also drives the command palette, favorite stars, history, and dashboard, so a new nested entry gets them all. Favorites and history are stored by tool URL in `localStorage` (keys in `src/lib/features/dashboard/README.md`); changing a tool's `url` orphans them.
- **UI primitives**: `src/lib/components/ui/` is shadcn-svelte generated code (style `lyra`, base color `stone`, icon library hugeicons). Add components with `pnpm dlx shadcn-svelte@latest add <name>` rather than hand-writing them. Use `cn()` from `$lib/utils` for class merging. Shared app components live in `src/lib/components/` (e.g. `copy-row.svelte`: label + copy button + value, with toast).
- **Theming**: light/dark via `mode-watcher` (`modeStorageKey="app-mode"`). Toasts via `svelte-sonner` (`toast(...)`), `<Toaster>` mounted in the root layout.
- **Deployment**: push to `master` triggers Drone (`.drone.yml`), which runs `pnpm check` and `pnpm lint`, then rebuilds the Docker image and replaces the container in place. `kit.version.pollInterval` (60s) plus `updated` from `$app/state` in the root layout show a "Refresh" toast when a new build is live. Details in `README.md`.
- Dev-only: `ScreenIndicator` (breakpoint badge) and Svelte Query devtools render only when `dev` is true.
