<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import HashGenerator from '$lib/features/generator/hash-generator/hash-generator.svelte';
</script>

<Container class="space-y-2">
	<Title>Hash Generator</Title>
	<p class="text-sm text-muted-foreground">
		A cryptographic hash function turns any input into a fixed-length string (a digest). The same
		input always produces the same hash, but even a one-character change produces a completely
		different one, and the original input cannot be recovered from it. Hashes are commonly used to
		verify file integrity, compare data, and generate checksums. Everything is computed locally in
		your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<HashGenerator />
	</div>
</Container>
