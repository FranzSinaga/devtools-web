<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import JwtDecoder from '$lib/features/encoder-decoder/jwt-decoder/jwt-decoder.svelte';
</script>

<Container class="space-y-2">
	<Title>JWT Decoder</Title>
	<p class="text-sm text-muted-foreground">
		A JSON Web Token (JWT) is three Base64URL-encoded parts joined by dots: a header naming the
		signing algorithm, a payload of claims (such as the subject and expiry), and a signature. Paste
		a token to read its header and payload. The signature is not verified, so never trust a token
		just because it decodes. Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<JwtDecoder />
	</div>
</Container>
