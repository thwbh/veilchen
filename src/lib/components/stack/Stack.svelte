<script lang="ts">
	import type { Snippet } from 'svelte';
	import { swipe, type SwipeCustomEvent, type SwipeParameters } from 'svelte-gestures';
	import { cubicOut } from 'svelte/easing';
	import type { FlyParams } from 'svelte/transition';

	/**
	 * A swipeable stack/carousel component for mobile-first interfaces.
	 * Supports touch gestures and keyboard navigation.
	 */
	interface Props {
		/** Current visible card index (0-indexed, bindable) */
		index?: number;
		/** Total number of cards in the stack */
		size: number;
		/** Optional custom indicator snippet (defaults to dot indicators) */
		indicator?: Snippet;
		/** Card content snippet that receives index and fly transition params */
		card: Snippet<[number, FlyParams]>;
		/** Whether swipe gestures are enabled (default: true) */
		swipeable?: boolean;
		/** Swipe gesture configuration parameters */
		swipeParams?: Partial<SwipeParameters>;
		/** Callback fired on swipe gesture */
		onswipe?: (event: SwipeCustomEvent) => void;
		/** Callback fired when the active card changes */
		onchange?: (updatedIndex: number) => void;
	}

	let {
		index = $bindable(0),
		size,
		indicator = undefined,
		card,
		swipeable = true,
		swipeParams = { timeframe: 300, minSwipeDistance: 60 },
		onswipe = undefined,
		onchange = undefined
	}: Props = $props();

	let direction = $state(0);
	let flyParams: FlyParams = $derived({
		x: -500 * direction,
		delay: 0,
		duration: 750,
		easing: cubicOut
	});

	const handleSwipe = (event: SwipeCustomEvent) => {
		if (swipeable) {
			onswipe?.(event);

			if (event.detail.direction === 'left') direction = 1;
			else if (event.detail.direction === 'right') direction = -1;

			index = (index + direction + size) % size;

			onchange?.(index);
		}
	};

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			direction = -1;
			index = (index - 1 + size) % size;
			onchange?.(index);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			direction = 1;
			index = (index + 1) % size;
			onchange?.(index);
		}
	}
</script>

<div class="flex flex-col items-center gap-2">
	{#if indicator}
		{@render indicator()}
	{:else}
		<div class="flex flex-row items-center gap-4">
			{#each { length: size }, i}
				<span class="indicator-bubble {i === index ? 'active' : ''}"></span>
			{/each}
		</div>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="stack relative w-full"
		use:swipe={() => swipeParams}
		onswipe={handleSwipe}
		onkeydown={handleKeydown}
		tabindex="0"
		role="region"
		aria-label="Swipeable content carousel"
		aria-live="polite"
	>
		{@render card(index, flyParams)}
		{#each { length: size }, i}
			{#if i !== index}
				{@render card(i, flyParams)}
			{/if}
		{/each}
	</div>
</div>

<style>
	.indicator-bubble::after {
		content: '';
		height: calc(var(--spacing) * 1.5);
		width: calc(var(--spacing) * 1.5);
		padding: calc(var(--spacing) * 0);
		border-radius: 50%;
		background-color: var(--color-neutral);
		display: inline-block;
	}

	.indicator-bubble.active::after {
		height: calc(var(--spacing) * 2.25);
		width: calc(var(--spacing) * 2.25);
	}
</style>
