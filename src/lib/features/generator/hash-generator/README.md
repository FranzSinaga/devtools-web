# Hash Generator

Shows SHA-1, SHA-256, SHA-384, and SHA-512 hex digests of the input text. Route: `/hash-generator`.

## How it works

- Web Crypto `crypto.subtle.digest` over the UTF-8 bytes (`TextEncoder`) of the input, hex-encoded.
- All four digests recompute on every keystroke; results from an older keystroke that resolve late are dropped.
- Runs once on mount, so the empty-string hashes show initially.
- Each digest has a copy button (toast on success).

## Files

- `hash-generator.svelte`: `Textarea` input, digest list, copy buttons.
- `hash.ts`: `algorithms`, `hash(algorithm, text)`.

## Limitations

- No MD5 (not in Web Crypto; see [ROADMAP.md](../../../../../ROADMAP.md)).
- Text input only, no files.
