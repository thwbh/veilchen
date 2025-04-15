<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		className?: string;
		label: string;
		name?: string;
		value: unknown;
		type: string;
		required?: boolean;
		errorInline?: boolean;
		unit?: string;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		className = '',
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
