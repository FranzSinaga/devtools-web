<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import TimestampConverter from '$lib/features/formatter-converter/timestamp-converter/timestamp-converter.svelte';
</script>

<Container class="space-y-2">
	<Title>Timestamp Converter</Title>
	<p class="text-sm text-muted-foreground">
		A Unix timestamp counts the seconds (or milliseconds) since 1970-01-01 00:00:00 UTC. Enter a
		timestamp to see it as ISO 8601, UTC, and local time, or enter a date string to get its
		timestamp. Numbers below 100,000,000,000 are read as seconds, larger ones as milliseconds.
		Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<TimestampConverter />
	</div>
</Container>
