<script lang="ts">
	import { type KeyValuePair } from '$lib/types/types.js';

	/**
	 * A segmented control component for selecting between multiple options.
	 * Displays options as a horizontal row of connected segments.
	 * Supports string or number values.
	 */
	interface Props {
		/** Optional label displayed above the segmented control */
		label?: string;
		/** The currently selected value (string or number) */
		value: string | number;
		/** Array of options to display as segments */
		entries: Array<KeyValuePair<string | number, string>>;
		/** Optional change handler called when selection changes */
		onchange?: (value: string | number) => void;
	}

	let { label = undefined, value = $bindable(), entries, onchange, ...props }: Props = $props();

	function handleSelect(newValue: typeof value) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class="flex flex-col gap-2" {...props}>
	{#if label}
		<span id="segmented-control-label">
			{label}
		</span>
	{/if}
	<div class="join join-horizontal stretch w-full" role="group" aria-labelledby={label ? 'segmented-control-label' : undefined}>
		{#each entries as entry}
			<button
				class="btn join-item {value === entry.key ? 'btn-neutral' : ''}"
				onclick={() => handleSelect(entry.key)}
				aria-pressed={value === entry.key}
			>
				{entry.value}
			</button>
		{/each}
	</div>
</div>

<style>
	.join-horizontal > button {
		flex-grow: 1;
	}
</style>
