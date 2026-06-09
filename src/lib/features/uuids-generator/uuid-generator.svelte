<script lang="ts">
	import NumberInput from '$lib/components/number-input/number-input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Copy, Refresh } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';
	import { v4 as uuidv4, v7 as uudiv7 } from 'uuid';

	type Props = {
		version: 'v4' | 'v7';
	};
	let { version = 'v4' }: Props = $props();

	let qty: string = $state('');
	let uuids: string[] = $state([]);

	function generateUuids(qty: number) {
		switch (version) {
			case 'v4':
				uuids = Array.from({ length: qty }, () => uuidv4());
				break;
			case 'v7':
				uuids = Array.from({ length: qty }, () => uudiv7());
				break;
			default:
				uuids = Array.from({ length: qty }, () => uuidv4());
				break;
		}
	}

	/**
	 * Copies an array of strings to the system clipboard.
	 * @param lines - The array of strings to copy.
	 * @param separator - The string used to join elements (defaults to a newline).
	 * @returns A promise that resolves when the text is successfully copied.
	 */
	async function copyArrayToClipboard(separator: string = '\n'): Promise<void> {
		try {
			const textToCopy = uuids.join(separator);
			await navigator.clipboard.writeText(textToCopy);
			console.log('Array successfully copied to clipboard!');
		} catch (error) {
			console.error('Failed to copy text: ', error);
			throw error;
		}
	}

	const mutation = createMutation(() => ({
		mutationFn: async () => {
			await copyArrayToClipboard();
		},
		onSuccess: () => {
			toast.success('UUIDs successfully copied to clipboard!');
		},
		onError: () => {}
	}));
</script>

<p class="pb-4 text-muted-foreground">
	{#if version === 'v4'}
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
			max={50}
			id="quantity"
			handleInput={() => {
				generateUuids(Number(qty));
			}}
		/>
		{#if Number(qty) >= 50}
			<p transition:fade={{ duration: 300 }} class="text-yellow-800">
				Max number of quantity is 50
			</p>
		{/if}
	</div>

	<div class="space-y-2">
		<div class="flex w-full items-center justify-between">
			<p>UUIDs</p>
			<div class="flex gap-2">
				<Button
					variant="outline"
					size="icon"
					disabled={uuids.length <= 0 || mutation.isPending}
					onclick={() => {
						mutation.mutate();
					}}
				>
					<HugeiconsIcon icon={Copy} />
				</Button>
				<Button
					onclick={() => {
						generateUuids(Number(qty));
					}}
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
