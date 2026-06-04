<script lang="ts">
	import { type KeyValuePair } from '$lib/types/types.js';
	import { InputSize } from '$lib/enum/enum.js';

	/**
	 * A button group component for selecting between multiple options.
	 * Supports string or number values.
	 * Optimized for mobile with larger touch targets and optional swipe gestures.
	 */
	interface Props {
		/** Optional label displayed above the button group */
		label?: string;
		/** The currently selected value (string or number) */
		value: string | number;
		/** Array of options to display as buttons */
		entries: Array<KeyValuePair<string | number, string>>;
		/** Optional change handler called when selection changes */
		onchange?: (value: string | number) => void;
		/** Enable swipe gestures for mobile (default: false) */
		swipeable?: boolean;
		/** Size variant for mobile optimization */
		size?: InputSize;
		/** Custom CSS class for the container */
		class?: string;
	}

	let {
		label = undefined,
		value = $bindable(),
		entries,
		onchange,
		swipeable = false,
		size = InputSize.MD,
		class: className = '',
		...props
	}: Props = $props();

	// Size mappings for mobile optimization
	const sizeClasses = $derived.by(() => {
		if (size === InputSize.SM) {
			return 'h-12 min-h-[3rem] text-sm';
		} else if (size === InputSize.MD) {
			return 'h-14 min-h-[3.5rem] text-base';
		}

		return 'h-16 min-h-[4rem] text-lg';
	});

	// Touch target size - ensure minimum 48px for accessibility
	const touchTargetSize = $derived.by(() => {
		if (size === InputSize.SM) {
			return 'min-h-[3rem]';
		} else if (size === InputSize.MD) {
			return 'min-h-[3.5rem]';
		}

		return 'min-h-[4rem]';
	});

	// Swipe gesture handling
	let touchStartX = $state<number | null>(null);
	let touchStartTime = $state<number | null>(null);
	let containerRef: HTMLDivElement;

	function handleTouchStart(e: TouchEvent) {
		if (!swipeable) return;
		touchStartX = e.touches[0].clientX;
		touchStartTime = Date.now();
	}

	function handleTouchMove(e: TouchEvent) {
		if (!swipeable || touchStartX === null) return;

		const currentX = e.touches[0].clientX;
		const diffX = touchStartX - currentX;

		// Minimum swipe distance (50px) and time (300ms)
		if (Math.abs(diffX) > 50 && touchStartTime && Date.now() - touchStartTime < 300) {
			if (diffX > 50) {
				// Swipe left - select next
				const currentIndex = entries.findIndex((e) => e.key === value);
				if (currentIndex < entries.length - 1) {
					handleSelect(entries[currentIndex + 1].key);
				}
			} else if (diffX < -50) {
				// Swipe right - select previous
				const currentIndex = entries.findIndex((e) => e.key === value);
				if (currentIndex > 0) {
					handleSelect(entries[currentIndex - 1].key);
				}
			}
			touchStartX = null;
			touchStartTime = null;
		}
	}

	function handleTouchEnd() {
		touchStartX = null;
		touchStartTime = null;
	}

	function handleSelect(newValue: typeof value) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class="flex flex-col gap-2 {className}" {...props}>
	{#if label}
		<span id="button-group-label" class="text-sm font-medium opacity-70">
			{label}
		</span>
	{/if}
	<div
		class="join join-horizontal stretch w-full {touchTargetSize}"
		role="group"
		aria-labelledby={label ? 'button-group-label' : undefined}
		bind:this={containerRef}
		{...swipeable
			? { onTouchStart: handleTouchStart, onTouchMove: handleTouchMove, onTouchEnd: handleTouchEnd }
			: {}}
	>
		{#each entries as entry, index}
			<button
				class="btn join-item {sizeClasses} {value === entry.key ? 'btn-neutral' : ''}"
				onclick={() => handleSelect(entry.key)}
				aria-pressed={value === entry.key}
				aria-label={entry.value}
				data-index={index}
			>
				{entry.value}
			</button>
		{/each}
	</div>
</div>

<style>
	.join-horizontal > button {
		flex-grow: 1;
		min-width: 0; /* Allow buttons to shrink on small screens */
		transition: all 0.2s ease;
	}

	/* Mobile-specific touch feedback */
	@media (hover: none) and (pointer: coarse) {
		.join-horizontal > button:active {
			transform: scale(0.98);
			transition: transform 0.1s ease;
		}
	}

	/* Ensure minimum touch target size */
	.join-horizontal > button {
		min-height: 3rem; /* 48px minimum for touch */
	}

	/* Selected state enhancement */
	.join-horizontal > button.btn-neutral {
		z-index: 1;
		position: relative;
	}
</style>
