<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import AppSidebar from '$lib/components/app-menu/app-sidebar.svelte';
	import AppHeader from '$lib/components/app-menu/app-header.svelte';

	import { ModeWatcher } from 'mode-watcher';
	import { dev } from '$app/environment';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher modeStorageKey="app-mode" disableHeadScriptInjection={true} />
<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="sidebar" />
	<Sidebar.Inset>
		<div class="flex h-screen flex-col">
			<AppHeader />
			<QueryClientProvider client={data.queryClient}>
				{@render children()}

				{#if dev}
					{#await import('@tanstack/svelte-query-devtools') then { SvelteQueryDevtools }}
						<SvelteQueryDevtools buttonPosition="bottom-right" />
					{/await}
				{/if}
			</QueryClientProvider>

			<div
				class="flex-1 shrink-0 border-y bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 md:col-span-2 md:block lg:col-span-4 dark:[--pattern-fg:var(--color-white)]/10"
			></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
