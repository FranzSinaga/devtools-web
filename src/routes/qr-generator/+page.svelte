<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import QrGenerator from '$lib/features/generator/qr-generator/qr-generator.svelte';
</script>

<Container class="space-y-2">
	<Title>Qr Code Generator</Title>
	<p class="text-sm text-muted-foreground">
		A QR (Quick Response) Code is a two-dimensional barcode capable of storing data (such as URLs,
		plain text, or contact info) in a square grid of pixels, readable by digital devices like
		smartphones. In web development, developers frequently use QR codes to quickly test, debug, and
		transfer web application pages from desktop environments to mobile testing devices.
	</p>

	<div class="2xl:border 2xl:p-4">
		<QrGenerator />
	</div>
</Container>
