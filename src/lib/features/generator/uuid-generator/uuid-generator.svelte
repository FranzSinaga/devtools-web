<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import NumberInput from '$lib/components/number-input/number-input.svelte';
	import { Copy, Refresh } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { v1 as uuidv1, v4 as uuidv4, v7 as uuidv7 } from 'uuid';

	type Props = {
		version: 'v1' | 'v4' | 'v7';
	};
	let { version = 'v4' }: Props = $props();

	const MAX_QTY = 50;
	let qty: string = $state('');
	let uuids: string[] = $state([]);

	function generateUuids(qty: number) {
		const gen: () => string = { v1: uuidv1, v4: uuidv4, v7: uuidv7 }[version];
		uuids = Array.from({ length: qty }, () => gen());
	}

	async function copy() {
		await navigator.clipboard.writeText(uuids.join('\n'));
		toast.success('UUIDs successfully copied to clipboard!');
	}
</script>

<p class="pb-4 text-muted-foreground">
	{#if version === 'v1'}
		A Version 1 UUID is a universally unique identifier that is generated using a timestamp and the
		MAC address of the computer on which it was generated.
	{:else if version === 'v4'}
		A Version 4 UUID is a universally unique identifier that is generated using random numbers. The
		Version 4 UUIDs produced by this site were generated using a secure random number generator.
	{:else if version === 'v7'}
		A Version 7 UUID is a universally unique identifier that is generated using a timestamp, a
		counter and a cryptographically strong random number. Generally, Version 7 UUIDs have better
		entropy (i.e. randomness) than Version 1 UUIDs.
	{/if}
</p>

<div class="space-y-4">
	<div class="space-y-1.5">
		<NumberInput
			bind:value={qty}
			id="quantity"
			label="Quantity"
			placeholder="UUID Quantity"
			max={MAX_QTY}
			handleInput={() => generateUuids(Number(qty))}
		/>
		{#if Number(qty) >= MAX_QTY}
			<p transition:fade={{ duration: 300 }} class="text-yellow-800">
				Max number of quantity is {MAX_QTY}
			</p>
		{/if}
	</div>

	<div class="space-y-2">
		<div class="flex w-full items-center justify-between">
			<p>UUIDs</p>
			<div class="flex gap-2">
				<Button variant="outline" size="icon" disabled={uuids.length <= 0} onclick={copy}>
					<HugeiconsIcon icon={Copy} />
				</Button>
				<Button
					onclick={() => generateUuids(Number(qty))}
					variant="outline"
					size="icon"
					disabled={uuids.length <= 0}
				>
					<HugeiconsIcon icon={Refresh} />
				</Button>
			</div>
		</div>
		<div class="border py-2 text-center">
			{#if uuids.length <= 0}
				<p class="">No Data</p>
			{/if}
			<ul>
				{#each uuids as uuid (uuid)}
					<li>{uuid}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
