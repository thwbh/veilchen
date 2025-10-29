<script lang="ts">
	import { toast } from './toast.svelte.js';
	import { AlertType } from '$lib/enum/enum.js';
	import { fly, fade } from 'svelte/transition';

	interface Props {
		/** Position of the toast container (default: top-center for mobile) */
		position?: 'top' | 'bottom';
		/** Horizontal alignment */
		align?: 'start' | 'center' | 'end';
		/** Custom class for the toast container */
		class?: string;
		/** Minimum swipe distance to trigger dismiss (default: 100) */
		swipeThreshold?: number;
	}

	let {
		position = 'top',
		align = 'center',
		class: className = '',
		swipeThreshold = 100
	}: Props = $props();

	const positionClass = $derived(
		position === 'top' ? 'toast-top' : position === 'bottom' ? 'toast-bottom' : ''
	);
	const alignClass = $derived(
		align === 'start' ? 'toast-start' : align === 'center' ? 'toast-center' : 'toast-end'
	);

	// Track swipe state for each toast
	let swipeStates = $state<Map<string, { translateX: number; isDragging: boolean }>>(new Map());
	let activePointerId: number | null = null;
	let activeToastId: string | null = null;
	let startX = 0;

	function getSwipeState(id: string) {
		if (!swipeStates.has(id)) {
			swipeStates.set(id, { translateX: 0, isDragging: false });
		}
		return swipeStates.get(id)!;
	}

	function handleStart(event: PointerEvent | TouchEvent, toastId: string) {
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

		if ('pointerId' in event && event.pointerType !== 'touch') {
			activePointerId = event.pointerId;
			(event.target as HTMLElement)?.setPointerCapture?.(event.pointerId);
		}

		startX = clientX;
		activeToastId = toastId;
		const state = getSwipeState(toastId);
		state.isDragging = true;
		swipeStates.set(toastId, { ...state });
	}

	function handleMove(event: PointerEvent | TouchEvent, toastId: string) {
		if (activeToastId !== toastId) return;

		const state = getSwipeState(toastId);
		if (!state.isDragging) return;

		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const deltaX = clientX - startX;

		state.translateX = deltaX;
		swipeStates.set(toastId, { ...state });

		// Prevent scrolling while swiping
		if (Math.abs(deltaX) > 10) {
			event.preventDefault();
		}
	}

	function handleEnd(event: PointerEvent | TouchEvent, toastId: string) {
		if (activeToastId !== toastId) return;

		const state = getSwipeState(toastId);
		if (!state.isDragging) return;

		const clientX = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
		const deltaX = clientX - startX;

		// Dismiss if swiped past threshold (either direction)
		if (Math.abs(deltaX) >= swipeThreshold) {
			// Animate off screen in the swipe direction before removing
			const swipeDirection = deltaX > 0 ? 1 : -1;
			state.translateX = swipeDirection * window.innerWidth;
			swipeStates.set(toastId, { ...state });

			// Remove after animation completes
			setTimeout(() => {
				toast.remove(toastId);
				swipeStates.delete(toastId);
			}, 300);
		} else {
			// Reset state if didn't swipe far enough
			state.isDragging = false;
			state.translateX = 0;
			swipeStates.set(toastId, { ...state });
		}

		if ('pointerId' in event && activePointerId !== null) {
			(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
			activePointerId = null;
		}

		activeToastId = null;
	}

	function handleCancel(event: PointerEvent, toastId: string) {
		if (activeToastId !== toastId) return;

		const state = getSwipeState(toastId);
		state.isDragging = false;
		state.translateX = 0;
		swipeStates.set(toastId, { ...state });

		if (activePointerId !== null) {
			(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
			activePointerId = null;
		}

		activeToastId = null;
	}
</script>

{#if toast.all.length > 0}
	<div class="toast {positionClass} {alignClass} {className} z-50">
		{#each toast.all as toastItem (toastItem.id)}
			{@const state = getSwipeState(toastItem.id)}
			<div
				role="alert"
				class="alert {toastItem.type} shadow-lg"
				in:fly={{ y: position === 'top' ? -50 : 50, duration: 300 }}
				out:fly={{ y: position === 'top' ? -100 : 100, duration: 300 }}
				style="
					transform: translateX({state.translateX}px);
					transition: {state.isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'};
					cursor: {state.isDragging ? 'grabbing' : 'grab'};
					touch-action: pan-y;
					user-select: none;
					opacity: {Math.max(0.3, 1 - Math.abs(state.translateX) / (swipeThreshold * 1.5))};
				"
				ontouchstart={(e) => handleStart(e, toastItem.id)}
				ontouchmove={(e) => handleMove(e, toastItem.id)}
				ontouchend={(e) => handleEnd(e, toastItem.id)}
				onpointerdown={(e) => e.pointerType !== 'touch' && handleStart(e, toastItem.id)}
				onpointermove={(e) => e.pointerType !== 'touch' && handleMove(e, toastItem.id)}
				onpointerup={(e) => e.pointerType !== 'touch' && handleEnd(e, toastItem.id)}
				onpointercancel={(e) => handleCancel(e, toastItem.id)}
			>
				{#if toastItem.type === AlertType.Info}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="h-6 w-6 shrink-0 stroke-current"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
				{:else if toastItem.type === AlertType.Error}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if toastItem.type === AlertType.Warning}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				{:else if toastItem.type === AlertType.Success}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{/if}
				<span>{toastItem.message}</span>
				{#if toastItem.dismissible}
					<button
						class="btn btn-ghost btn-sm btn-circle"
						onclick={() => toast.remove(toastItem.id)}
						aria-label="Dismiss"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				{/if}
			</div>
		{/each}
	</div>
{/if}
