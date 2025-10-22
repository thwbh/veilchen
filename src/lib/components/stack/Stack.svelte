<script lang="ts">
	import type { Snippet } from 'svelte';
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
		/** Card content snippet that receives index, out fly params, and in fly params */
		card: Snippet<[number, FlyParams, FlyParams]>;
		/** Whether swipe gestures are enabled (default: true) */
		swipeable?: boolean;
		/** Minimum swipe distance in pixels (default: 60) */
		minSwipeDistance?: number;
		/** Maximum time in ms for a swipe gesture (default: 300) */
		swipeTimeframe?: number;
		/** Callback fired on swipe gesture */
		onswipe?: (direction: 'left' | 'right') => void;
		/** Callback fired when the active card changes */
		onchange?: (updatedIndex: number) => void;
	}

	let {
		index = $bindable(0),
		size,
		indicator = undefined,
		card,
		swipeable = true,
		minSwipeDistance = 60,
		swipeTimeframe = 300,
		onswipe = undefined,
		onchange = undefined
	}: Props = $props();

	let direction = $state(0);
	let previousIndex = $state<number | null>(null);

	let outFlyParams: FlyParams = $derived({
		x: -500 * direction,
		delay: 0,
		duration: 750,
		easing: cubicOut
	});

	let inFlyParams: FlyParams = $derived({
		x: -500 * direction,
		delay: 750,
		duration: 750,
		easing: cubicOut
	});

	// Touch/swipe state
	let touchStartX = 0;
	let touchStartY = 0;
	let touchStartTime = 0;
	let isDragging = $state(false);

	function handleTouchStart(event: TouchEvent) {
		if (!swipeable) return;
		touchStartX = event.touches[0].clientX;
		touchStartY = event.touches[0].clientY;
		touchStartTime = Date.now();
		isDragging = true;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (!swipeable) return;
		isDragging = false;

		const touchEndX = event.changedTouches[0].clientX;
		const touchEndY = event.changedTouches[0].clientY;
		const touchEndTime = Date.now();

		const deltaX = touchEndX - touchStartX;
		const deltaY = touchEndY - touchStartY;
		const deltaTime = touchEndTime - touchStartTime;

		// Check if gesture qualifies as a swipe
		if (
			Math.abs(deltaX) > minSwipeDistance &&
			Math.abs(deltaX) > Math.abs(deltaY) &&
			deltaTime < swipeTimeframe
		) {
			const swipeDirection = deltaX > 0 ? 'right' : 'left';
			onswipe?.(swipeDirection);

			if (swipeDirection === 'left') {
				direction = 1;
				previousIndex = index;
				index = (index + 1) % size;
			} else {
				direction = -1;
				previousIndex = index;
				index = (index - 1 + size) % size;
			}

			onchange?.(index);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			direction = -1;
			previousIndex = index;
			index = (index - 1 + size) % size;
			onchange?.(index);
		} else if (event.key === 'ArrowRight') {
			event.preventDefault();
			direction = 1;
			previousIndex = index;
			index = (index + 1) % size;
			onchange?.(index);
		}
	}

	function handleIndicatorClick(targetIndex: number) {
		if (targetIndex === index) return;

		// Determine direction based on target vs current
		direction = targetIndex > index ? 1 : -1;
		previousIndex = index;
		index = targetIndex;
		onchange?.(index);
	}
</script>

<div class="flex flex-col items-center gap-2">
	{#if indicator}
		{@render indicator()}
	{:else}
		<div class="flex flex-row items-center gap-4" role="tablist" aria-label="Card navigation">
			{#each { length: size }, i}
				<button
					class="indicator-bubble {i === index ? 'active' : ''}"
					onclick={() => handleIndicatorClick(i)}
					aria-label="Go to card {i + 1}"
					aria-current={i === index ? 'true' : undefined}
					role="tab"
					aria-selected={i === index}
					tabindex={i === index ? 0 : -1}
				></button>
			{/each}
		</div>
	{/if}

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="stack relative w-full {isDragging ? 'dragging' : ''}"
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		onkeydown={handleKeydown}
		tabindex="0"
		role="region"
		aria-label="Swipeable content carousel"
		aria-live="polite"
	>
		{@render card(index, outFlyParams, inFlyParams)}
		{#each { length: size }, i}
			{#if i !== index}
				{@render card(i, outFlyParams, inFlyParams)}
			{/if}
		{/each}
	</div>
</div>

<style>
	.indicator-bubble {
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.indicator-bubble:hover,
	.indicator-bubble:focus-visible {
		transform: scale(1.1);
		outline: none;
	}

	.indicator-bubble::after {
		content: '';
		height: calc(var(--spacing) * 1.5);
		width: calc(var(--spacing) * 1.5);
		padding: calc(var(--spacing) * 0);
		border-radius: 50%;
		background-color: var(--color-neutral);
		display: inline-block;
		transition: all 0.3s ease;
	}

	.indicator-bubble.active::after {
		height: calc(var(--spacing) * 2.25);
		width: calc(var(--spacing) * 2.25);
	}

	.indicator-bubble:hover::after {
		opacity: 0.8;
	}
</style>
