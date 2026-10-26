const entities: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
};

export function encode(text: string) {
	return text.replace(/[&<>"']/g, (c) => entities[c]);
}

// A textarea parses its content as text (no elements), so this only resolves entities.
export function decode(html: string) {
	const textarea = document.createElement('textarea');
	textarea.innerHTML = html;
	return textarea.value;
}
