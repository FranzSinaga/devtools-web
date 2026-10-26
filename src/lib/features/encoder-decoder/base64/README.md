# Base64

Encodes and decodes Base64 text, and converts files to Base64 and data URLs. Route: `/base64` (tabs: Text, File).

## How it works

- Text tab uses the shared `../codec.svelte`: two textareas, typing on either side rewrites the other. Decode errors show under the inputs.
- `encode` turns the UTF-8 bytes (`TextEncoder`) into a binary string for `btoa`. `decode` strips whitespace, maps the URL-safe alphabet (`-_`) to standard (`+/`), then `atob` (padding optional) and a strict UTF-8 `TextDecoder` (invalid UTF-8 counts as an error).
- File tab reads the chosen file with `FileReader.readAsDataURL` and shows the raw Base64 (the part after the comma) and the full data URL, each with a copy button.

## Files

- `base64.ts`: `encode(text)`, `decode(base64)`. Also used by the JWT decoder.
- `base64-file.svelte`: file input and outputs.
- `../codec.svelte`: shared two-pane encode/decode UI (also used by URL and HTML entities).

## Limitations

- Encoding always outputs standard Base64 with padding, no URL-safe option.
- No Base64 to file download; decoding only produces UTF-8 text.
- Large files produce large strings held in memory and rendered in a textarea.
