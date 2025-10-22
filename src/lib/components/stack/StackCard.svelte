<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import type { FlyParams } from 'svelte/transition';

	/**
	 * A card component for use with Stack that handles the fly-out animation.
	 * This component manages the layout and animation of content within a stacked card.
	 */
	interface Props {
		/** Whether this is the currently active/visible card */
		isActive: boolean;
		/** The unique key for this card (usually the index) */
		cardKey: number | string;
		/** Fly transition parameters from the parent Stack */
		flyParams: FlyParams;
		/** Card content snippet */
		children: Snippet;
		/** Additional CSS classes for the card */
		class?: string;
	}

	let { isActive, cardKey, flyParams, children, class: className = '' }: Props = $props();
</script>

<div class="card bg-base-100 shadow-xl {className}">
	<div class="card-body relative">
		<!-- Height placeholder - maintains card dimensions during transitions -->
		<div class="opacity-0 pointer-events-none">
			{@render children()}
		</div>

		<!-- Animated content layer - only shown for active card -->
		{#if isActive}
			{#key cardKey}
				<div class="absolute inset-0 p-8 overflow-hidden" out:fly={flyParams}>
					{@render children()}
				</div>
			{/key}
		{/if}
	</div>
</div>
