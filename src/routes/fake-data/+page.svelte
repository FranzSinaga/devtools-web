<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import FakeData from '$lib/features/generator/fake-data/fake-data.svelte';
</script>

<Container class="space-y-2">
	<Title>Fake Data Generator</Title>
	<p class="text-sm text-muted-foreground">
		Generate realistic-looking but fictional people, with names, emails, and addresses, to seed
		databases, fill forms, and test layouts. Emails use reserved example domains, so they never
		reach a real inbox. Everything is generated locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<FakeData />
	</div>
</Container>
