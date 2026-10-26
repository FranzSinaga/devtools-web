<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Copy } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';

	let dataUrl = $state('');
	const outputs = $derived([
		{ label: 'Base64', value: dataUrl.slice(dataUrl.indexOf(',') + 1) },
		{ label: 'Data URL', value: dataUrl }
	]);

	function read(event: Event) {
		const file = (event.currentTarget as HTMLInputElement).files?.[0];
		if (!file) return (dataUrl = '');
		const reader = new FileReader();
		reader.onload = () => (dataUrl = reader.result as string);
		reader.onerror = () => toast.error(`Could not read ${file.name}`);
		reader.readAsDataURL(file);
	}

	async function copy(label: string, value: string) {
		await navigator.clipboard.writeText(value);
		toast.success(`${label} successfully copied to clipboard!`);
	}
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="file">Choose a File</Label>
		<Input id="file" type="file" onchange={read} />
	</fieldset>

	{#each outputs as { label, value } (label)}
		<div class="space-y-2">
			<div class="flex w-full items-center justify-between">
				<p>{label}</p>
				<Button
					variant="outline"
					size="icon"
					disabled={!dataUrl}
					onclick={() => copy(label, value)}
				>
					<HugeiconsIcon icon={Copy} />
				</Button>
			</div>
			<Textarea
				class="max-h-64 font-mono break-all"
				aria-label={label}
				readonly
				placeholder="No Data"
				{value}
			/>
		</div>
	{/each}
</div>
