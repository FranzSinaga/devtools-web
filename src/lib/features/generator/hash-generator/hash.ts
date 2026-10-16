import { md5 } from '@noble/hashes/legacy.js';
import { bytesToHex } from '@noble/hashes/utils.js';

export const algorithms = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const;

export type Algorithm = (typeof algorithms)[number];

export async function hash(algorithm: Algorithm, text: string) {
	const bytes = new TextEncoder().encode(text);
	// MD5 isn't in Web Crypto.
	if (algorithm === 'MD5') return bytesToHex(md5(bytes));
	return bytesToHex(new Uint8Array(await crypto.subtle.digest(algorithm, bytes)));
}
