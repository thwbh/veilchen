<script lang="ts">
	import { type Snippet } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	type StepSnippet = Snippet<[number]>;

	/**
	 * A multi-step wizard component with navigation controls and smooth animations.
	 * Pass step content as snippets named step1, step2, etc.
	 */
	interface Props {
		/** Current active step number (1-indexed, bindable) */
		currentStep?: number;
		/** Label text for step badges (default: "Step") */
		stepLabel?: string;
		/** Label for the back button (default: "Previous") */
		backLabel?: string;
		/** Label for the next button (default: "Next Step") */
		nextLabel?: string;
		/** Label for the finish button (default: "Finish") */
		finishLabel?: string;
		/** Optional snippet for left arrow icon */
		leftCaret?: Snippet<[]> | undefined;
		/** Optional snippet for right arrow icon */
		rightCaret?: Snippet<[]> | undefined;
		/** Optional snippet for finish button icon */
		finishCaret?: Snippet<[]> | undefined;
		/** Callback when next button is clicked */
		onnext?: () => void;
		/** Callback when back button is clicked */
		onback?: () => void;
		/** Callback when finish button is clicked */
		onfinish?: () => void;
		/** CSS class for active step badge (default: "badge-neutral") */
		activeClass?: string;
		/** Duration of animations in milliseconds (default: 400) */
		animationDuration?: number;
		/** Whether buttons should stick to the bottom with scrollable content (default: false) */
		stickyButtons?: boolean;
		/** Step snippets (step1, step2, etc.) passed as additional props */
		[key: string]: StepSnippet | number | string | undefined | (() => void) | boolean;
	}

	let {
		currentStep = $bindable(1),
		stepLabel = 'Step',
		backLabel = 'Previous',
		nextLabel = 'Next Step',
		finishLabel = 'Finish',
		leftCaret = undefined,
		rightCaret = undefined,
		finishCaret = undefined,
		onnext = () => {},
		onback = () => {},
		onfinish = () => {},
		activeClass = 'badge-neutral',
		animationDuration = 400,
		stickyButtons = false,
		...restProps
	}: Props = $props();

	// More explicit type filtering for steps
	let steps = $derived(
		Object.values(restProps).filter((f): f is StepSnippet => typeof f === 'function')
	);

	let first = 1,
		last = $derived(Object.values(restProps).length);

	let direction: 'forward' | 'backward' = $state('forward');
	let containerHeight = $state(0);
	let contentElement: HTMLElement | null = null;

	function updateHeight(node: HTMLElement) {
		contentElement = node;
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				containerHeight = entry.contentRect.height;
			}
		});
		resizeObserver.observe(node);

		return {
			destroy() {
				resizeObserver.disconnect();
			}
		};
	}

	const move = (inc: number) => {
		if (inc < 0 && currentStep === first) currentStep = first;
		else if (inc > 0 && currentStep === last) currentStep = last;
		else {
			direction = inc > 0 ? 'forward' : 'backward';
			currentStep += inc;

			if (inc > 0) onnext();
			if (inc < 0) onback();
		}
	};

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			if (currentStep < last) {
				move(1);
			} else {
				onfinish();
			}
		}
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="stepper-wrapper {stickyButtons ? 'stepper-sticky' : ''}"
	onkeydown={handleKeydown}
	tabindex="0"
	role="navigation"
	aria-label="Step wizard navigation"
