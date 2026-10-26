<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { Copy } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { toast } from 'svelte-sonner';

	type Props = {
		label: string;
		value: string;
		class?: string;
		disabled?: boolean;
	};
	let { label, value, class: className, disabled = false }: Props = $props();

	async function copy() {
		await navigator.clipboard.writeText(value);
		toast.success(`${label} successfully copied to clipboard!`);
	}
</script>

<div class="space-y-2">
	<div class="flex w-full items-center justify-between">
		<p>{label}</p>
		<Button variant="outline" size="icon" {disabled} onclick={copy}>
			<HugeiconsIcon icon={Copy} />
		</Button>
	</div>
	<div class={cn('border px-2 py-2 font-mono text-sm break-all', className)}>{value}</div>
</div>
