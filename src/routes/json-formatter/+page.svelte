<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import JsonFormatter from '$lib/features/formatter-converter/json-formatter/json-formatter.svelte';
</script>

<Container class="space-y-2">
	<Title>JSON Formatter &amp; Validator</Title>
	<p class="text-sm text-muted-foreground">
		JSON (JavaScript Object Notation) is the most common data format for APIs and config files.
		Paste JSON to check that it is valid and pretty-print it with 2 spaces, 4 spaces, or tabs, or
		minify it onto one line. Errors show where parsing failed. Everything runs locally in your
		browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<JsonFormatter />
	</div>
</Container>
