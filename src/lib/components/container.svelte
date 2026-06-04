<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet<[]> | undefined;
	};
	let { class: className, children }: Props = $props();
</script>

<div class={cn('px-4', className)}>
	{@render children?.()}
</div>
