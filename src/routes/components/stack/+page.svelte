<script lang="ts">
	import Stack from '$lib/components/stack/Stack.svelte';

	const cardEntries = ['Card 1', 'Card 2', 'Card 3'];

	let index = $state(1);
</script>

<div class="flex flex-col gap-4 p-4">
	<Stack bind:index size={cardEntries.length}>
		{#snippet card(index: number)}
			<div class="bg-primary text-primary-content rounded-box grid place-content-center">
				<p>index {index}</p>
				<p>
					{cardEntries[index]}
				</p>
			</div>
		{/snippet}
	</Stack>
	<span>
		Selected: {index}
	</span>
</div>