>
	<div class="stepper-content-wrapper {stickyButtons ? 'stepper-content-wrapper-sticky' : ''}">
		<hr class="step-line" />
		<ul class="timeline timeline-horizontal flex-row justify-between">
			<span class="flex flex-row">
				{#each { length: currentStep } as _, step (step)}
					<li
						in:fly={{
							x: direction === 'forward' ? 200 : -200,
							duration: animationDuration,
							delay: step * 50,
							easing: quintOut
						}}
						out:fly={{
							x: direction === 'forward' ? -200 : 200,
							duration: animationDuration,
							easing: quintOut
						}}
					>
						<div class="timeline-middle">
							{#if currentStep === step + 1}
								<span class="badge badge-step {activeClass}">{stepLabel} {step + 1}</span>
							{:else}
								<span class="badge badge-step">{step + 1}</span>
							{/if}
						</div>
					</li>
				{/each}
			</span>
			<span class="flex flex-row">
				{#each { length: last - currentStep } as _, step (step + currentStep)}
					<li
						in:fly={{
							x: direction === 'forward' ? 200 : -200,
							duration: animationDuration,
							delay: step * 50,
							easing: quintOut
						}}
						out:fly={{
							x: direction === 'forward' ? -200 : 200,
							duration: animationDuration,
							easing: quintOut
						}}
					>
						<div class="timeline-middle">
							{#if currentStep === last - step + 1}
								<span class="badge badge-step {activeClass}"
									>{stepLabel} {step + 1 + currentStep}</span
								>
							{:else}
								<span class="badge badge-step">{step + 1 + currentStep}</span>
							{/if}
						</div>
					</li>
				{/each}
			</span>
		</ul>
		<div
			class="step-content-container"
			style="height: {containerHeight}px;"
		>
			{#each steps as step, i (i)}
				{#if i + 1 === currentStep}
					<div
						class="step-content"
						use:updateHeight
						in:fly={{
							x: direction === 'forward' ? 300 : -300,
							duration: animationDuration,
							easing: quintOut
						}}
						out:fly={{
							x: direction === 'forward' ? -300 : 300,
							duration: animationDuration,
							easing: quintOut
						}}
					>
						{@render step(i + 1)}
					</div>
				{/if}
			{/each}
		</div>
		{#if !stickyButtons}
			<div class="stepper-buttons-wrapper">
				<div class="join grid grid-cols-2">
					<button onclick={() => move(-1)} class="join-item btn flex items-center justify-start">
						<span>
							{#if leftCaret}
								{@render leftCaret()}
							{/if}
						</span>
						<span> {backLabel} </span>
					</button>
					{#if currentStep < last}
						<button
							onclick={() => move(1)}
							class="join-item btn btn-neutral flex items-center justify-end"
						>
							<span> {nextLabel} </span>
							<span>
								{#if rightCaret}
									{@render rightCaret()}
								{/if}
							</span>
						</button>
					{:else}
						<button
							onclick={() => onfinish()}
							class="join-item btn btn-primary flex items-center justify-end"
						>
							<span> {finishLabel} </span>
							<span>
								{#if finishCaret}
									{@render finishCaret()}
								{/if}
							</span>
						</button>
					{/if}
				</div>
			</div>
		{/if}
	</div>
	{#if stickyButtons}
		<div class="stepper-buttons-wrapper">
			<div class="join grid grid-cols-2">
				<button onclick={() => move(-1)} class="join-item btn flex items-center justify-start">
					<span>
						{#if leftCaret}
							{@render leftCaret()}
						{/if}
					</span>
					<span> {backLabel} </span>
				</button>
				{#if currentStep < last}
					<button
						onclick={() => move(1)}
						class="join-item btn btn-neutral flex items-center justify-end"
					>
						<span> {nextLabel} </span>
						<span>
							{#if rightCaret}
								{@render rightCaret()}
							{/if}
						</span>
					</button>
				{:else}
					<button
						onclick={() => onfinish()}
						class="join-item btn btn-primary flex items-center justify-end"
					>
						<span> {finishLabel} </span>
						<span>
							{#if finishCaret}
								{@render finishCaret()}
							{/if}
						</span>
					</button>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.stepper-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
	}

	.stepper-sticky {
		height: 100%;
	}

	.stepper-content-wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.stepper-content-wrapper-sticky {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		min-height: 0;
	}

	.stepper-buttons-wrapper {
		flex-shrink: 0;
	}

	.badge-step {
		font-size: calc(var(--size-field) * 3);
	}

	.step-line {
		border-top-width: calc(0.5 * var(--size-field));
		position: absolute;
		margin-top: 0.8em;
		width: calc(100% - calc(8 * var(--size-field)));
		color: var(--color-neutral);
	}

	.step-content-container {
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}

	.step-content {
		position: absolute;
		width: 100%;
		top: 0;
		left: 0;
	}
</style>
