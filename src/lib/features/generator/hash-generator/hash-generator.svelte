<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Copy } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';
	import { algorithms, hash, type Algorithm } from './hash';

	let text = $state('');
	let hashes: Partial<Record<Algorithm, string>> = $state({});

	async function update() {
		const input = text;
		const results = await Promise.all(algorithms.map((a) => hash(a, input)));
		// Ignore results from an older keystroke that resolved late.
		if (input === text) hashes = Object.fromEntries(algorithms.map((a, i) => [a, results[i]]));
	}

	async function copy(algorithm: Algorithm) {
		await navigator.clipboard.writeText(hashes[algorithm] ?? '');
		toast.success(`${algorithm} hash successfully copied to clipboard!`);
	}

	update();
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="text">Input Your Text</Label>
		<Textarea id="text" placeholder="Hello world" bind:value={text} oninput={update} />
	</fieldset>

	{#each algorithms as algorithm (algorithm)}
		<div class="space-y-2">
			<div class="flex w-full items-center justify-between">
				<p>{algorithm}</p>
				<Button
					variant="outline"
					size="icon"
					disabled={!hashes[algorithm]}
					onclick={() => copy(algorithm)}
				>
					<HugeiconsIcon icon={Copy} />
				</Button>
			</div>
			<div class="border px-2 py-2 font-mono text-sm break-all">{hashes[algorithm]}</div>
		</div>
	{/each}
</div>
