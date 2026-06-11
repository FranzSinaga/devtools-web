<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet<[]> | undefined;
	};
	let { class: className, children }: Props = $props();
</script>

<h1 class={cn('border-b py-2 text-xl font-semibold', className)}>
	{@render children?.()}
</h1>
