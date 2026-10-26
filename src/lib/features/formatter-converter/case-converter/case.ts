// Splits on separators, camelCase humps, acronym boundaries (XMLHttp -> XML Http), and digits.
const WORD = /\p{Lu}+(?=\p{Lu}\p{Ll})|\p{Lu}?\p{Ll}+|\p{Lu}+|\p{N}+|\p{L}+/gu;

const lower = (w: string) => w.toLowerCase();
const upper = (w: string) => w.toUpperCase();
const capitalize = (w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

export const cases: { name: string; convert: (words: string[]) => string }[] = [
	{ name: 'camelCase', convert: (w) => w.map((x, i) => (i ? capitalize(x) : lower(x))).join('') },
	{ name: 'PascalCase', convert: (w) => w.map(capitalize).join('') },
	{ name: 'snake_case', convert: (w) => w.map(lower).join('_') },
	{ name: 'CONSTANT_CASE', convert: (w) => w.map(upper).join('_') },
	{ name: 'kebab-case', convert: (w) => w.map(lower).join('-') },
	{ name: 'dot.case', convert: (w) => w.map(lower).join('.') },
	{ name: 'Title Case', convert: (w) => w.map(capitalize).join(' ') },
	{
		name: 'Sentence case',
		convert: (w) => w.map((x, i) => (i ? lower(x) : capitalize(x))).join(' ')
	},
	{ name: 'lower case', convert: (w) => w.map(lower).join(' ') },
	{ name: 'UPPER CASE', convert: (w) => w.map(upper).join(' ') }
];

// Each line is converted on its own, so a list of identifiers stays a list.
export function convert(text: string, to: (words: string[]) => string) {
	return text
		.split('\n')
		.map((line) => to(line.match(WORD) ?? []))
		.join('\n');
}
