# JSON Formatter & Validator

Validates and pretty-prints or minifies JSON. Route: `/json-formatter`.

## How it works

- `JSON.parse` the input, then `JSON.stringify` it with the chosen indent (2 spaces, 4 spaces, tab, or none for Minify). Recomputed as you type.
- On a parse error, the browser's error message is shown (V8 includes the position, line, and column).

## Files

- `json-formatter.svelte`: input, indent select, output, validity message.

## Limitations

- Standard JSON only: no comments, trailing commas, or JSON5.
- Numbers beyond double precision lose digits (e.g. large IDs), since values round-trip through JS numbers.
- No key sorting or tree view.
