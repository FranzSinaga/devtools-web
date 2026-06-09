<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/svelte';
	import type { WithoutChildren } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	let {
		items,
		...restProps
	}: { items: { title: string; url: string; icon: IconSvgElement }[] } & WithoutChildren<
		ComponentProps<typeof Sidebar.Group>
	> = $props();
</script>

<Sidebar.Group {...restProps}>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<!-- <Sidebar.Menu>
			<Sidebar.MenuItem class="flex items-center gap-2">
				<Sidebar.MenuButton
					class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
					tooltipContent="Quick create"
				>
					<HugeiconsIcon icon={CirclePlus} />
					<span>Quick Create</span>
				</Sidebar.MenuButton>
				<Button
					size="icon"
					class="size-8 group-data-[collapsible=icon]:opacity-0"
					variant="outline"
				>
					<HugeiconsIcon icon={MailIcon} />
					<span class="sr-only">Inbox</span>
				</Button>
			</Sidebar.MenuItem>
		</Sidebar.Menu> -->
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#snippet child({ props })}
							<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
							<a href={item.url} {...props}>
								<HugeiconsIcon icon={item.icon} />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
