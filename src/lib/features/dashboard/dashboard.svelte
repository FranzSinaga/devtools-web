<script lang="ts">
	import { tools } from '$lib/components/app-menu/menu';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import FavoriteToggle from './favorite-toggle.svelte';
	import { favorites } from './favorites.svelte';
	import { clearHistory, history } from './history.svelte';

	const favoriteTools = $derived(tools.filter((tool) => favorites.has(tool.url)));
	const recentTools = $derived(
		history.map((url) => tools.find((t) => t.url === url)).filter((t) => t !== undefined)
	);
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

{#if recentTools.length}
	<section class="space-y-2 pt-4">
		<div class="flex items-center justify-between gap-2">
			<h2 class="text-sm font-medium">Recently used</h2>
			<button
				type="button"
				class="text-xs text-muted-foreground hover:text-foreground focus-visible:underline focus-visible:outline-hidden"
				onclick={clearHistory}
			>
				Clear
			</button>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each recentTools as tool (tool.url)}
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={tool.url}
					class="flex items-center gap-2 border px-2 py-1 text-sm hover:bg-muted focus-visible:underline focus-visible:outline-hidden"
				>
					<HugeiconsIcon icon={tool.icon} size={15} />
					{tool.title}
				</a>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			{/each}
		</div>
	</section>
{/if}
