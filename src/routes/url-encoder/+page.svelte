<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import Codec from '$lib/features/encoder-decoder/codec.svelte';
</script>

<Container class="space-y-2">
	<Title>URL Encoder / Decoder</Title>
	<p class="text-sm text-muted-foreground">
		URL encoding (percent-encoding) replaces characters that are reserved or unsafe in a URL, such
		as spaces, <code>&amp;</code>, <code>?</code>, or non-ASCII letters, with a <code>%</code>
		followed by their UTF-8 bytes in hex. Use it for query string values and path segments. Type on either
		side to encode or decode. Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<Codec
			encode={encodeURIComponent}
			decode={decodeURIComponent}
			encodedLabel="URL Encoded"
			placeholder="name=Jane Doe&city=São Paulo"
		/>
	</div>
</Container>
