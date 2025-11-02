<script lang="ts">
	import type { Snippet } from 'svelte';
	import { longpress } from '$lib/gesture/long-press.js';

	/**
	 * A container component that supports longpress gestures.
	 * Wraps content and triggers a callback when the user performs a long press.
	 */
	interface Props {
		/** Content to display inside the container */
		children: Snippet;
		/** Callback function triggered on long press */
		onlongpress: () => void;
		/** Additional CSS classes for the container */
		class?: string;
		/** HTML element type to use for the container */
		as?: 'div' | 'button' | 'article' | 'section' | 'li';
	}

	let { children, onlongpress, class: className = '', as = 'div' }: Props = $props();

	function handleLongPress() {
		onlongpress();
	}
</script>

<svelte:element
	this={as}
	class={className}
	use:longpress
	onlongpress={handleLongPress}
	role={as === 'div' ? 'button' : undefined}
	tabindex={as === 'div' ? 0 : undefined}
>
	{@render children()}
</svelte:element>
