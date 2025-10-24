<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Avatar group component based on DaisyUI for displaying multiple avatars in an overlapping layout.
	 * Useful for showing team members, participants, or collaborators.
	 */
	interface Props {
		/** Maximum number of avatars to display before showing a "+X" counter */
		max?: number;
		/** Avatar children (should be Avatar components) */
		children: Snippet;
		/** Additional CSS classes */
		class?: string;
	}

	let { max = undefined, children, class: className = '' }: Props = $props();
</script>

<div class="avatar-group -space-x-6 rtl:space-x-reverse {className}" role="group" aria-label="Avatar group">
	{@render children()}
</div>

<style>
	/* DaisyUI avatar-group already provides the overlapping effect with -space-x-6 */
	/* Just ensure avatars have proper border for separation */
	.avatar-group :global(.avatar > div) {
		border: 2px solid hsl(var(--b1));
	}
</style>
