# Timestamp Converter

Converts Unix timestamps to dates and dates to timestamps. Route: `/timestamp-converter`.

## How it works

- `parseTimestamp` reads a plain number as seconds when its absolute value is below `1e11`, otherwise as milliseconds; anything else goes through `Date.parse` (ISO 8601, RFC 2822, ...). The detected unit is shown under the input.
- Output: Unix seconds and milliseconds, ISO 8601, UTC (`toUTCString`), local time in the browser's time zone, and a relative time (`Intl.RelativeTimeFormat`).
- The input starts at the current time; "Now" resets it.

## Files

- `timestamp-converter.svelte`: input, Now button, result rows with copy buttons.
- `timestamp.ts`: `parseTimestamp(input)`, `relative(date, now?)`.

## Limitations

- Millisecond values before 1973-03-03 are read as seconds. No microsecond or nanosecond input.
- The relative time is computed when the input changes; it does not tick.
- Non-ISO date strings parse however the browser's `Date.parse` does.
