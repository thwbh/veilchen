<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * An accordion component for creating expandable/collapsible content sections.
	 * Uses DaisyUI's collapse utility for smooth animations.
	 */
	interface Props {
		/** CSS class to apply to the accordion container */
		class?: string;
		/** Content to display in the accordion */
		children: Snippet;
	}

	let { class: className = '', children, ...props }: Props = $props();
</script>

<div class="join join-vertical w-full {className}" {...props}>
	{@render children()}
</div>
