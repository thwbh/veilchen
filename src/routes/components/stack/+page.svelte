<script lang="ts">
	import Stack from '$lib/components/stack/Stack.svelte';
	import StackCard from '$lib/components/stack/StackCard.svelte';

	let currentIndex = $state(0);
	const cards = ['Card 1', 'Card 2', 'Card 3'];
</script>

<div class="flex flex-col gap-6 p-4 overflow-x-hidden">
	<h1 class="text-3xl font-bold mb-2">Stack Example</h1>
	<p class="text-sm opacity-70 mb-4">
		Swipeable card stack with keyboard navigation (Arrow Left/Right). Click the indicator dots to
		jump to a specific card!
	</p>

	<Stack bind:index={currentIndex} size={cards.length} onchange={(idx) => console.log('Now showing:', idx)}>
		{#snippet card(index, outFlyParams, inFlyParams)}
			<StackCard isActive={index === currentIndex} cardKey={currentIndex} {outFlyParams} {inFlyParams}>
				<h2 class="card-title">{cards[index]}</h2>
				<p>Swipe, use arrow keys, or click the dots to navigate</p>
			</StackCard>
		{/snippet}
	</Stack>

	<div class="mt-4 p-4 bg-base-200 rounded-box">
		<p class="text-sm">
			<strong>Current card:</strong>
			{currentIndex + 1} of {cards.length}
		</p>
	</div>
</div>
