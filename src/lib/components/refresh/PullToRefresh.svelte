<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A pull-to-refresh component for mobile touch interfaces.
	 * Triggers a refresh callback when the user pulls down on the content area.
	 */
	interface Props {
		/** Callback fired when refresh is triggered */
		onrefresh: () => void | Promise<void>;
		/** Whether a refresh is currently in progress */
		refreshing?: boolean;
		/** Minimum pull distance in pixels to trigger refresh (default: 80) */
		threshold?: number;
		/** Maximum pull distance in pixels (default: 120) */
		maxPullDistance?: number;
		/** Resistance factor for pull (default: 2.5) */
		resistance?: number;
		/** Custom refresh indicator snippet */
		indicator?: Snippet<[number]>; // Progress 0-1
		/** Content to be scrollable */
		children: Snippet;
		/** Additional CSS classes */
		class?: string;
		/** Bottom padding in rem for bottom navigation */
		bottomPadding?: number;
	}

	let {
		onrefresh,
		refreshing = $bindable(false),
		threshold = 80,
		maxPullDistance = 120,
		resistance = 2.5,
		indicator = undefined,
		children,
		class: className = '',
		bottomPadding = 0
	}: Props = $props();

	let containerElement: HTMLDivElement | undefined = $state();
	let pullDistance = $state(0);
	let startY = 0;
	let startScrollTop = 0;
	let isPulling = $state(false);
	let isReleasing = $state(false);

	// Calculate pull progress (0-1)
	let pullProgress = $derived(Math.min(pullDistance / threshold, 1));

	function handleTouchStart(event: TouchEvent) {
		if (refreshing) return;

		// Check if touch originated from within a dialog, modal, or nested scrollable element
		const target = event.target as HTMLElement;
		let element = target;

		while (element && element !== containerElement) {
			// Check if element is a dialog or inside a modal
			if (
				element.tagName === 'DIALOG' ||
				element.classList.contains('modal-box') ||
				element.classList.contains('modal') ||
				element.hasAttribute('data-no-pull-refresh')
			) {
				startY = 0;
				return;
			}

			const style = window.getComputedStyle(element);
			const overflowY = style.overflowY;
			const isScrollable =
				(overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
				element.scrollHeight > element.clientHeight;

			// If we find a scrollable ancestor, don't activate pull-to-refresh
			if (isScrollable) {
				startY = 0;
				return;
			}

			element = element.parentElement as HTMLElement;
		}

		const scrollTop = containerElement?.scrollTop ?? 0;

		// Only allow pull-to-refresh when at the top of the scroll container
		if (scrollTop <= 0) {
			startY = event.touches[0].clientY;
			startScrollTop = scrollTop;
			isPulling = false;
		}
	}

	function handleTouchMove(event: TouchEvent) {
		if (refreshing || startY === 0) return;

		const currentY = event.touches[0].clientY;
		const deltaY = currentY - startY;
		const scrollTop = containerElement?.scrollTop ?? 0;

		// Only pull if we're at the top and pulling down
		if (scrollTop <= 0 && deltaY > 0) {
			isPulling = true;

			// Apply resistance to create a natural feel
			const rawPull = deltaY;
			const resistedPull = Math.min(rawPull / resistance, maxPullDistance);

			pullDistance = resistedPull;

			// Prevent default scrolling behavior when pulling
			if (pullDistance > 5) {
				event.preventDefault();
			}
		}
	}

	async function handleTouchEnd(_event: TouchEvent) {
		if (refreshing || !isPulling) {
			resetPull();
			return;
		}

		isPulling = false;

		// Trigger refresh if pulled past threshold
		if (pullDistance >= threshold) {
			isReleasing = true;
			refreshing = true;

			try {
				await onrefresh();
			} finally {
				refreshing = false;
				resetPull();
			}
		} else {
			resetPull();
		}
	}

	function resetPull() {
		startY = 0;
		startScrollTop = 0;
		isPulling = false;
		isReleasing = false;
		pullDistance = 0;
	}

	// Reset pull distance when refreshing completes
	$effect(() => {
		if (!refreshing && !isPulling) {
			pullDistance = 0;
		}
	});
</script>

<div
	bind:this={containerElement}
	class="pull-to-refresh-container {className}"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	role="region"
	aria-label="Pull to refresh content"
	aria-busy={refreshing}
	style="
		overflow-y: auto;
		overflow-x: hidden;
		-webkit-overflow-scrolling: touch;
		touch-action: pan-y;
		position: relative;
	"
>
	<!-- Refresh indicator -->
	<div
		class="refresh-indicator"
		style="
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			height: {maxPullDistance}px;
			display: flex;
			align-items: center;
			justify-content: center;
			transform: translateY({(refreshing || isReleasing ? threshold : pullDistance) - maxPullDistance}px);
			transition: {isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
			pointer-events: none;
			z-index: 10;
		"
	>
		{#if indicator}
			{@render indicator(pullProgress)}
		{:else}
			<div
				class="default-indicator"
				style="
					width: 40px;
					height: 40px;
					border-radius: 50%;
					background: var(--color-primary, hsl(var(--p)));
					display: flex;
					align-items: center;
					justify-content: center;
					opacity: {pullProgress};
					transform: rotate({pullProgress * 360}deg);
					transition: {isPulling ? 'none' : 'opacity 0.2s, transform 0.3s'};
				"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="white"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="{refreshing ? 'spin' : ''}"
				>
					<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
				</svg>
			</div>
		{/if}
	</div>

	<!-- Scrollable content -->
	<div
		class="refresh-content"
		style="
			transform: translateY({refreshing || isReleasing ? threshold : pullDistance}px);
			transition: {isPulling ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
			padding-bottom: calc({bottomPadding}rem + env(safe-area-inset-bottom));
		"
	>
		{@render children()}
	</div>
</div>

<style>
	.pull-to-refresh-container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.refresh-content {
		width: 100%;
		min-height: 100%;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.spin {
		animation: spin 1s linear infinite;
	}

	.default-indicator {
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
</style>
