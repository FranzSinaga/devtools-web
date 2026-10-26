# Case Converter

Converts text between naming conventions. Route: `/case-converter`.

## How it works

- Each line is split into words with one Unicode regex: separators and punctuation are dropped, and words break at lower-to-upper changes, at acronym ends (`XMLHttp` -> `XML`, `Http`), and around digits.
- The words are rejoined for each case in `cases`: camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, dot.case, Title Case, Sentence case, lower case, UPPER CASE.

## Files

- `case-converter.svelte`: input and one copyable row per case.
- `case.ts`: `cases`, `convert(text, to)`.

## Limitations

- Punctuation is not preserved (`hello, world!` -> `Hello world` in Sentence case).
- Digits are their own word, so `v2` becomes `v_2` in snake_case.
