<script lang="ts">
	import type { OptionCardData } from '$lib/types/types.js';
	import type { Snippet } from 'svelte';

	/**
	 * A card-based option selector component with rich visual options.
	 * Supports any value type through generic OptionCardData.
	 */
	interface Props {
		/** The currently selected value */
		value: unknown;
		/** Array of option cards to display */
		data: Array<OptionCardData<unknown>>;
		/** Optional header snippet displayed at the top */
		header?: Snippet;
		/** Optional icon snippet that receives the card data */
		icon?: Snippet<[OptionCardData<unknown>]>;
		/** Whether the list should be scrollable */
		scrollable?: boolean;
		/** Maximum height when scrollable is enabled */
		maxHeight?: string;
		/** Optional change handler called when selection changes */
		onchange?: (value: unknown) => void;
	}

	let {
		value = $bindable(),
		data,
		header = undefined,
		icon = undefined,
		scrollable = true,
		maxHeight = '400px',
		onchange,
		...props
	}: Props = $props();

	function handleSelect(newValue: typeof value) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class="flex flex-col gap-3" {...props}>
	{#if header}
		{@render header()}
	{/if}

	<div
		class="flex flex-col gap-3 {scrollable ? 'overflow-y-auto scroll-smooth pr-2' : ''}"
		style={scrollable ? `max-height: ${maxHeight}` : ''}
	>
		{#each data as option}
			{@const isSelected = value === option.value}

			<button
				class="card bg-base-100 border-2 shadow-md transition-all hover:shadow-lg {isSelected
					? 'border-primary'
					: 'border-transparent'} w-full text-left"
				onclick={() => handleSelect(option.value)}
				aria-pressed={isSelected}
			>
				<div class="card-body w-full p-3 sm:p-4">
					<!-- Header row -->
					<div class="mb-2 flex items-start justify-between gap-2">
						<div class="flex min-w-0 flex-1 items-center gap-2">
							{#if icon}
								<div class="flex-shrink-0">
									{@render icon(option)}
								</div>
							{/if}
							<div class="min-w-0 flex-1">
								<div class="mb-1 flex items-center gap-2">
									<h3 class="text-base-content text-base font-bold sm:text-lg">{option.header}</h3>
									{#if option.highlight}
										<span
											class="badge badge-{option.highlight.color || 'primary'} badge-sm text-xs"
										>
											{option.highlight.text}
										</span>
									{/if}
								</div>
								{#if option.badge}
									<span class="badge badge-{option.badge.color || 'neutral'} badge-sm text-xs">
										{option.badge.text}
									</span>
								{/if}
							</div>
						</div>

						{#if isSelected}
							<div
								class="bg-primary flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
							>
								<span class="text-primary-content text-xs font-bold">✓</span>
							</div>
						{/if}
					</div>

					{#if option.text}
						<div>
							<p>{option.text}</p>
						</div>
					{/if}

					<!-- Metrics grid -->
					{#if option.metrics && option.metrics.length > 0}
						<div
							class="grid gap-2 text-sm sm:gap-3"
							class:grid-cols-2={option.metrics.length === 2}
							class:grid-cols-3={option.metrics.length === 3}
							class:grid-cols-1={option.metrics.length === 1}
						>
							{#each option.metrics as metric}
								<div class="bg-base-200 rounded-lg p-2.5 sm:p-2">
									<p class="text-base-content mb-0.5 text-xs opacity-60">{metric.label}</p>
									<p class="text-base-content text-sm font-bold sm:text-base">{metric.value}</p>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>
