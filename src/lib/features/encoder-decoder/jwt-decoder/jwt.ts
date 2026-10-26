import { decode as base64Decode } from '../base64/base64';

export function decodeJwt(token: string) {
	const parts = token.trim().split('.');
	if (parts.length !== 3) throw new Error('A JWT has three dot-separated parts');
	const [header, payload] = parts;
	return {
		header: JSON.parse(base64Decode(header)) as Record<string, unknown>,
		payload: JSON.parse(base64Decode(payload)) as Record<string, unknown>
	};
}
