<script lang="ts">
	import NumberInput from '$lib/components/number-input/number-input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Copy, Refresh } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';
	import { fields, generateFakeData, type Field } from './fake';

	const MAX_COUNT = 100;
	let count = $state('5');
	let enabled: Record<Field, boolean> = $state({ name: true, email: true, address: true });
	let json = $state('');

	function generate() {
		const rows = generateFakeData(Number(count), enabled);
		json = rows.length ? JSON.stringify(rows, null, 2) : '';
	}

	async function copy() {
		await navigator.clipboard.writeText(json);
		toast.success('Data successfully copied to clipboard!');
	}

	generate();
</script>

<div class="space-y-4">
	<NumberInput
		bind:value={count}
		id="count"
		label="Count"
		placeholder="Number of records"
		max={MAX_COUNT}
		handleInput={generate}
	/>

	<div class="flex flex-wrap gap-4">
		{#each fields as field (field)}
			<div class="flex items-center gap-2">
				<Checkbox id={field} bind:checked={enabled[field]} onCheckedChange={generate} />
				<Label for={field} class="capitalize">{field}</Label>
			</div>
		{/each}
	</div>

	<div class="space-y-2">
		<div class="flex w-full items-center justify-between">
			<p>JSON</p>
			<div class="flex gap-2">
				<Button variant="outline" size="icon" disabled={!json} onclick={copy}>
					<HugeiconsIcon icon={Copy} />
				</Button>
				<Button variant="outline" size="icon" disabled={!json} onclick={generate}>
					<HugeiconsIcon icon={Refresh} />
				</Button>
			</div>
		</div>
		<pre class="overflow-x-auto border px-3 py-2 font-mono text-sm">{json || 'No Data'}</pre>
	</div>
</div>
