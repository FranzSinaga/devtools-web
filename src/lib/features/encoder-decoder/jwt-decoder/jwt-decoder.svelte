<script lang="ts">
	import CopyRow from '$lib/components/copy-row.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { decodeJwt } from './jwt';

	let token = $state('');

	const jwt = $derived.by(() => {
		try {
			return decodeJwt(token);
		} catch {
			return undefined;
		}
	});
	const invalid = $derived(!!token.trim() && !jwt);

	const sections = $derived(
		jwt
			? [
					{ label: 'Header', value: JSON.stringify(jwt.header, null, 2) },
					{ label: 'Payload', value: JSON.stringify(jwt.payload, null, 2) }
				]
			: []
	);

	// Registered time claims are seconds since the epoch.
	const times = $derived(
		(['iat', 'nbf', 'exp'] as const).flatMap((claim) => {
			const seconds = jwt?.payload[claim];
			return typeof seconds === 'number' ? [{ claim, date: new Date(seconds * 1000) }] : [];
		})
	);
	const exp = $derived(times.find((t) => t.claim === 'exp'));
</script>

<div class="space-y-4">
	<fieldset class="space-y-1.5">
		<Label for="token">Paste Your JWT</Label>
		<Textarea
			id="token"
			class="max-h-64 font-mono break-all"
			placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature"
			aria-invalid={invalid}
			bind:value={token}
		/>
		{#if invalid}
			<p class="text-sm text-destructive">Invalid JWT</p>
		{/if}
	</fieldset>

	{#each sections as { label, value } (label)}
		<CopyRow {label} {value} class="overflow-x-auto break-normal whitespace-pre" />
	{/each}

	{#if times.length}
		<div class="space-y-2">
			<p>
				Timestamps
				{#if exp}
					{@const expired = exp.date.getTime() < Date.now()}
					<span class={expired ? 'text-destructive' : 'text-muted-foreground'}>
						({expired ? 'expired' : 'not expired'})
					</span>
				{/if}
			</p>
			<ul class="border px-2 py-2 font-mono text-sm">
				{#each times as { claim, date } (claim)}
					<li>{claim}: {date.toLocaleString()}</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>
