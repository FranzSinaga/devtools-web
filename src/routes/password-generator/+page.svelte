<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import PasswordGenerator from '$lib/features/generator/password-generator/password-generator.svelte';
</script>

<Container class="space-y-2">
	<Title>Password Generator</Title>
	<p class="text-sm text-muted-foreground">
		Generate strong, random passwords right in your browser. Passwords are created locally using a
		cryptographically secure random number generator and are never sent to any server.
	</p>

	<div class="2xl:border 2xl:p-4">
		<PasswordGenerator />
	</div>
</Container>
