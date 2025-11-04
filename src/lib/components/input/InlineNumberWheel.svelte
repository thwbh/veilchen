<script lang="ts">
	/**
	 * Inline iOS-style number wheel picker component
	 * Always visible, compact version for embedding in layouts
	 */
	interface Props {
		/** Array of numbers to display in the wheel */
		numbers: number[];
		/** Currently selected number */
		value?: number;
		/** Callback when selection changes */
		onchange?: (value: number) => void;
	}

	let { numbers, value = $bindable(numbers[0]), onchange }: Props = $props();

	let wheelElement = $state<HTMLDivElement>();
	let startY = 0;
	let scrollTop = 0;
	let selectedIndex = $state(numbers.indexOf(value ?? numbers[0]));

	// Each item height in pixels
	const ITEM_HEIGHT = 32;

	function handleSelect(num: number, index: number) {
		value = num;
		selectedIndex = index;
		onchange?.(num);

		// Scroll to the selected item
		if (wheelElement) {
			wheelElement.scrollTop = index * ITEM_HEIGHT;
		}
	}

	function handleTouchStart(e: TouchEvent) {
		startY = e.touches[0].pageY;
		scrollTop = wheelElement?.scrollTop ?? 0;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!wheelElement) return;
		const y = e.touches[0].pageY;
		const walk = startY - y;
		wheelElement.scrollTop = scrollTop + walk;
	}

	let isScrolling = $state(false);
	let scrollTimeout: ReturnType<typeof setTimeout>;

	function handleScroll() {
		if (!wheelElement) return;

		isScrolling = true;
		clearTimeout(scrollTimeout);

		// Update the visual selection immediately during scroll
		const index = Math.round(wheelElement.scrollTop / ITEM_HEIGHT);
		const clampedIndex = Math.max(0, Math.min(numbers.length - 1, index));

		if (clampedIndex !== selectedIndex) {
			selectedIndex = clampedIndex;
		}

		// After scrolling stops, snap to the selected item
		scrollTimeout = setTimeout(() => {
			snapToIndex(clampedIndex);
			isScrolling = false;
		}, 150);
	}

	function snapToIndex(index: number) {
		if (!wheelElement) return;

		const targetScroll = index * ITEM_HEIGHT;
		wheelElement.scrollTo({
			top: targetScroll,
			behavior: 'smooth'
		});

		if (numbers[index] !== value) {
			value = numbers[index];
			onchange?.(numbers[index]);
		}
	}

	function handleTouchEnd() {
		if (!wheelElement) return;
		const index = Math.round(wheelElement.scrollTop / ITEM_HEIGHT);
		const clampedIndex = Math.max(0, Math.min(numbers.length - 1, index));
		snapToIndex(clampedIndex);
	}

	$effect(() => {
		if (wheelElement && selectedIndex >= 0) {
			wheelElement.scrollTop = selectedIndex * ITEM_HEIGHT;
		}
	});
</script>

<div class="inline-number-wheel-container">
	<div
		class="inline-number-wheel"
		bind:this={wheelElement}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		onscroll={handleScroll}
		role="listbox"
		aria-label="Number selector"
	>
		<div class="wheel-spacer"></div>
		{#each numbers as num, index}
			<button
				class="wheel-item {selectedIndex === index ? 'selected' : ''}"
				onclick={() => handleSelect(num, index)}
				type="button"
				role="option"
				aria-selected={selectedIndex === index}
			>
				{num}
			</button>
		{/each}
		<div class="wheel-spacer"></div>
	</div>
	<div class="wheel-selector"></div>
</div>

<style>
	.inline-number-wheel-container {
		position: relative;
		width: 48px;
		height: 96px;
		background: oklch(var(--b2));
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.inline-number-wheel {
		height: 100%;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scrollbar-width: none;
		-ms-overflow-style: none;
		scroll-behavior: auto;
		-webkit-overflow-scrolling: touch;
	}

	.inline-number-wheel::-webkit-scrollbar {
		display: none;
	}

	.wheel-spacer {
		height: 32px;
		flex-shrink: 0;
	}

	.wheel-item {
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		scroll-snap-align: center;
		scroll-snap-stop: always;
		transition:
			opacity 0.2s ease,
			font-size 0.2s ease,
			font-weight 0.2s ease,
			color 0.2s ease;
		opacity: 0.3;
		width: 100%;
		background: transparent;
		border: none;
		color: oklch(var(--bc));
		cursor: pointer;
		font-weight: 500;
	}

	.wheel-item:hover {
		opacity: 0.6;
	}

	.wheel-item.selected {
		opacity: 1;
		font-weight: 700;
		font-size: 1rem;
		color: oklch(var(--p));
	}

	.wheel-selector {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 32px;
		transform: translateY(-50%);
		border-top: 1px solid oklch(var(--p) / 0.2);
		border-bottom: 1px solid oklch(var(--p) / 0.2);
		pointer-events: none;
		background: oklch(var(--p) / 0.05);
	}
</style>
