<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import ColorConverter from '$lib/features/formatter-converter/color-converter/color-converter.svelte';
</script>

<Container class="space-y-2">
	<Title>Color Converter</Title>
	<p class="text-sm text-muted-foreground">
		Convert a CSS color between HEX, RGB, HSL, and OKLCH. Type any color CSS understands, including
		named colors like <code>rebeccapurple</code>, or use the picker. OKLCH is a perceptual color
		space: equal steps in lightness look equal to the eye, which makes it handy for building
		palettes. Everything runs locally in your browser.
	</p>

	<div class="2xl:border 2xl:p-4">
		<ColorConverter />
	</div>
</Container>
