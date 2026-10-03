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

## Stack

SvelteKit 2 + Svelte 5 (runes forced on for all non-`node_modules` files), Tailwind CSS v4 (configured in `src/routes/layout.css`, no `tailwind.config`), shadcn-svelte (`bits-ui`), TanStack Svelte Query, Hugeicons. Formatting: tabs, single quotes, no trailing commas, width 100.

Experimental flags enabled in `svelte.config.js`: Svelte `async` and SvelteKit `remoteFunctions`.

## Architecture

- **SPA mode**: `src/routes/+layout.ts` sets `ssr = false` and creates the `QueryClient` (queries only enabled in browser, 60s staleTime, no retry, no refetch on focus), passed to `QueryClientProvider` in `+layout.svelte`.
- **Server code goes through remote functions**: server-only logic lives in `*.remote.ts` files using `query` from `$app/server` (e.g. `src/lib/features/system-monitoring/system.remote.ts`). Client components consume them via TanStack `queryOptions` factories in a sibling `query.ts`.
- **Feature folders**: `src/lib/features/<feature>/` holds the feature component plus its `query.ts` / `*.remote.ts`. Route pages in `src/routes/<tool>/+page.svelte` are thin: `Container` + `Title` + description + feature component.
- **Navigation**: sidebar entries are data-driven from `src/lib/components/app-menu/menu.ts`. Adding a new tool page = add the route and an entry there (nested `items` render as a collapsible group).
- **UI primitives**: `src/lib/components/ui/` is shadcn-svelte generated code (style `lyra`, base color `stone`, icon library hugeicons). Add components with `pnpm dlx shadcn-svelte@latest add <name>` rather than hand-writing them. Use `cn()` from `$lib/utils` for class merging.
- **Theming**: light/dark via `mode-watcher` (`modeStorageKey="app-mode"`). Toasts via `svelte-sonner` (`toast(...)`), `<Toaster>` mounted in the root layout.
- Dev-only: `ScreenIndicator` (breakpoint badge) and Svelte Query devtools render only when `dev` is true.
