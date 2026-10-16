<script lang="ts">
	import NumberInput from '$lib/components/number-input/number-input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import { Copy, Refresh } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';
	import { generateLorem, units, type Unit } from './lorem';

	const MAX_COUNT = 100;
	let count = $state('3');
	let unit: Unit = $state('paragraphs');
	let startWithLorem = $state(true);
	let text = $state('');

	function generate() {
		text = generateLorem(Number(count), unit, startWithLorem);
	}

	async function copy() {
		await navigator.clipboard.writeText(text);
		toast.success('Text successfully copied to clipboard!');
	}

	generate();
</script>

<div class="space-y-4">
	<div class="flex flex-wrap items-end gap-4">
		<NumberInput
			bind:value={count}
			id="count"
			label="Count"
			placeholder="Count"
			max={MAX_COUNT}
			handleInput={generate}
		/>
		<Select.Root type="single" bind:value={unit} onValueChange={generate}>
			<Select.Trigger class="w-[180px] capitalize">{unit}</Select.Trigger>
			<Select.Content>
				{#each units as u (u)}
					<Select.Item value={u} class="capitalize" />
				{/each}
			</Select.Content>
		</Select.Root>
		<div class="flex h-8 items-center gap-2">
			<Checkbox id="start-lorem" bind:checked={startWithLorem} onCheckedChange={generate} />
			<Label for="start-lorem">Start with "Lorem ipsum"</Label>
		</div>
	</div>

	<div class="space-y-2">
		<div class="flex w-full items-center justify-between">
			<p>Text</p>
			<div class="flex gap-2">
				<Button variant="outline" size="icon" disabled={!text} onclick={copy}>
					<HugeiconsIcon icon={Copy} />
				</Button>
				<Button variant="outline" size="icon" disabled={!text} onclick={generate}>
					<HugeiconsIcon icon={Refresh} />
				</Button>
			</div>
		</div>
		<div class="border px-3 py-2 whitespace-pre-line">
			{text || 'No Data'}
		</div>
	</div>
</div>
