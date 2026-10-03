<script lang="ts">
	import NumberInput from '$lib/components/number-input/number-input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Copy, Refresh } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';
	import { charsets, generatePassword, type Charset } from './password';

	const MAX_LENGTH = 128;
	let length = $state('16');
	let enabled: Record<Charset, boolean> = $state({
		uppercase: true,
		lowercase: true,
		numbers: true,
		symbols: true
	});
	let password = $state('');

	function generate() {
		const sets = (Object.keys(enabled) as Charset[]).filter((s) => enabled[s]);
		password = generatePassword(Number(length), sets);
	}

	async function copy() {
		await navigator.clipboard.writeText(password);
		toast.success('Password successfully copied to clipboard!');
	}

	generate();
</script>

<div class="space-y-4">
	<NumberInput
		bind:value={length}
		id="length"
		label="Length"
		placeholder="Password length"
		max={MAX_LENGTH}
		handleInput={generate}
	/>

	<div class="flex flex-wrap gap-4">
		{#each Object.keys(charsets) as Charset[] as set (set)}
			<div class="flex items-center gap-2">
				<Checkbox id={set} bind:checked={enabled[set]} onCheckedChange={generate} />
				<Label for={set} class="capitalize">{set}</Label>
			</div>
		{/each}
	</div>

	<div class="space-y-2">
		<div class="flex w-full items-center justify-between">
			<p>Password</p>
			<div class="flex gap-2">
				<Button variant="outline" size="icon" disabled={!password} onclick={copy}>
					<HugeiconsIcon icon={Copy} />
				</Button>
				<Button variant="outline" size="icon" disabled={!password} onclick={generate}>
					<HugeiconsIcon icon={Refresh} />
				</Button>
			</div>
		</div>
		<div class="border px-2 py-2 text-center font-mono break-all">
			{password || 'No Data'}
		</div>
	</div>
</div>
