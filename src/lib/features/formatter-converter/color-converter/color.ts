export type Rgba = { r: number; g: number; b: number; a: number };

// The browser parses any CSS color (hex, rgb, hsl, oklch, named...); drawing it on a 1x1 canvas
// reads it back as 8-bit sRGB.
export function parseColor(input: string): Rgba | undefined {
	const text = input.trim();
	if (!text || !CSS.supports('color', text)) return undefined;
	const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
	if (!ctx) return undefined;
	ctx.fillStyle = text;
	ctx.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
	return { r, g, b, a: a / 255 };
}

const round = (n: number, digits = 0) => Number(n.toFixed(digits));
const alpha = (a: number) => (a < 1 ? ` / ${round(a, 2)}` : '');
const hex2 = (n: number) => n.toString(16).padStart(2, '0');

export function toHex({ r, g, b, a }: Rgba) {
	return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(Math.round(a * 255)) : ''}`;
}

export function toRgb({ r, g, b, a }: Rgba) {
	return `rgb(${r} ${g} ${b}${alpha(a)})`;
}

export function toHsl({ r, g, b, a }: Rgba) {
	[r, g, b] = [r / 255, g / 255, b / 255];
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const d = max - min;
	const l = (max + min) / 2;
	const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
	let h = 0;
	if (d !== 0) {
		if (max === r) h = ((g - b) / d + 6) % 6;
		else if (max === g) h = (b - r) / d + 2;
		else h = (r - g) / d + 4;
	}
	return `hsl(${round(h * 60, 1)} ${round(s * 100, 1)}% ${round(l * 100, 1)}%${alpha(a)})`;
}

// sRGB -> OKLab -> OKLCH, matrices from https://bottosson.github.io/posts/oklab/
export function toOklch({ r, g, b, a }: Rgba) {
	const [lr, lg, lb] = [r, g, b].map((c) => {
		c /= 255;
		return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	});
	const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
	const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
	const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
	const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
	const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
	const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
	const C = round(Math.hypot(A, B), 4);
	// Grays have no meaningful hue; rounding noise would otherwise show a random angle.
	const H = C === 0 ? 0 : (Math.atan2(B, A) * 180) / Math.PI;
	return `oklch(${round(L * 100, 2)}% ${C} ${round((H + 360) % 360, 2)}${alpha(a)})`;
}
