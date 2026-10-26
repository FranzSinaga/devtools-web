# JWT Decoder

Decodes a JSON Web Token's header and payload. Route: `/jwt-decoder`.

## How it works

- `decodeJwt` splits the token on `.` (must be 3 parts), Base64URL-decodes the header and payload with `../base64/base64.ts` `decode`, and `JSON.parse`s them. Any failure shows "Invalid JWT".
- Header and payload render as pretty-printed JSON with copy buttons.
- Numeric `iat`, `nbf`, and `exp` claims show as local dates; if `exp` is present, it says whether the token is expired (checked when the token changes).

## Files

- `jwt-decoder.svelte`: token input, decoded sections, timestamps.
- `jwt.ts`: `decodeJwt(token)`.

## Limitations

- The signature is not verified (no key input).
- Only JWS compact tokens; encrypted JWE (5 parts) are rejected.
