<script lang="ts">
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { DownloadIcon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import qrcode from 'qrcode-generator';

	let value = $state('');

	let qrSrc = $derived(value ? toQr(value) : '');

	function toQr(text: string) {
		try {
			const qr = qrcode(0, 'L');
			qr.addData(text);
			qr.make();
			return qr.createDataURL(10, 20);
		} catch {
			return ''; // input too long for a QR code
		}
	}
</script>

<Container class="space-y-2">
	<Title>Qr Code Generator</Title>
	<p class="text-sm text-muted-foreground">
		A QR (Quick Response) Code is a two-dimensional barcode capable of storing data (such as URLs,
		plain text, or contact info) in a square grid of pixels, readable by digital devices like
		smartphones. In web development, developers frequently use QR codes to quickly test, debug, and
		transfer web application pages from desktop environments to mobile testing devices.
	</p>

	<div class="space-y-2 2xl:border 2xl:p-4">
		<fieldset class="space-y-1.5">
			<Label for="text">Input Your Text</Label>
			<Input id="text" placeholder="https://myurl.com" bind:value />
		</fieldset>

		{#if qrSrc}
			<img src={qrSrc} alt="QR Code" />
			<Button href={qrSrc} download="qr-code.gif">
				<HugeiconsIcon icon={DownloadIcon} /> Download
			</Button>
		{/if}
	</div>
</Container>
