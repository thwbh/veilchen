<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	/**
	 * A validated input component with error message display.
	 * Accepts string, number, or any value depending on input type.
	 */
	interface Props extends Omit<HTMLInputAttributes, 'value' | 'type' | 'children'> {
		/** CSS class to apply to the input element */
		class?: string;
		/** Label text displayed above the input */
		label: string;
		/** Name attribute for the input */
		name?: string;
		/** The current value of the input */
		value: string | number;
		/** Input type (text, email, password, number, date, etc.) */
		type?: string;
		/** Whether the field is required */
		required?: boolean;
		/** Whether to display error inline instead of below */
		errorInline?: boolean;
		/** Optional unit to display after the input */
		unit?: string;
		/** Children snippet for error/help text */
		children: Snippet;
	}

	let {
		class: className = '',
		label,
		name = undefined,
		value = $bindable(),
		type = 'text',
		required = false,
		errorInline = false,
		unit = undefined,
		pattern = undefined,
		children,
		...props
	}: Props = $props();
</script>

<label class="flex flex-col gap-2">
	<span class="text-xs">
		{label}
	</span>

	<span class={unit ? 'join' : ''}>
		<input
			class="input validator {unit ? className + ' join-item' : className}"
			bind:value
			{name}
			{type}
			{required}
			{...props}
		/>

		<span class="validator-hint {errorInline ? 'inline-error' : ''}">
			{@render children()}
		</span>

		{#if unit}
			<p class="join-item btn btn-disabled text-base-content">
				{unit}
			</p>
		{/if}
	</span>
</label>

<style>
	label {
		position: relative;
	}

	.inline-error {
		position: absolute;
		bottom: 4em;
		right: 0;
	}
</style>
