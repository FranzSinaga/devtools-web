<script>
	import Container from '$lib/components/container.svelte';
	import Title from '$lib/components/title.svelte';
	import Dashboard from '$lib/features/dashboard/dashboard.svelte';
</script>

<Container class="space-y-2">
	<Title>Dashboard</Title>
	<p class="text-sm text-muted-foreground">
		Your favorite tools in one place. Favorites are saved in this browser only.
	</p>
	<Dashboard />
</Container>
