<script lang="ts">
	import { cn } from '$lib/utils';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	type Props = {
		value: string;
		class?: string;
		id: string;
		handleInput?: () => void;
		max?: number;
	};
	let { value = $bindable(), class: className, id, max, handleInput }: Props = $props();
	function handleChange(e: Event & { currentTarget: HTMLInputElement }) {
		const target = e.currentTarget;

		const cleanValue = target.value.replace(/\D/g, '');
		target.value = cleanValue;
		value = cleanValue;
		if (max) {
			if (Number(cleanValue) > max) value = '50';
		}
		if (handleInput) handleInput();
	}
</script>

<fieldset class={cn('space-y-1.5', className)}>
	<Label for={id}>Quantity</Label>
	<Input placeholder="UUID Quantity" bind:value {id} type="text" oninput={handleChange} />
</fieldset>
