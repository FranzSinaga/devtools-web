# Dashboard

Home page (route: `/`) listing the tools the user has starred.

## How it works

- `favorites.svelte.ts` holds a `SvelteSet` of tool URLs, loaded from `localStorage` (`favorite-tools`) at module load and written back on every `toggleFavorite(url)`.
- `FavoriteToggle` is the star button (`aria-pressed`, filled amber when active). It is used in three places:
  - the sidebar sub-items (`nav-main.svelte`), revealed on hover/focus on desktop, always visible when starred;
  - `Title`, which looks up the current tool from `page.url.pathname` in `tools` (`menu.ts`), so tool pages need no changes;
  - each dashboard card.
- `dashboard.svelte` renders starred tools as cards in menu order (icon, title, description), or an empty state.

## Files

- `favorites.svelte.ts`: `favorites`, `toggleFavorite(url)`.
- `favorite-toggle.svelte`: star button (`url`, `title`, `size`, `class`).
- `dashboard.svelte`: favorites grid / empty state.

## Limitations

- Favorites live in this browser only; no sync across devices or tabs (another tab picks up changes on reload).
- If storage is blocked, favorites work until reload.
- A tool must be a nested entry in `menu.ts` to be starrable; URLs of removed tools stay in storage but are ignored.
