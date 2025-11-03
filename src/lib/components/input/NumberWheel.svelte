<script lang="ts">
	/**
	 * iOS-style number wheel picker component
	 * Allows selecting a number from a scrollable wheel interface
	 */
	interface Props {
		/** Array of numbers to display in the wheel */
		numbers: number[];
		/** Currently selected number */
		value?: number;
		/** Callback when selection changes */
		onchange?: (value: number) => void;
		/** Whether the wheel is visible */
		visible?: boolean;
	}

	let { numbers, value = $bindable(numbers[0]), onchange, visible = false }: Props = $props();

	let wheelElement = $state<HTMLDivElement>();
	let startY = 0;
	let scrollTop = 0;
	let selectedIndex = $state(numbers.indexOf(value ?? numbers[0]));

	// Each item height in pixels
	const ITEM_HEIGHT = 40;

	function handleSelect(num: number, index: number) {
		value = num;
		selectedIndex = index;
		onchange?.(num);
	}

	function handleTouchStart(e: TouchEvent) {
		startY = e.touches[0].pageY;
		scrollTop = wheelElement.scrollTop;
	}

	function handleTouchMove(e: TouchEvent) {
		const y = e.touches[0].pageY;
		const walk = startY - y;
		wheelElement.scrollTop = scrollTop + walk;
	}

	function handleScroll() {
		// Snap to nearest item after scrolling
		const index = Math.round(wheelElement.scrollTop / ITEM_HEIGHT);
		const clampedIndex = Math.max(0, Math.min(numbers.length - 1, index));

		if (clampedIndex !== selectedIndex) {
			selectedIndex = clampedIndex;
			value = numbers[clampedIndex];
			onchange?.(numbers[clampedIndex]);
		}
	}

	let scrollTimeout: ReturnType<typeof setTimeout>;
	function debouncedHandleScroll() {
		clearTimeout(scrollTimeout);
		scrollTimeout = setTimeout(handleScroll, 100);
	}

	$effect(() => {
		if (wheelElement && selectedIndex >= 0) {
			wheelElement.scrollTop = selectedIndex * ITEM_HEIGHT;
		}
	});
</script>

{#if visible}
	<div
		class="number-wheel-overlay"
		onclick={() => (visible = false)}
		onkeydown={(e) => e.key === 'Escape' && (visible = false)}
		role="button"
		tabindex="0"
		aria-label="Close number wheel picker"
	>
		<div
			class="number-wheel-container"
			onclick={(e) => e.stopPropagation()}
			onkeydown={(e) => e.stopPropagation()}
			role="dialog"
			tabindex="-1"
			aria-label="Number wheel picker"
		>
			<div
				class="number-wheel"
				bind:this={wheelElement}
				ontouchstart={handleTouchStart}
				ontouchmove={handleTouchMove}
				onscroll={debouncedHandleScroll}
			>
				<div class="wheel-spacer"></div>
				{#each numbers as num, index}
					<button
						class="wheel-item {selectedIndex === index ? 'selected' : ''}"
						onclick={() => handleSelect(num, index)}
						type="button"
					>
						{num}
					</button>
				{/each}
				<div class="wheel-spacer"></div>
			</div>
			<div class="wheel-selector"></div>
		</div>
	</div>
{/if}

<style>
	.number-wheel-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 50;
		backdrop-filter: blur(4px);
	}

	.number-wheel-container {
		position: relative;
		background: oklch(var(--b1));
		border-radius: 1rem;
		padding: 1rem;
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
		width: 200px;
	}

	.number-wheel {
		height: 200px;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.number-wheel::-webkit-scrollbar {
		display: none;
	}

	.wheel-spacer {
		height: 80px;
		flex-shrink: 0;
	}

	.wheel-item {
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.25rem;
		scroll-snap-align: center;
		transition: all 0.2s ease;
		opacity: 0.4;
		width: 100%;
		background: transparent;
		border: none;
		color: oklch(var(--bc));
		cursor: pointer;
	}

	.wheel-item:hover {
		opacity: 0.7;
	}

	.wheel-item.selected {
		opacity: 1;
		font-weight: 600;
		font-size: 1.5rem;
		color: oklch(var(--p));
	}

	.wheel-selector {
		position: absolute;
		top: 50%;
		left: 1rem;
		right: 1rem;
		height: 40px;
		transform: translateY(-50%);
		border-top: 2px solid oklch(var(--p) / 0.3);
		border-bottom: 2px solid oklch(var(--p) / 0.3);
		pointer-events: none;
		border-radius: 0.5rem;
		background: oklch(var(--p) / 0.05);
	}
</style>
