<script lang="ts">
	import { cn } from '$lib/utils';
	import { StarIcon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { favorites, toggleFavorite } from './favorites.svelte';

	type Props = {
		url: string;
		title: string;
		size?: number;
		class?: string;
	};
	let { url, title, size = 16, class: className }: Props = $props();

	const active = $derived(favorites.has(url));
</script>

<button
	type="button"
	aria-pressed={active}
	aria-label="Favorite {title}"
	title={active ? 'Remove from favorites' : 'Add to favorites'}
	class={cn(
		'flex shrink-0 items-center justify-center text-muted-foreground outline-hidden hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:text-amber-500',
		className
	)}
	onclick={() => toggleFavorite(url)}
>
	<HugeiconsIcon icon={StarIcon} {size} class={cn(active && 'fill-current')} />
</button>
