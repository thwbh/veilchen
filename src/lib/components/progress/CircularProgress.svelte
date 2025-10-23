<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A circular progress indicator component.
	 * Displays progress as a radial circle with customizable size and color.
	 */
	interface Props {
		/** Progress value (0-100) */
		value: number;
		/** Size of the progress circle (CSS value, default: "5rem") */
		size?: string;
		/** Thickness of the progress ring (CSS value, default: "0.5rem") */
		thickness?: string;
		/** Color class for the progress ring (e.g., "text-primary", "text-success") */
		color?: string;
		/** CSS class to apply to the container */
		class?: string;
		/** Optional content to display in the center of the circle */
		children?: Snippet;
	}

	let {
		value,
		size = '5rem',
		thickness = '0.5rem',
		color = 'text-primary',
		class: className = '',
		children
	}: Props = $props();

	// Clamp value between 0 and 100
	let clampedValue = $derived(Math.min(Math.max(value, 0), 100));
</script>

<div
	class="radial-progress {color} {className}"
	style="--value:{clampedValue};--size:{size};--thickness:{thickness};"
	role="progressbar"
	aria-valuenow={clampedValue}
	aria-valuemin="0"
	aria-valuemax="100"
>
	{#if children}
		{@render children()}
	{/if}
</div>
