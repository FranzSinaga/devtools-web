# QR Generator

Turns text or a URL into a QR code with a live preview and download. Route: `/qr-generator`.

## How it works

- Uses `qrcode-generator`: type number `0` (auto-size), error correction level `L`.
- `qrSrc` is `$derived` from the input; `createDataURL(10, 20)` (cell size 10, margin 20) returns a GIF data URL used for both the `<img>` and the download link (`qr-code.gif`).
- Runs entirely in the browser.

## Files

- `qr-generator.svelte`: input, preview, download button.

## Limitations

- Input too long for a QR code renders nothing, with no error message.
- Fixed size, margin, and error correction level; GIF output only.
