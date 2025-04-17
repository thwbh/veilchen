<script lang="ts">
	import type { Snippet } from 'svelte';
	import { swipe, type SwipeCustomEvent, type SwipeParameters } from 'svelte-gestures';
	import { cubicOut } from 'svelte/easing';
	import type { FlyParams } from 'svelte/transition';

	interface Props {
		index?: number;
		size: number;
		indicator?: Snippet;
		card: Snippet<[number, FlyParams]>;
		swipeable?: boolean;
		swipeParams?: Partial<SwipeParameters>;
		onswipe?: (event: SwipeCustomEvent) => void;
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

	<div class="stack relative w-full" use:swipe={() => swipeParams} onswipe={handleSwipe}>
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
