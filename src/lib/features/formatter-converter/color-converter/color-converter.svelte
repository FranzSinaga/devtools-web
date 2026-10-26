<script lang="ts">
	import CopyRow from '$lib/components/copy-row.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { parseColor, toHex, toHsl, toOklch, toRgb } from './color';

	let input = $state('#3b82f6');

	const color = $derived(parseColor(input));
	const invalid = $derived(!!input.trim() && !color);

	const formats = $derived(
		color
			? [
					{ label: 'HEX', value: toHex(color) },
					{ label: 'RGB', value: toRgb(color) },
					{ label: 'HSL', value: toHsl(color) },
					{ label: 'OKLCH', value: toOklch(color) }
				]
			: []
	);
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="color">Color</Label>
		<div class="flex gap-2">
			<!-- The native picker only speaks #rrggbb. -->
			<input
				type="color"
				aria-label="Pick a color"
				class="h-8 w-10 shrink-0 cursor-pointer border bg-transparent"
				value={color ? toHex({ ...color, a: 1 }) : '#000000'}
				oninput={(e) => (input = e.currentTarget.value)}
			/>
			<Input
				id="color"
				class="font-mono"
				placeholder="#3b82f6, rgb(59 130 246), hsl(217 91% 60%), oklch(62% 0.19 260), or a name"
				aria-invalid={invalid}
				bind:value={input}
			/>
		</div>
		{#if invalid}
			<p class="text-sm text-destructive">Invalid CSS color</p>
		{/if}
	</fieldset>

	{#if color}
		<div class="h-16 border" style:background-color={toRgb(color)}></div>
	{/if}

	{#each formats as { label, value } (label)}
		<CopyRow {label} {value} />
	{/each}
</div>
