# UUID Generator

Generates a batch of UUIDs (v1, v4, or v7) to copy. Route: `/uuid-generator`.

## How it works

- Uses the `uuid` package (`v1`, `v4`, `v7`). Runs in the browser.
- The route page renders one `UuidGenerator` per version inside shadcn `Tabs` (default tab: v4); the component takes a `version` prop.
- Typing a quantity (`NumberInput`, digits only, clamped to 50) regenerates the list. Refresh regenerates with the same quantity.
- Copy writes all UUIDs to the clipboard, one per line, and shows a toast.

## Files

- `uuid-generator.svelte`: quantity input, list, copy/refresh buttons, per-version description.

## Limitations

- Max 50 per batch.
- Nothing is generated until a quantity is entered.
- The v1 description mentions the MAC address; in the browser the `uuid` package uses a random node ID instead.
- No ULID / NanoID yet (see [ROADMAP.md](../../../../../ROADMAP.md)).
