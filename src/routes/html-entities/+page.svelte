<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import Codec from '$lib/features/encoder-decoder/codec.svelte';
	import { decode, encode } from '$lib/features/encoder-decoder/html-entities/html-entities';
</script>

<Container class="space-y-2">
	<Title>HTML Entities Encoder / Decoder</Title>
	<p class="text-sm text-muted-foreground">
		HTML entities are escape sequences like <code>&amp;lt;</code> or <code>&amp;#39;</code> that let
		you show characters which would otherwise be read as markup. Encoding escapes
		<code>&amp; &lt; &gt; " '</code> so text is safe to place inside HTML; decoding resolves any named
		or numeric entity back to its character. Type on either side to encode or decode. Everything runs
		locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<Codec {encode} {decode} encodedLabel="HTML Encoded" placeholder="<b>Tom & Jerry</b>" />
	</div>
</Container>
