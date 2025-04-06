<script lang="ts">
	import type { Snippet } from 'svelte';
	import { swipe, type SwipeCustomEvent, type SwipeParameters } from 'svelte-gestures';

	interface Props {
		size: number;
		indicator?: Snippet;
		card: Snippet<[number]>;
		swipeable?: boolean;
		swipeParams?: Partial<SwipeParameters>;
		onswipe?: (event: SwipeCustomEvent) => void;
	}

	let {
		size,
		indicator = undefined,
		card,
		swipeable = true,
		swipeParams = { timeframe: 300, minSwipeDistance: 60 },
		onswipe = undefined
	}: Props = $props();

	let index = $state(0);

	const handleSwipe = (event: SwipeCustomEvent) => {
		if (swipeable) {
			onswipe?.(event);

			let direction = 0;

			if (event.detail.direction === 'left') direction = 1;
			else if (event.detail.direction === 'right') direction = -1;

			index = (index + direction + size) % size;
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

	<div class="stack w-full" use:swipe={() => swipeParams} onswipe={handleSwipe}>
		{@render card(index)}

		{#each { length: size }, i}
			{#if i !== index}
				{@render card(i)}
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
