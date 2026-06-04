<script>
	import { CpuIcon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { summaryQueries } from './query';
	import Container from '$lib/components/container.svelte';

	const query = createQuery(() => summaryQueries.get());
</script>

<div class="grid w-full grid-cols-4">
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each { length: 4 } as _, i (i)}
		<div class="border p-4">
			<div class="flex justify-between">
				<p>CPU Ussage</p>
				<HugeiconsIcon icon={CpuIcon} />
			</div>
			<div class="py-5">
				<p class="text-lg text-green-600">10%</p>
				<p class="text-sm">6 cores • AMD Ryzen 5</p>
			</div>
		</div>
	{/each}
</div>

<Container>
	<h2>System Informations</h2>
	{#if query.isLoading}
		<p>Loading...</p>
	{:else if query.data}
		<div class="overflow-x-auto">
			<pre>{JSON.stringify(query.data, null, 2)}</pre>
		</div>
	{:else if query.isError}
		<p>Error</p>
	{/if}
</Container>
