export const charsets = {
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	numbers: '0123456789',
	symbols: '!@#$%^&*()-_=+[]{};:,.<>?/~'
};

export type Charset = keyof typeof charsets;

// Rejection sampling so every index is equally likely (plain `% n` is biased).
function randomIndex(n: number) {
	const limit = 2 ** 32 - (2 ** 32 % n);
	const buf = new Uint32Array(1);
	do crypto.getRandomValues(buf);
	while (buf[0] >= limit);
	return buf[0] % n;
}

export function generatePassword(length: number, sets: Charset[]) {
	const pool = sets.map((s) => charsets[s]).join('');
	if (!pool || length <= 0) return '';
	return Array.from({ length }, () => pool[randomIndex(pool.length)]).join('');
}
