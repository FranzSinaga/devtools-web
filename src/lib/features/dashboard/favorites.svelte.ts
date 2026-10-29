import { SvelteSet } from 'svelte/reactivity';

const KEY = 'favorite-tools';

function load(): string[] {
	try {
		const urls = JSON.parse(localStorage.getItem(KEY) ?? '[]');
		return Array.isArray(urls) ? urls : [];
	} catch {
		return [];
	}
}

/** URLs of favorited tools, persisted in localStorage. */
export const favorites = new SvelteSet<string>(load());

export function toggleFavorite(url: string) {
	if (!favorites.delete(url)) favorites.add(url);
	try {
		localStorage.setItem(KEY, JSON.stringify([...favorites]));
	} catch {
		// storage blocked (e.g. private mode): favorites last until reload
	}
}
