// ponytail: numbers below 1e11 are read as seconds, so millisecond values before 1973-03-03 come out
// as seconds. Add a unit picker if that matters.
const MS_THRESHOLD = 1e11;

export function parseTimestamp(input: string) {
	const text = input.trim();
	if (!text) return undefined;
	let ms: number;
	let unit: 'seconds' | 'milliseconds' | 'date';
	if (/^-?\d+(\.\d+)?$/.test(text)) {
		const n = Number(text);
		unit = Math.abs(n) < MS_THRESHOLD ? 'seconds' : 'milliseconds';
		ms = unit === 'seconds' ? n * 1000 : n;
	} else {
		ms = Date.parse(text);
		unit = 'date';
	}
	const date = new Date(ms);
	if (isNaN(date.getTime())) return undefined;
	return { date, unit };
}

const units: [Intl.RelativeTimeFormatUnit, number][] = [
	['year', 31536000],
	['month', 2592000],
	['week', 604800],
	['day', 86400],
	['hour', 3600],
	['minute', 60],
	['second', 1]
];

export function relative(date: Date, now = Date.now()) {
	const seconds = (date.getTime() - now) / 1000;
	const [unit, size] =
		units.find(([, size]) => Math.abs(seconds) >= size) ?? units[units.length - 1];
	return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
		Math.round(seconds / size),
		unit
	);
}
