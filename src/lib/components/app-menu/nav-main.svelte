<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/svelte';
	import * as Collapsible from '../ui/collapsible/index';
	import { ChevronRight } from '@hugeicons/core-free-icons';

	let {
		items,
		...restProps
	}: {
		items: {
			title: string;
			url: string;
			icon?: IconSvgElement;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
				icon?: IconSvgElement;
			}[];
		}[];
	} = $props();
</script>

<Sidebar.Group {...restProps}>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			{#each items as item (item.title)}
				{#if item.items}
					<Collapsible.Root open={item.isActive} class="group/collapsible">
						{#snippet child({ props })}
							<Sidebar.MenuItem {...props}>
								<Collapsible.Trigger>
									{#snippet child({ props })}
										<Sidebar.MenuButton {...props} tooltipContent={item.title}>
											{#if item.icon}
												<HugeiconsIcon icon={item.icon} />
											{/if}
											<span>{item.title}</span>
											<HugeiconsIcon
												icon={ChevronRight}
												class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
											/>
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content
									class="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
								>
									<Sidebar.MenuSub>
										{#each item.items ?? [] as subItem (subItem.title)}
											<Sidebar.MenuSubItem>
												<Sidebar.MenuSubButton>
													{#snippet child({ props })}
														<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
														<a href={subItem.url} {...props}>
															<span class="flex items-center gap-2">
																{#if subItem.icon}
																	<HugeiconsIcon icon={subItem.icon} size={15} />
																{/if}{subItem.title}
															</span>
														</a>
													{/snippet}
												</Sidebar.MenuSubButton>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							</Sidebar.MenuItem>
						{/snippet}
					</Collapsible.Root>
				{:else}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton tooltipContent={item.title}>
							{#snippet child({ props })}
								<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
								<a href={item.url} {...props}>
									{#if item.icon}
										<HugeiconsIcon icon={item.icon} />
									{/if}
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				{/if}
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
