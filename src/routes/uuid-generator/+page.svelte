<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import UuidGenerator from '$lib/features/uuids-generator/uuid-generator.svelte';
</script>

<Container class="space-y-2">
	<Title>UUIDs Generator</Title>
	<p class="text-sm text-muted-foreground">
		UUID (Universally Unique Identifier) is a 128-bit number used to uniquely identify information
		or objects in computer systems. Unlike traditional sequential IDs (like 1, 2, 3), UUIDs are
		generated locally by an application without a central authority. The probability of a duplicate
		is practically zero.
	</p>

	<div class="mx-auto 2xl:border 2xl:p-4">
		<Tabs.Root value="v4">
			<Tabs.List>
				<Tabs.Trigger value="v4">Version 4</Tabs.Trigger>
				<Tabs.Trigger value="v7">Version 7</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="v4"><UuidGenerator version="v4" /></Tabs.Content>
			<Tabs.Content value="v7"><UuidGenerator version="v7" /></Tabs.Content>
		</Tabs.Root>
	</div>
</Container>
