<script lang="ts">
	import { type Snippet } from 'svelte';
	import Step from './Step.svelte';

	interface Props {
		currentStep?: number;
		stepLabel?: string;
		backLabel?: string;
		nextLabel?: string;
		finishLabel?: string;
		leftCaret?: () => void;
		rightCaret?: () => void;
		finishCaret?: () => void;
		onnext?: () => void;
		onback?: () => void;
		onfinish?: () => void;
		[key: string]: Snippet<[Step]>;
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
		...restProps
	} = $props();

	let steps = $derived(Object.values(restProps).filter((f) => typeof f === 'function'));

	let first = steps ? 1 : 0,
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

<div class="flex w-full flex-col gap-4 p-4">
	<hr class="step-line" />
	<ul class="timeline timeline-horizontal flex-row justify-between">
		<span class="flex flex-row">
			{#each { length: currentStep }, step}
				<li>
					<div class="timeline-middle">
						{#if currentStep === step + 1}
							<span class="badge badge-step badge-neutral">{stepLabel} {step + 1}</span>
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
							<span class="badge badge-step badge-neutral"
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
		{#each steps as step}
			{@render step()}
		{/each}
	</div>
	<div class="join grid grid-cols-2">
		<button onclick={() => move(-1)} class="join-item btn flex items-center justify-start">
			<span> {@render leftCaret?.()} </span>
			<span> {backLabel} </span>
		</button>
		{#if currentStep < last}
			<button
				onclick={() => move(1)}
				class="join-item btn btn-neutral flex items-center justify-end"
			>
				<span> {nextLabel} </span>
				<span> {@render rightCaret?.()} </span>
			</button>
		{:else}
			<button
				onclick={() => onfinish()}
				class="join-item btn btn-primary flex items-center justify-end"
			>
				<span> {finishLabel} </span>
				<span> {@render finishCaret?.()} </span>
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
		color: var(--color-accent);
	}
</style>
