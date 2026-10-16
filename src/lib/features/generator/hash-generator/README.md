# Hash Generator

Shows MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hex digests of the input text. Route: `/hash-generator`.

## How it works

- SHA digests via Web Crypto `crypto.subtle.digest`, MD5 via `@noble/hashes` (not in Web Crypto), both over the UTF-8 bytes (`TextEncoder`) of the input, hex-encoded.
- All digests recompute on every keystroke; results from an older keystroke that resolve late are dropped.
- Runs once on mount, so the empty-string hashes show initially.
- Each digest has a copy button (toast on success).

## Files

- `hash-generator.svelte`: `Textarea` input, digest list, copy buttons.
- `hash.ts`: `algorithms`, `hash(algorithm, text)`.

## Limitations

- Text input only, no files.
