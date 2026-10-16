const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const URL_SAFE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

// Alphabet sizes are powers of 2, so masking a random byte is unbiased.
const randomChars = (alphabet: string, length: number) =>
	Array.from(
		crypto.getRandomValues(new Uint8Array(length)),
		(b) => alphabet[b & (alphabet.length - 1)]
	).join('');

// 10 chars of millisecond timestamp + 16 random chars, Crockford base32.
// ponytail: not monotonic within the same millisecond; increment the random part if batch order matters.
export function ulid(now = Date.now()) {
	let time = '';
	for (let i = 0; i < 10; i++, now = Math.floor(now / 32)) time = CROCKFORD[now % 32] + time;
	return time + randomChars(CROCKFORD, 16);
}

export const nanoid = () => randomChars(URL_SAFE, 21);
