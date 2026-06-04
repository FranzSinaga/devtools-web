<script lang="ts">
	import { setMode, userPrefersMode } from 'mode-watcher';
	import * as Select from '../ui/select/index';
	import Separator from '../ui/separator/separator.svelte';
	import * as Sidebar from '../ui/sidebar/index';

	type ThemeValue = 'dark' | 'light' | 'system';
	let value = $state<ThemeValue>(userPrefersMode.current ?? 'system');

	const themes: {
		label: string;
		value: ThemeValue;
	}[] = [
		{
			label: '🌑 Dark',
			value: 'dark'
		},
		{
			label: '☀️ Light',
			value: 'light'
		},
		{
			label: '💻 System',
			value: 'system'
		}
	];

	let selectedTheme = $derived.by(() => {
		return themes.find((t) => t.value === value);
	});
</script>

<header
	class="flex h-14.5 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14.5 theme-transition"
>
	<div class="flex w-full items-center justify-between gap-2 px-4">
		<div class="flex items-center gap-2">
			<Sidebar.Trigger class="-ms-1 cursor-pointer hover:bg-background" />
			<Separator orientation="vertical" class="me-2 data-[orientation=vertical]:h-4" />
		</div>
		<Select.Root type="single" bind:value onValueChange={(val) => setMode(val as ThemeValue)}>
			<Select.Trigger class="w-[180px]">
				{selectedTheme ? selectedTheme.label : 'Select Theme'}
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					<Select.Label>Theme</Select.Label>
					{#each themes as theme (theme.value)}
						<Select.Item value={theme.value} label={theme.label}>
							<!-- <HugeiconsIcon icon={theme.icon} /> -->
							{theme.label}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
</header>
