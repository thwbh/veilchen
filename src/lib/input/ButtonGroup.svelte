<script lang="ts">
	import { type KeyValuePair } from '$lib/types/types.js';

	interface Props {
		label?: string;
		value: unknown;
		entries?: Array<KeyValuePair>;
	}

	let { label = undefined, value = $bindable(''), entries = undefined, ...props }: Props = $props();
</script>

<div class="flex flex-col gap-2" {...props}>
	{#if label}
		<span>
			{label}
		</span>
	{/if}
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
</div>

<style>
	.join-horizontal > button {
		flex-grow: 1;
	}
</style>
