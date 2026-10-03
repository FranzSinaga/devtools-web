<script lang="ts">
	import { cn } from '$lib/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		children: Snippet<[]> | undefined;
	};
	let { class: className, children }: Props = $props();
</script>

<div class={cn('p-4 2xl:mx-auto 2xl:w-4xl', className)}>
	{@render children?.()}
</div>
