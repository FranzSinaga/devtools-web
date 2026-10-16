<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import LoremIpsum from '$lib/features/generator/lorem-ipsum/lorem-ipsum.svelte';
</script>

<Container class="space-y-2">
	<Title>Lorem Ipsum Generator</Title>
	<p class="text-sm text-muted-foreground">
		Lorem ipsum is placeholder text used in design and development to fill a layout before the real
		content is ready. Generate any number of paragraphs, sentences, or words and copy them straight
		into your mockups.
	</p>

	<div class="2xl:border 2xl:p-4">
		<LoremIpsum />
	</div>
</Container>
