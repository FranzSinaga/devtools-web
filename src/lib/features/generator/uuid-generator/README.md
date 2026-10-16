# UUID Generator

Generates a batch of UUIDs (v1, v4, v7), ULIDs, or NanoIDs to copy. Route: `/uuid-generator`.

## How it works

- UUIDs use the `uuid` package (`v1`, `v4`, `v7`). ULID and NanoID come from `ids.ts`, built on `crypto.getRandomValues` (no dependency). Runs in the browser.
- ULID: 10-char millisecond timestamp + 16 random chars, Crockford base32 (26 chars). NanoID: 21 chars from the URL-safe alphabet `A-Za-z0-9_-`.
- The route page renders one `UuidGenerator` per tab inside shadcn `Tabs` (default tab: v4); the component takes a `version` prop (`v1` | `v4` | `v7` | `ulid` | `nanoid`).
- Typing a quantity (`NumberInput`, digits only, clamped to 50) regenerates the list. Refresh regenerates with the same quantity.
- Copy writes all IDs to the clipboard, one per line, and shows a toast.

## Files

- `uuid-generator.svelte`: quantity input, list, copy/refresh buttons, per-version description.
- `ids.ts`: `ulid(now?)`, `nanoid()`.

## Limitations

- Max 50 per batch.
- Nothing is generated until a quantity is entered.
- The v1 description mentions the MAC address; in the browser the `uuid` package uses a random node ID instead.
- ULIDs are not monotonic within the same millisecond, so a batch may not sort in generation order.
- NanoID length and alphabet are fixed (21, URL-safe).
