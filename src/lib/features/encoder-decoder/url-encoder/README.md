# URL Encode/Decode

Percent-encodes and decodes text. Route: `/url-encoder`.

## How it works

- The route page renders the shared `../codec.svelte` with the built-in `encodeURIComponent` / `decodeURIComponent`, so there is no feature-specific code.
- Typing on either side rewrites the other. Malformed sequences (e.g. `%E0%A4%A`) show an error.

## Files

- None besides this README; the page lives in `src/routes/url-encoder/+page.svelte`.

## Limitations

- Component encoding only: `/ ? & = #` are escaped too, so encoding a whole URL escapes its structure. No `encodeURI` mode.
- `+` is not decoded as a space (form encoding).
