# Lorem Ipsum Generator

Generates placeholder text by paragraphs, sentences, or words. Route: `/lorem-ipsum`.

## How it works

- Random words from a fixed 63-word Latin list (`Math.random`, not crypto: it's filler text).
- Sentences are 6-14 words, capitalized, ending in a period; paragraphs are 4-7 sentences, separated by a blank line.
- "Start with Lorem ipsum" (on by default) makes the output open with the classic "Lorem ipsum dolor sit amet, consectetur adipiscing elit." (for words: its first 8 words).
- Count defaults to 3 paragraphs, clamped to 100 by `NumberInput`. Regenerates on any input change; refresh regenerates, copy writes to the clipboard with a toast.

## Files

- `lorem-ipsum.svelte`: count, unit select, start checkbox, output, copy/refresh.
- `lorem.ts`: `units`, `generateLorem(count, unit, startWithLorem)`.

## Limitations

- Output is plain text only (no HTML `<p>` wrapping).
- No fake data (names, emails, addresses).
