<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet<[]> | undefined;
	};
	let { class: className, children }: Props = $props();
</script>

<div class={cn('text-xl font-semibold py-2 ', className)}>
	{@render children?.()}
</div>
