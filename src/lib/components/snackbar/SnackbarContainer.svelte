<script lang="ts">
	import { snackbar } from './snackbar.svelte.js';
	import { fly } from 'svelte/transition';

	interface Props {
		/** Position of the snackbar container (default: bottom-center for mobile) */
		position?: 'top' | 'bottom';
		/** Horizontal alignment */
		align?: 'start' | 'center' | 'end';
		/** Custom class for the snackbar container */
		class?: string;
		/** Minimum swipe distance to trigger dismiss (default: 100) */
		swipeThreshold?: number;
	}

	let {
		position = 'bottom',
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

	// Track swipe state for each snackbar
	let swipeStates = $state<Map<string, { translateX: number; isDragging: boolean }>>(new Map());
	let activePointerId: number | null = null;
	let activeSnackbarId: string | null = null;
	let startX = 0;

	function getSwipeState(id: string) {
		if (!swipeStates.has(id)) {
			swipeStates.set(id, { translateX: 0, isDragging: false });
		}
		return swipeStates.get(id)!;
	}

	function handleStart(event: PointerEvent | TouchEvent, snackbarId: string) {
		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;

		if ('pointerId' in event && event.pointerType !== 'touch') {
			activePointerId = event.pointerId;
			(event.target as HTMLElement)?.setPointerCapture?.(event.pointerId);
		}

		startX = clientX;
		activeSnackbarId = snackbarId;
		const state = getSwipeState(snackbarId);
		state.isDragging = true;
		swipeStates.set(snackbarId, { ...state });
	}

	function handleMove(event: PointerEvent | TouchEvent, snackbarId: string) {
		if (activeSnackbarId !== snackbarId) return;

		const state = getSwipeState(snackbarId);
		if (!state.isDragging) return;

		const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
		const deltaX = clientX - startX;

		state.translateX = deltaX;
		swipeStates.set(snackbarId, { ...state });

		// Prevent scrolling while swiping
		if (Math.abs(deltaX) > 10) {
			event.preventDefault();
		}
	}

	function handleEnd(event: PointerEvent | TouchEvent, snackbarId: string) {
		if (activeSnackbarId !== snackbarId) return;

		const state = getSwipeState(snackbarId);
		if (!state.isDragging) return;

		const clientX = 'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;
		const deltaX = clientX - startX;

		// Dismiss if swiped past threshold (either direction)
		if (Math.abs(deltaX) >= swipeThreshold) {
			// Animate off screen in the swipe direction before removing
			const swipeDirection = deltaX > 0 ? 1 : -1;
			state.translateX = swipeDirection * window.innerWidth;
			swipeStates.set(snackbarId, { ...state });

			// Remove after animation completes
			setTimeout(() => {
				snackbar.dismiss(snackbarId, 'manual');
				swipeStates.delete(snackbarId);
			}, 300);
		} else {
			// Reset state if didn't swipe far enough
			state.isDragging = false;
			state.translateX = 0;
			swipeStates.set(snackbarId, { ...state });
		}

		if ('pointerId' in event && activePointerId !== null) {
			(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
			activePointerId = null;
		}

		activeSnackbarId = null;
	}

	function handleCancel(event: PointerEvent, snackbarId: string) {
		if (activeSnackbarId !== snackbarId) return;

		const state = getSwipeState(snackbarId);
		state.isDragging = false;
		state.translateX = 0;
		swipeStates.set(snackbarId, { ...state });

		if (activePointerId !== null) {
			(event.target as HTMLElement)?.releasePointerCapture?.(activePointerId);
			activePointerId = null;
		}

		activeSnackbarId = null;
	}
</script>

{#if snackbar.all.length > 0}
	<div class="toast {positionClass} {alignClass} {className} z-50">
		{#each snackbar.all as snackbarItem (snackbarItem.id)}
			{@const state = getSwipeState(snackbarItem.id)}
			<div
				role="alert"
				aria-live="polite"
				class="alert alert-info shadow-lg"
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
				ontouchstart={(e) => handleStart(e, snackbarItem.id)}
				ontouchmove={(e) => handleMove(e, snackbarItem.id)}
				ontouchend={(e) => handleEnd(e, snackbarItem.id)}
				onpointerdown={(e) => e.pointerType !== 'touch' && handleStart(e, snackbarItem.id)}
				onpointermove={(e) => e.pointerType !== 'touch' && handleMove(e, snackbarItem.id)}
				onpointerup={(e) => e.pointerType !== 'touch' && handleEnd(e, snackbarItem.id)}
				onpointercancel={(e) => handleCancel(e, snackbarItem.id)}
			>
				<span>{snackbarItem.message}</span>

				{#if snackbarItem.actionLabel}
					<div class="flex gap-2 ml-auto">
						<button
							class="btn btn-sm btn-ghost"
							onclick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								snackbar.dismiss(snackbarItem.id, 'action');
							}}
							aria-label={snackbarItem.actionLabel}
						>
							{snackbarItem.actionLabel}
						</button>
					</div>
				{/if}

				{#if snackbarItem.dismissible}
					<button
						class="btn btn-ghost btn-sm btn-circle ml-2"
						onclick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							snackbar.dismiss(snackbarItem.id, 'manual');
						}}
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
