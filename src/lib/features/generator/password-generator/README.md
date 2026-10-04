# Password Generator

Generates a random password from selected character sets. Route: `/password-generator`.

## How it works

- `crypto.getRandomValues` with rejection sampling, so every character in the pool is equally likely.
- Character sets: uppercase, lowercase, numbers, symbols (all on by default). Length defaults to 16, clamped to 128 by `NumberInput`.
- Regenerates on any length or checkbox change; refresh button regenerates, copy writes to the clipboard with a toast.
- Runs entirely in the browser.

## Files

- `password-generator.svelte`: length input, charset checkboxes, output, copy/refresh.
- `password.ts`: `charsets`, `generatePassword(length, sets)`.

## Limitations

- Does not guarantee at least one character from each selected set.
- No sets selected or length 0 gives an empty result ("No Data").
- No strength meter.
