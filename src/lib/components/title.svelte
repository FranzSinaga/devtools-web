<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { tools } from '$lib/components/app-menu/menu';
	import FavoriteToggle from '$lib/features/dashboard/favorite-toggle.svelte';

	type Props = {
		class?: string;
		children: Snippet<[]> | undefined;
	};
	let { class: className, children }: Props = $props();

	const tool = $derived(tools.find((t) => t.url === page.url.pathname));
</script>

<div class={cn('flex items-center justify-between gap-2 border-b py-2', className)}>
	<h1 class="text-xl font-semibold">
		{@render children?.()}
	</h1>
	{#if tool}
		<FavoriteToggle url={tool.url} title={tool.title} size={20} class="size-8" />
	{/if}
</div>
