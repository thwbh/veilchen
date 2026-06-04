<script lang="ts">
	import { type Snippet, onDestroy } from 'svelte';
	import { InputSize } from '$lib/enum/enum.js';

	/**
	 * A headless search input component styled with DaisyUI.
	 * Emits the query via an optional `onsearch` callback (supports debounce).
	 * Two-way binding via `value` prop.
	 * The component is headless in the sense that rendering results is out of scope — provide your own filtering or results panel in the `onsearch` hook.
	 */
	interface Props {
		/** The current search query (two-way bindable) */
		value: string;
		/** Placeholder text for the input */
		placeholder?: string;
		/** ARIA label for the search input */
		label?: string;
		/** Additional CSS classes to apply to the input */
		class?: string;
		/** Whether to show a clear button (X) when the input has a value */
		clearable?: boolean;
		/** Callback fired when the clear button is clicked */
		onclear?: () => void;
		/** Debounce delay in milliseconds for the search event (default: 0) */
		debounce?: number;
		/** Callback fired on search completion (debounced or on Enter key) */
		onsearch?: (query: string) => void;
		/** DaisyUI input size variant */
		inputSize?: InputSize;
		/** DaisyUI input color variant (e.g. "primary", "secondary", "neutral") */
		color?: string;
		/** Suffix snippet rendered after the input (e.g. result count) */
		children?: Snippet;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		label,
		class: className = '',
		clearable = true,
		onclear,
		debounce = 0,
		onsearch,
		inputSize = InputSize.MD,
		color,
		children,
		...props
	}: Props = $props();

	let timer: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (timer !== undefined) {
			clearTimeout(timer);
		}
	});

	function triggerSearch(q: string) {
		if (onsearch) {
			onsearch(q);
		}
	}

	function handleInput() {
		if (debounce > 0) {
			if (timer !== undefined) {
				clearTimeout(timer);
			}
			timer = setTimeout(() => triggerSearch(value), debounce);
		} else {
			triggerSearch(value);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			// Fire immediately regardless of debounce setting
			if (debounce > 0 && timer !== undefined) {
				clearTimeout(timer);
				timer = undefined;
			}
			triggerSearch(value);
		}
	}

	function handleClear() {
		value = '';
		onclear?.();
	}

	let inputSizeClass = $derived(inputSize ?? InputSize.MD);
	let inputColorClass = $derived(color ? `input-${color}` : '');
</script>

<div class="search-bar flex w-full items-center gap-2">
	<!-- Magnifier icon (leading button) -->
	<button type="button" class="btn btn-ghost btn-square" aria-hidden="true" tabindex="-1">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</button>

	<!-- Search input -->
	<input
		type="search"
		class="input {inputSizeClass} {inputColorClass} {className} flex-1"
		{placeholder}
		aria-label={label || placeholder}
		bind:value
		oninput={handleInput}
		onkeydown={handleKeydown}
		{...props}
	/>

	<!-- Clear button -->
	{#if clearable && value.length > 0}
		<button
			type="button"
			class="btn btn-ghost btn-square"
			aria-label="Clear"
			tabindex="-1"
			onclick={handleClear}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{/if}

	<!-- Suffix content slot -->
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.search-bar {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 0.5rem;
	}
</style>
