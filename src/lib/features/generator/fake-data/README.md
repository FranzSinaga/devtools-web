# Fake Data Generator

Generates fictional people (name, email, address) as a JSON array. Route: `/fake-data`.

## How it works

- Picks from small built-in lists in `fake.ts` (names, streets, US cities) with `Math.random`. No dependency (no faker).
- Email is derived from the name, e.g. `mary.lee42@example.org`, on RFC 2606 reserved domains (`example.com/.org/.net`) so it never reaches a real inbox.
- Address format: `<number> <street> <type>, <city>, <state> <zip>` (US-style, zip is random 5 digits).
- Checkboxes choose which fields each record has (all on by default). Count defaults to 5, clamped to 100 by `NumberInput`.
- Regenerates on any input change; refresh regenerates, copy writes the JSON to the clipboard with a toast.

## Files

- `fake-data.svelte`: count input, field checkboxes, JSON output, copy/refresh.
- `fake.ts`: `fields`, `generateFakeData(count, enabled)`.

## Limitations

- Small lists, so names repeat in larger batches; city, state, and zip don't match real geography.
- JSON output only (no CSV/SQL), US-style addresses only.
- No phone numbers, dates, or other field types.
