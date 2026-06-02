<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import AppSidebar from '$lib/components/app-menu/app-sidebar.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar variant="sidebar" />
	<Sidebar.Inset>
		<header
			class="flex h-14.5 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14.5"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ms-1 hover:bg-background cursor-pointer" />
				<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="aspect-video rounded-xl bg-muted/50"></div>
				<div class="aspect-video rounded-xl bg-muted/50"></div>
				<div class="aspect-video rounded-xl bg-muted/50"></div>
			</div>
			<div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min"></div>
		</div>
		{@render children()}
	</Sidebar.Inset>
</Sidebar.Provider>
