<script lang="ts">
	import type { ListPickerData } from '$lib/types/types.js';
	import type { Snippet } from 'svelte';

	/**
	 * A list picker component for selecting from a list of options.
	 * Supports any value type through generic ListPickerData.
	 */
	interface Props {
		/** The currently selected value */
		value: unknown;
		/** Array of items to display in the list */
		data: Array<ListPickerData<unknown>>;
		/** Optional header snippet displayed at the top of the list */
		header?: Snippet;
		/** Optional change handler called when selection changes */
		onchange?: (value: unknown) => void;
	}

	let { value = $bindable(), data, header = undefined, onchange }: Props = $props();

	function handleSelect(newValue: typeof value) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class="flex flex-col gap-4">
	<ul class="list bg-base-100 rounded-box shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">
			{@render header?.()}
		</li>

		<div class="flex flex-col">
			{#each data as dataValue}
				<li>
					<button
						class="list-row flex w-full flex-col gap-2 text-left {value === dataValue.value
							? 'bg-base-300'
							: ''}"
						onclick={() => handleSelect(dataValue.value)}
						aria-pressed={value === dataValue.value}
					>
						<span class="flex w-full flex-row items-center justify-between gap-2">
							<span>
								<strong> {dataValue.header} </strong>
							</span>
							{#if dataValue.label}
								{@const className =
									dataValue.value === value
										? dataValue.label?.activeClassName
											? dataValue.label?.activeClassName
											: dataValue.label?.className
										: dataValue.label?.className
											? dataValue.label?.className
											: ''}
								<span class="badge {className} badge-xs">
									{dataValue.label.text}
								</span>
							{/if}
						</span>

						<span>
							{dataValue.description}
						</span>
					</button>
				</li>
			{/each}
		</div>
	</ul>
</div>
