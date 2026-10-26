# Color Converter

Converts a CSS color to HEX, RGB, HSL, and OKLCH. Route: `/color-converter`.

## How it works

- `parseColor` checks the input with `CSS.supports('color', ...)`, paints it onto a 1x1 canvas, and reads the pixel back as 8-bit sRGB. So any color CSS accepts works as input (hex, `rgb()`, `hsl()`, `oklch()`, `lab()`, named colors, ...) without a hand-written parser.
- `toHex` / `toRgb` / `toHsl` / `toOklch` format that RGBA value. OKLCH uses Björn Ottosson's sRGB to OKLab matrices. Alpha below 1 is kept (`#rrggbbaa`, `/ a`).
- The native `<input type="color">` picker writes `#rrggbb` into the text input.

## Files

- `color-converter.svelte`: picker, input, swatch, format rows with copy buttons.
- `color.ts`: `parseColor(input)`, `toHex`, `toRgb`, `toHsl`, `toOklch`.

## Limitations

- Everything goes through 8-bit sRGB: wide-gamut input (e.g. high-chroma `oklch()`, `display-p3`) is clipped to sRGB, and OKLCH output is rounded from 8-bit channels.
- With low alpha, the canvas's premultiplied storage makes the RGB channels imprecise.
