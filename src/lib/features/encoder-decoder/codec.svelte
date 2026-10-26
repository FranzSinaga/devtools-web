<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Copy } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		encode: (text: string) => string;
		decode: (text: string) => string;
		encodedLabel: string;
		placeholder?: string;
	};
	let { encode, decode, encodedLabel, placeholder = 'Hello world' }: Props = $props();

	let decoded = $state('');
	let encoded = $state('');
	let error = $state('');

	function onDecodedInput() {
		try {
			encoded = encode(decoded);
			error = '';
		} catch {
			error = 'Text cannot be encoded';
		}
	}

	function onEncodedInput() {
		try {
			decoded = decode(encoded);
			error = '';
		} catch {
			error = 'Invalid input, cannot decode';
		}
	}

	async function copy(value: string) {
		await navigator.clipboard.writeText(value);
		toast.success('Text successfully copied to clipboard!');
	}
</script>

<div class="space-y-2">
	<div class="grid gap-4 lg:grid-cols-2">
		<fieldset class="space-y-1.5">
			<div class="flex w-full items-center justify-between">
				<Label for="decoded">Text</Label>
				<Button variant="outline" size="icon" disabled={!decoded} onclick={() => copy(decoded)}>
					<HugeiconsIcon icon={Copy} />
				</Button>
			</div>
			<Textarea
				id="decoded"
				class="max-h-96 font-mono"
				{placeholder}
				bind:value={decoded}
				oninput={onDecodedInput}
			/>
		</fieldset>

		<fieldset class="space-y-1.5">
			<div class="flex w-full items-center justify-between">
				<Label for="encoded">{encodedLabel}</Label>
				<Button variant="outline" size="icon" disabled={!encoded} onclick={() => copy(encoded)}>
					<HugeiconsIcon icon={Copy} />
				</Button>
			</div>
			<Textarea
				id="encoded"
				class="max-h-96 font-mono break-all"
				placeholder={encode(placeholder)}
				aria-invalid={!!error}
				bind:value={encoded}
				oninput={onEncodedInput}
			/>
		</fieldset>
	</div>
	{#if error}
		<p class="text-sm text-destructive">{error}</p>
	{/if}
</div>
