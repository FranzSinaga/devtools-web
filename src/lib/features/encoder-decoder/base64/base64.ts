export function encode(text: string) {
	let binary = '';
	for (const byte of new TextEncoder().encode(text)) binary += String.fromCharCode(byte);
	return btoa(binary);
}

// Accepts standard and URL-safe alphabets, with or without padding or whitespace.
export function decode(base64: string) {
	const normalized = base64.replace(/\s/g, '').replace(/-/g, '+').replace(/_/g, '/');
	const bytes = Uint8Array.from(atob(normalized), (c) => c.charCodeAt(0));
	return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}
