<script lang="ts">
	import { type Snippet } from 'svelte';

	type StepSnippet = Snippet<[number]>;

	/**
	 * A multi-step wizard component with navigation controls.
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
		/** Step snippets (step1, step2, etc.) passed as additional props */
		[key: string]: StepSnippet | number | string | undefined | (() => void);
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
		...restProps
	}: Props = $props();

	// More explicit type filtering for steps
	let steps = $derived(
		Object.values(restProps).filter((f): f is StepSnippet => typeof f === 'function')
	);

	let first = 1,
		last = $derived(Object.values(restProps).length);

	const move = (inc: number) => {
		if (inc < 0 && currentStep === first) currentStep = first;
		else if (inc > 0 && currentStep === last) currentStep = last;
		else {
			currentStep += inc;

			if (inc > 0) onnext();
			if (inc < 0) onback();
		}
	};
</script>

<div class="flex w-full flex-col gap-4">
	<hr class="step-line" />
	<ul class="timeline timeline-horizontal flex-row justify-between">
		<span class="flex flex-row">
			{#each { length: currentStep }, step}
				<li>
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
			{#each { length: last - currentStep }, step}
				<li>
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
	<div>
		{#each steps as step, i}
			{#if i + 1 === currentStep}
				{@render step(i + 1)}
			{/if}
		{/each}
	</div>
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

<style>
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
</style>
