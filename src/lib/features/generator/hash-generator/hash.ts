export const algorithms = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;

export type Algorithm = (typeof algorithms)[number];

export async function hash(algorithm: Algorithm, text: string) {
	const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text));
	return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}
