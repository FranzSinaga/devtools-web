// First 8 words spell the classic opening, used by `startWithLorem`.
const words = (
	'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut ' +
	'labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris ' +
	'nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse ' +
	'cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui ' +
	'officia deserunt mollit anim id est laborum'
).split(' ');
const OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

export const units = ['paragraphs', 'sentences', 'words'] as const;
export type Unit = (typeof units)[number];

const between = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
const word = () => words[between(0, words.length - 1)];

function sentence() {
	const s = Array.from({ length: between(6, 14) }, word).join(' ');
	return s[0].toUpperCase() + s.slice(1) + '.';
}

const paragraph = () => Array.from({ length: between(4, 7) }, sentence).join(' ');

export function generateLorem(count: number, unit: Unit, startWithLorem: boolean) {
	if (count <= 0) return '';
	if (unit === 'words') {
		const out = Array.from({ length: count }, word);
		if (startWithLorem) out.splice(0, 8, ...words.slice(0, Math.min(count, 8)));
		return out.join(' ');
	}
	if (unit === 'sentences') {
		const out = Array.from({ length: count }, sentence);
		if (startWithLorem) out[0] = OPENING;
		return out.join(' ');
	}
	const out = Array.from({ length: count }, paragraph);
	if (startWithLorem) out[0] = `${OPENING} ${out[0]}`;
	return out.join('\n\n');
}
