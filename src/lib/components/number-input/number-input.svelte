<script lang="ts">
	import { cn } from '$lib/utils';
	import Input from '../ui/input/input.svelte';
	import Label from '../ui/label/label.svelte';

	type Props = {
		value: string;
		id: string;
		label: string;
		placeholder?: string;
		class?: string;
		max?: number;
		handleInput?: () => void;
	};
	let {
		value = $bindable(),
		id,
		label,
		placeholder,
		class: className,
		max,
		handleInput
	}: Props = $props();

	function handleChange(e: Event & { currentTarget: HTMLInputElement }) {
		const digits = e.currentTarget.value.replace(/\D/g, '');
		value = digits && max !== undefined ? String(Math.min(Number(digits), max)) : digits;
		e.currentTarget.value = value;
		handleInput?.();
	}
</script>

<fieldset class={cn('space-y-1.5', className)}>
	<Label for={id}>{label}</Label>
	<Input {id} {placeholder} {value} type="text" inputmode="numeric" oninput={handleChange} />
</fieldset>
