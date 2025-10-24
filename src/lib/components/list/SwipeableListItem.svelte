<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A swipeable list item that reveals actions when swiped left or right.
	 * Supports both touch and pointer events for cross-device compatibility.
	 * Automatically executes the action when fully revealed.
	 */
	interface Props {
		/** Main content of the list item */
		children: Snippet;
		/** Left swipe action snippet (revealed when swiping right) - for visual display */
		leftAction?: Snippet;
		/** Right swipe action snippet (revealed when swiping left) - for visual display */
		rightAction?: Snippet;
		/** Callback fired when left action is triggered (swiped right fully) */
		onleft?: () => void | Promise<void>;
		/** Callback fired when right action is triggered (swiped left fully) */
		onright?: () => void | Promise<void>;
		/** Maximum swipe distance in pixels (default: 80) */
		maxSwipeDistance?: number;
		/** Minimum swipe distance to trigger action (default: 60) */
		threshold?: number;
		/** Maximum time in ms for a swipe gesture (default: 300) */
		swipeTimeframe?: number;
		/** Whether swipe is enabled (default: true) */
		disabled?: boolean;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		children,
		leftAction = undefined,
		rightAction = undefined,
		onleft = undefined,
		onright = undefined,
		maxSwipeDistance = 80,
		threshold = 60,
		swipeTimeframe = 300,
		disabled = false,
		class: className = ''
	}: Props = $props();

	let itemElement: HTMLDivElement | undefined = $state();
	let contentElement: HTMLDivElement | undefined = $state();
	let translateX = $state(0);
	let startX = 0;
	let startY = 0;
	let startTime = 0;
	let isDragging = $state(false);
	let isExecuting = $state(false);
	let activePointerId: number | null = null;

	function handleStart(clientX: number, clientY: number) {
		if (disabled) return;
		startX = clientX;
		startY = clientY;
		startTime = Date.now();
		isDragging = true;
	}

	function handleMove(clientX: number, clientY: number) {
		if (disabled || !isDragging || isExecuting) return;

		const deltaX = clientX - startX;
		const deltaY = clientY - startY;

		// Only process horizontal swipes (prevent interference with vertical scrolling)
		if (Math.abs(deltaX) > Math.abs(deltaY)) {
			// Apply boundaries
			if (leftAction && deltaX > 0) {
				translateX = Math.min(deltaX, maxSwipeDistance);
			} else if (rightAction && deltaX < 0) {
				translateX = Math.max(deltaX, -maxSwipeDistance);
			} else {
				translateX = 0;
			}
		}
	}

	async function handleEnd(clientX: number, clientY: number) {
		if (disabled || !isDragging || isExecuting) return;

		isDragging = false;
		const endTime = Date.now();
		const deltaX = clientX - startX;
		const deltaY = clientY - startY;
		const deltaTime = endTime - startTime;

		// Check if gesture qualifies as a swipe (horizontal and fast enough)
		const isHorizontalSwipe =
			Math.abs(deltaX) > Math.abs(deltaY) &&
			Math.abs(deltaX) > threshold &&
			deltaTime < swipeTimeframe;

		// Execute action if swiped past threshold
		if (isHorizontalSwipe || Math.abs(translateX) >= threshold) {
			if (translateX > 0 && leftAction && onleft) {
				// Swiped right - execute left action
				isExecuting = true;
				translateX = maxSwipeDistance;

				// Small delay to show the action before executing
				await new Promise(resolve => setTimeout(resolve, 200));
				await onleft();
				close();
				isExecuting = false;
			} else if (translateX < 0 && rightAction && onright) {
				// Swiped left - execute right action
				isExecuting = true;
				translateX = -maxSwipeDistance;

				// Small delay to show the action before executing
				await new Promise(resolve => setTimeout(resolve, 200));
				await onright();
				close();
				isExecuting = false;
			} else {
				close();
			}
		} else {
			close();
		}
	}

	function close() {
		translateX = 0;
	}

	// Touch handlers
	function handleTouchStart(event: TouchEvent) {
		if (isExecuting) return;
		handleStart(event.touches[0].clientX, event.touches[0].clientY);
	}

	function handleTouchMove(event: TouchEvent) {
		if (isExecuting) return;
		handleMove(event.touches[0].clientX, event.touches[0].clientY);
		if (isDragging && Math.abs(translateX) > 5) {
			event.preventDefault();
		}
	}

	function handleTouchEnd(event: TouchEvent) {
		if (isExecuting) return;
		handleEnd(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
	}

	// Pointer handlers (mouse/pen)
	function handlePointerDown(event: PointerEvent) {
		if (isExecuting || event.pointerType === 'touch') return; // Touch events handled separately

		// Capture the pointer to track movement outside element
		activePointerId = event.pointerId;
		(event.target as HTMLElement)?.setPointerCapture?.(event.pointerId);

		handleStart(event.clientX, event.clientY);
		event.preventDefault();
	}

	function handlePointerMove(event: PointerEvent) {
		if (isExecuting || event.pointerType === 'touch') return;
		if (isDragging && activePointerId === event.pointerId) {
			handleMove(event.clientX, event.clientY);
			event.preventDefault();
		}
	}

	function handlePointerUp(event: PointerEvent) {
		if (isExecuting || event.pointerType === 'touch') return;
		if (isDragging && activePointerId === event.pointerId) {
			handleEnd(event.clientX, event.clientY);

			// Release pointer capture
			if (activePointerId !== null) {
				(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
				activePointerId = null;
			}
			event.preventDefault();
		}
	}

	// Handle pointer cancel (e.g., when pointer is interrupted)
	function handlePointerCancel(event: PointerEvent) {
		if (activePointerId === event.pointerId) {
			isDragging = false;
			close();
			if (activePointerId !== null) {
				(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
				activePointerId = null;
			}
		}
	}
</script>

<div
	bind:this={itemElement}
	class="swipeable-list-item {className}"
	class:disabled
	role="listitem"
	style="position: relative; overflow: hidden; touch-action: pan-y; user-select: none;"
>
	<!-- Left Action (revealed when swiping right) -->
	{#if leftAction}
		<div
			class="swipe-action left-action"
			style="
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-start;
				padding-left: 1rem;
				overflow: hidden;
				pointer-events: none;
			"
		>
			{@render leftAction()}
		</div>
	{/if}

	<!-- Right Action (revealed when swiping left) -->
	{#if rightAction}
		<div
			class="swipe-action right-action"
			style="
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				padding-right: 1rem;
				overflow: hidden;
				pointer-events: none;
			"
		>
			{@render rightAction()}
		</div>
	{/if}

	<!-- Main Content -->
	<div
		bind:this={contentElement}
		class="swipe-content"
		class:dragging={isDragging}
		class:executing={isExecuting}
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		onpointerdown={handlePointerDown}
		onpointermove={handlePointerMove}
		onpointerup={handlePointerUp}
		onpointercancel={handlePointerCancel}
		style="
			position: relative;
			transform: translateX({translateX}px);
			transition: {isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
			cursor: {disabled ? 'default' : isDragging ? 'grabbing' : isExecuting ? 'wait' : 'grab'};
			background: var(--color-base-100, white);
			z-index: 1;
			touch-action: pan-y;
		"
	>
		{@render children()}
	</div>
</div>

<style>
	.swipeable-list-item {
		position: relative;
	}

	.swipeable-list-item.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	.swipe-content.dragging,
	.swipe-content.executing {
		pointer-events: none;
	}

	.swipe-action {
		transition: opacity 0.2s ease;
	}
</style>
