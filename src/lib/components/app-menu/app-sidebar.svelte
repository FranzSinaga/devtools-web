<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { resolve } from '$app/paths';
	import type { ComponentProps } from 'svelte';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { SpaceshipIcon } from '@hugeicons/core-free-icons';
	import { menuItems as data } from './menu';

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header class="mt-1.5">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:p-1.5!">
					{#snippet child({ props })}
						<a href={resolve('/')} {...props}>
							<HugeiconsIcon icon={SpaceshipIcon} />
							<span class="text-base font-semibold">Acme Inc.</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<!-- <Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer> -->
</Sidebar.Root>
