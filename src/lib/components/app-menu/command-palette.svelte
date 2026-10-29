<script lang="ts">
	import * as Command from '$lib/components/ui/command/index';
	import { Button } from '$lib/components/ui/button/index';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { SearchIcon } from '@hugeicons/core-free-icons';
	import { history } from '$lib/features/dashboard/history.svelte';
	import { menuItems, tools } from './menu';

	let open = $state(false);

	const shortcut = /Mac|iPhone|iPad/.test(navigator.userAgent) ? '⌘K' : 'Ctrl K';
	const recentTools = $derived(
		history.map((url) => tools.find((t) => t.url === url)).filter((t) => t !== undefined)
	);

	function onkeydown(e: KeyboardEvent) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:window {onkeydown} />

<Button
	variant="outline"
	aria-label="Search tools"
	class="text-muted-foreground sm:w-56 sm:justify-start"
	onclick={() => (open = true)}
>
	<HugeiconsIcon icon={SearchIcon} />
	<span class="hidden sm:inline">Search tools...</span>
	<kbd class="ms-auto hidden text-[10px] tracking-widest sm:inline">{shortcut}</kbd>
</Button>

<Command.Dialog bind:open title="Search tools" description="Jump to a tool by name.">
	<Command.Input placeholder="Search tools..." />
	<Command.List>
		<Command.Empty>No tools found.</Command.Empty>
		{#if recentTools.length}
			<Command.Group heading="Recent">
				{#each recentTools as tool (tool.url)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<Command.LinkItem
						href={tool.url}
						value="recent {tool.url}"
						keywords={[tool.title]}
						onSelect={() => (open = false)}
					>
						<HugeiconsIcon icon={tool.icon} />
						{tool.title}
					</Command.LinkItem>
				{/each}
			</Command.Group>
		{/if}
		{#each menuItems.navMain as group (group.title)}
			<Command.Group heading={group.items ? group.title : undefined}>
				{#each group.items ?? [group] as item (item.url)}
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<Command.LinkItem
						href={item.url}
						value={item.url}
						keywords={[item.title, group.title]}
						onSelect={() => (open = false)}
					>
						<HugeiconsIcon icon={item.icon} />
						{item.title}
					</Command.LinkItem>
				{/each}
			</Command.Group>
		{/each}
	</Command.List>
</Command.Dialog>
