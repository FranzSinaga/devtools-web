<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { resolve } from '$app/paths';
	import type { ComponentProps } from 'svelte';
	import {
		ChartIcon,
		DashboardSquareIcon,
		FolderIcon,
		HelpSquareIcon,
		ListTreeIcon,
		SearchIcon,
		SettingsIcon,
		SpaceshipIcon,
		UserIcon
	} from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	const data = {
		navMain: [
			{
				title: 'Dashboard',
				url: '#',
				icon: DashboardSquareIcon
			},
			{
				title: 'Lifecycle',
				url: '#',
				icon: ListTreeIcon
			},
			{
				title: 'Analytics',
				url: '#',
				icon: ChartIcon
			},
			{
				title: 'Projects',
				url: '#',
				icon: FolderIcon
			},
			{
				title: 'Team',
				url: '#',
				icon: UserIcon
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: SettingsIcon
			},
			{
				title: 'Get Help',
				url: '#',
				icon: HelpSquareIcon
			},
			{
				title: 'Search',
				url: '#',
				icon: SearchIcon
			}
		]
	};
	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
	<Sidebar.Header class="mt-1.5">
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
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
