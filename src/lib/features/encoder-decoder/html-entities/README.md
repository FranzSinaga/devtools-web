# HTML Entities

Escapes text into HTML entities and decodes entities back. Route: `/html-entities`.

## How it works

- The route page renders the shared `../codec.svelte` with `encode` / `decode` from `html-entities.ts`. Typing on either side rewrites the other.
- `encode` escapes only `& < > " '` (as `&amp; &lt; &gt; &quot; &#39;`).
- `decode` assigns the input to a detached `<textarea>`'s `innerHTML` and reads `value`. Textarea content is parsed as text, so tags stay literal and no markup runs, while every named and numeric entity resolves.

## Files

- `html-entities.ts`: `encode(text)`, `decode(html)`.

## Limitations

- Encoding never turns non-ASCII characters into numeric entities.
