<script lang="ts">
	import { tools } from '$lib/components/app-menu/menu';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import FavoriteToggle from './favorite-toggle.svelte';
	import { favorites } from './favorites.svelte';

	const favoriteTools = $derived(tools.filter((tool) => favorites.has(tool.url)));
</script>

{#if favoriteTools.length}
	<div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
		{#each favoriteTools as tool (tool.url)}
			<div class="relative space-y-1 border p-3 hover:bg-muted">
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={tool.url}
					class="flex items-center gap-2 pr-6 font-medium after:absolute after:inset-0 focus-visible:underline focus-visible:outline-hidden"
				>
					<HugeiconsIcon icon={tool.icon} size={18} />
					{tool.title}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
				<p class="text-sm text-muted-foreground">{tool.description}</p>
				<FavoriteToggle url={tool.url} title={tool.title} class="absolute top-3 right-3 size-5" />
			</div>
		{/each}
	</div>
{:else}
	<div class="border border-dashed p-6 text-center text-sm text-muted-foreground">
		No favorite tools yet. Star a tool in the sidebar or next to its page title to pin it here.
	</div>
{/if}
