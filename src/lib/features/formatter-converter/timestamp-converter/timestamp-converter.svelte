<script lang="ts">
	import CopyRow from '$lib/components/copy-row.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { parseTimestamp, relative } from './timestamp';

	const nowSeconds = () => String(Math.floor(Date.now() / 1000));
	let input = $state(nowSeconds());

	const parsed = $derived(parseTimestamp(input));
	const invalid = $derived(!!input.trim() && !parsed);

	const rows = $derived.by(() => {
		if (!parsed) return [];
		const { date } = parsed;
		return [
			{ label: 'Unix (seconds)', value: String(Math.floor(date.getTime() / 1000)) },
			{ label: 'Unix (milliseconds)', value: String(date.getTime()) },
			{ label: 'ISO 8601', value: date.toISOString() },
			{ label: 'UTC', value: date.toUTCString() },
			{
				label: 'Local',
				value: date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'long' })
			},
			{ label: 'Relative', value: relative(date) }
		];
	});
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="timestamp">Timestamp or Date</Label>
		<div class="flex gap-2">
			<Input
				id="timestamp"
				class="font-mono"
				placeholder="1700000000, 1700000000000, or 2023-11-14T22:13:20Z"
				aria-invalid={invalid}
				bind:value={input}
			/>
			<Button variant="outline" onclick={() => (input = nowSeconds())}>Now</Button>
		</div>
		{#if invalid}
			<p class="text-sm text-destructive">Invalid timestamp or date</p>
		{:else if parsed}
			<p class="text-sm text-muted-foreground">Read as {parsed.unit}</p>
		{/if}
	</fieldset>

	{#each rows as { label, value } (label)}
		<CopyRow {label} {value} />
	{/each}
</div>
