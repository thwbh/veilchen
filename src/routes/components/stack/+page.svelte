<script lang="ts">
	import Stack from '$lib/components/stack/Stack.svelte';
	import { fly } from 'svelte/transition';

	let currentIndex = $state(0);
	const cards = ['Card 1', 'Card 2', 'Card 3'];
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-2">Stack Example</h1>
	<p class="text-sm opacity-70 mb-4">
		Swipeable card stack with keyboard navigation (Arrow Left/Right). Click the indicator dots to
		jump to a specific card!
	</p>

	<Stack bind:index={currentIndex} size={cards.length} onchange={(idx) => console.log('Now showing:', idx)}>
		{#snippet card(index, flyParams)}
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body relative">
					<!-- Height placeholder - always present to maintain card dimensions -->
					<div class="opacity-0 pointer-events-none">
						<h2 class="card-title">{cards[index]}</h2>
						<p>Swipe, use arrow keys, or click the dots to navigate</p>
					</div>

					<!-- Only show content for current card with absolute positioning -->
					{#if index === currentIndex}
						{#key currentIndex}
							<div class="absolute inset-0 p-8 overflow-hidden" out:fly={flyParams}>
								<h2 class="card-title">{cards[index]}</h2>
								<p>Swipe, use arrow keys, or click the dots to navigate</p>
							</div>
						{/key}
					{/if}
				</div>
			</div>
		{/snippet}
	</Stack>

	<div class="mt-4 p-4 bg-base-200 rounded-box">
		<p class="text-sm">
			<strong>Current card:</strong>
			{currentIndex + 1} of {cards.length}
		</p>
	</div>
</div>
