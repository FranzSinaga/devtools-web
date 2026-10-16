const firstNames = (
	'James Mary John Patricia Robert Jennifer Michael Linda David Sarah ' +
	'Daniel Emily Kevin Olivia Brian Sophia Ryan Grace Ethan Chloe'
).split(' ');
const lastNames = (
	'Smith Johnson Williams Brown Jones Garcia Miller Davis Wilson Moore ' +
	'Taylor Anderson Thomas Martin Lee Walker Hall Young King Wright'
).split(' ');
const streets = ['Oak', 'Maple', 'Pine', 'Cedar', 'Elm', 'Lake', 'Hill', 'Park', 'Sunset', 'River'];
const streetTypes = ['St', 'Ave', 'Rd', 'Blvd', 'Ln', 'Dr'];
const cities = [
	['Springfield', 'IL'],
	['Riverside', 'CA'],
	['Franklin', 'TN'],
	['Greenville', 'SC'],
	['Madison', 'WI'],
	['Salem', 'OR'],
	['Fairview', 'TX'],
	['Georgetown', 'KY']
];
// Reserved for documentation (RFC 2606), so generated emails never reach a real inbox.
const domains = ['example.com', 'example.org', 'example.net'];

export const fields = ['name', 'email', 'address'] as const;
export type Field = (typeof fields)[number];

const pick = <T>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)];
const between = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

function person(selected: Field[]) {
	const first = pick(firstNames);
	const last = pick(lastNames);
	const [city, state] = pick(cities);
	const all: Record<Field, string> = {
		name: `${first} ${last}`,
		email: `${first}.${last}${between(1, 99)}@${pick(domains)}`.toLowerCase(),
		address: `${between(1, 9999)} ${pick(streets)} ${pick(streetTypes)}, ${city}, ${state} ${between(10000, 99999)}`
	};
	return Object.fromEntries(selected.map((f) => [f, all[f]]));
}

export function generateFakeData(count: number, enabled: Record<Field, boolean>) {
	const selected = fields.filter((f) => enabled[f]);
	if (!selected.length) return [];
	return Array.from({ length: count }, () => person(selected));
}
