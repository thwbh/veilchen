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
		/** Fly transition parameters for exit animation */
		outFlyParams: FlyParams;
		/** Fly transition parameters for entry animation */
		inFlyParams: FlyParams;
		/** Card content snippet */
		children: Snippet;
		/** Additional CSS classes for the card */
		class?: string;
	}

	let { isActive, cardKey, outFlyParams, inFlyParams, children, class: className = '' }: Props = $props();
</script>

{#if isActive}
	{#key cardKey}
		<div class="card bg-base-100 shadow-xl {className}" out:fly={outFlyParams}>
			<div class="card-body">
				{@render children()}
			</div>
		</div>
	{/key}
{:else}
	{#key cardKey}
		<div class="card bg-base-100 shadow-xl {className}" in:fly={inFlyParams}>
			<div class="card-body">
				<!-- Empty card for stack effect -->
			</div>
		</div>
	{/key}
{/if}
