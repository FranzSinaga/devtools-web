<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index';
	import Codec from '$lib/features/encoder-decoder/codec.svelte';
	import Base64File from '$lib/features/encoder-decoder/base64/base64-file.svelte';
	import { decode, encode } from '$lib/features/encoder-decoder/base64/base64';
</script>

<Container class="space-y-2">
	<Title>Base64 Encoder / Decoder</Title>
	<p class="text-sm text-muted-foreground">
		Base64 represents binary data using 64 printable ASCII characters, so it can travel through
		text-only channels like JSON, email, or URLs. Every 3 bytes become 4 characters, making the
		output about a third larger. Type on either side to encode or decode, or turn a file into a
		Base64 string or data URL. Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<Tabs.Root value="text">
			<Tabs.List>
				<Tabs.Trigger value="text">Text</Tabs.Trigger>
				<Tabs.Trigger value="file">File</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="text">
				<Codec {encode} {decode} encodedLabel="Base64" />
			</Tabs.Content>
			<Tabs.Content value="file"><Base64File /></Tabs.Content>
		</Tabs.Root>
	</div>
</Container>
