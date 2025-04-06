<script lang="ts">
	import { type KeyValuePair } from '$lib/types/types.js';

	interface Props {
		value: string;
		entries?: Array<KeyValuePair>;
	}

	let { value = $bindable(''), entries = undefined, ...props }: Props = $props();
</script>

<div class="join join-horizontal stretch w-full">
	{#if entries}
		{#each entries as entry}
			<button
				class="btn join-item {value === entry.key ? 'btn-neutral' : ''}"
				onclick={() => (value = entry.key)}
			>
				{entry.value}
			</button>
		{/each}
	{/if}
</div>

<style>
	.join-horizontal > button {
		flex-grow: 1;
	}
</style>
