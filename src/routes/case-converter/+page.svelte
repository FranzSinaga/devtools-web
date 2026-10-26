<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import CaseConverter from '$lib/features/formatter-converter/case-converter/case-converter.svelte';
</script>

<Container class="space-y-2">
	<Title>Case Converter</Title>
	<p class="text-sm text-muted-foreground">
		Convert text or identifiers between naming conventions such as camelCase, PascalCase,
		snake_case, CONSTANT_CASE, and kebab-case. Words are split on spaces, punctuation, case changes,
		and digits, so <code>XMLHttpRequest</code> becomes <code>xml_http_request</code>. Each line is
		converted separately. Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<CaseConverter />
	</div>
</Container>
