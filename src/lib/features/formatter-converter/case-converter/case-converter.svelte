<script lang="ts">
	import CopyRow from '$lib/components/copy-row.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { cases, convert } from './case';

	let text = $state('');

	const results = $derived(
		cases.map(({ name, convert: to }) => ({ name, value: convert(text, to) }))
	);
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="text">Input Your Text</Label>
		<Textarea id="text" class="max-h-64" placeholder="helloWorld or user_id" bind:value={text} />
	</fieldset>

	{#each results as { name, value } (name)}
		<CopyRow label={name} {value} class="min-h-9 whitespace-pre-line" disabled={!value.trim()} />
	{/each}
</div>
