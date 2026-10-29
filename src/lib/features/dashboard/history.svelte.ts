const KEY = 'tool-history';
const MAX = 6;

function load(): string[] {
	try {
		const urls = JSON.parse(localStorage.getItem(KEY) ?? '[]');
		return Array.isArray(urls) ? urls.slice(0, MAX) : [];
	} catch {
		return [];
	}
}

function save() {
	try {
		localStorage.setItem(KEY, JSON.stringify(history));
	} catch {
		// storage blocked (e.g. private mode): history lasts until reload
	}
}

/** URLs of recently opened tools, most recent first, persisted in localStorage. */
export const history = $state<string[]>(load());

export function recordVisit(url: string) {
	if (history[0] === url) return;
	const i = history.indexOf(url);
	if (i !== -1) history.splice(i, 1);
	history.unshift(url);
	history.splice(MAX);
	save();
}

export function clearHistory() {
	history.splice(0);
	save();
}
