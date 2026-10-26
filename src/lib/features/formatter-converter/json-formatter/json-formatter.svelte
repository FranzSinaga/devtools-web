<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Copy } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';

	const indents: Record<string, string> = {
		'2 spaces': '  ',
		'4 spaces': '    ',
		Tab: '\t',
		Minify: ''
	};

	let input = $state('');
	let indent = $state('2 spaces');

	const result = $derived.by(() => {
		if (!input.trim()) return { output: '', error: '' };
		try {
			return { output: JSON.stringify(JSON.parse(input), null, indents[indent]), error: '' };
		} catch (e) {
			return { output: '', error: (e as Error).message };
		}
	});

	async function copy() {
		await navigator.clipboard.writeText(result.output);
		toast.success('JSON successfully copied to clipboard!');
	}
</script>

<div class="space-y-2">
	<div class="grid gap-4 lg:grid-cols-2">
		<fieldset class="space-y-1.5">
			<div class="flex h-8 w-full items-center">
				<Label for="json">Input</Label>
			</div>
			<Textarea
				id="json"
				class="h-96 font-mono"
				placeholder={'{"name":"Jane","tags":["a","b"]}'}
				aria-invalid={!!result.error}
				bind:value={input}
			/>
		</fieldset>

		<div class="space-y-1.5">
			<div class="flex w-full items-center justify-between gap-2">
				<p class="text-sm">Output</p>
				<div class="flex gap-2">
					<Select.Root type="single" bind:value={indent}>
						<Select.Trigger class="w-32">{indent}</Select.Trigger>
						<Select.Content>
							{#each Object.keys(indents) as i (i)}
								<Select.Item value={i} />
							{/each}
						</Select.Content>
					</Select.Root>
					<Button variant="outline" size="icon" disabled={!result.output} onclick={copy}>
						<HugeiconsIcon icon={Copy} />
					</Button>
				</div>
			</div>
			<pre class="h-96 overflow-auto border px-2.5 py-2 font-mono text-xs">{result.output}</pre>
		</div>
	</div>
	{#if result.error}
		<p class="text-sm text-destructive">Invalid JSON: {result.error}</p>
	{:else if result.output}
		<p class="text-sm text-muted-foreground">Valid JSON</p>
	{/if}
</div>
