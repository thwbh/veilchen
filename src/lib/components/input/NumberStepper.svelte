<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import InlineNumberWheel from './InlineNumberWheel.svelte';

	/**
	 * A number stepper component with increment/decrement buttons and configurable step sizes.
	 * Based on ValidatedInput with iOS-style number wheel pickers for step selection.
	 */
	interface Props extends Omit<HTMLInputAttributes, 'value' | 'type' | 'children'> {
		/** CSS class to apply to the input element */
		class?: string;
		/** Label text displayed above the input */
		label: string;
		/** Name attribute for the input */
		name?: string;
		/** The current value of the input */
		value: number;
		/** Minimum allowed value */
		min?: number;
		/** Maximum allowed value */
		max?: number;
		/** Whether the field is required */
		required?: boolean;
		/** Whether to display error inline instead of below */
		errorInline?: boolean;
		/** Optional unit to display after the input */
		unit?: string;
		/** Array of available step sizes for increment button (default: [1, 5, 10]) */
		incrementSteps?: number[];
		/** Array of available step sizes for decrement button (default: [1, 5, 10]) */
		decrementSteps?: number[];
		/** Initial step size for increment (default: first in incrementSteps) */
		initialIncrementStep?: number;
		/** Initial step size for decrement (default: first in decrementSteps) */
		initialDecrementStep?: number;
		/** Whether to show the left (decrement) number wheel (default: true) */
		showLeftWheel?: boolean;
		/** Whether to show the right (increment) number wheel (default: true) */
		showRightWheel?: boolean;
		/** Children snippet for error/help text */
		children?: Snippet;
	}

	let {
		class: className = '',
		label,
		name = undefined,
		value = $bindable(0),
		min = undefined,
		max = undefined,
		required = false,
		errorInline = false,
		unit = undefined,
		incrementSteps = [1, 5, 10],
		decrementSteps = [1, 5, 10],
		initialIncrementStep = incrementSteps[0],
		initialDecrementStep = decrementSteps[0],
		showLeftWheel = true,
		showRightWheel = true,
		children,
		...props
	}: Props = $props();

	// When only one wheel is visible, use a shared step value
	const useSingleStep = !showLeftWheel || !showRightWheel;
	const sharedSteps = useSingleStep ? (showLeftWheel ? decrementSteps : incrementSteps) : [];
	const sharedInitialStep = useSingleStep
		? showLeftWheel
			? initialDecrementStep
			: initialIncrementStep
		: 0;

	let sharedStep = $state(sharedInitialStep);
	let incrementStep = $state(initialIncrementStep);
	let decrementStep = $state(initialDecrementStep);

	// Use shared step when only one wheel is visible
	const activeIncrementStep = $derived(useSingleStep ? sharedStep : incrementStep);
	const activeDecrementStep = $derived(useSingleStep ? sharedStep : decrementStep);

	function increment() {
		const newValue = value + activeIncrementStep;
		if (max !== undefined) {
			value = Math.min(newValue, max);
		} else {
			value = newValue;
		}
	}

	function decrement() {
		const newValue = value - activeDecrementStep;
		if (min !== undefined) {
			value = Math.max(newValue, min);
		} else {
			value = newValue;
		}
	}

	function handleInputChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const parsed = parseFloat(target.value);
		if (!isNaN(parsed)) {
			value = parsed;
		}
	}
</script>

<label class="flex flex-col gap-2">
	<span class="text-xs">
		{label}
	</span>

	<div class="number-stepper-container">
		<!-- Decrement Section -->
		<div class="stepper-section">
			{#if showLeftWheel}
				{#if useSingleStep}
					<InlineNumberWheel numbers={sharedSteps} bind:value={sharedStep} />
				{:else}
					<InlineNumberWheel numbers={decrementSteps} bind:value={decrementStep} />
				{/if}
			{/if}
			<button
				type="button"
				class="btn btn-primary stepper-button"
				onclick={decrement}
				disabled={min !== undefined && value <= min}
				aria-label="Decrement by {activeDecrementStep}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
				</svg>
			</button>
		</div>

		<!-- Input Field -->
		<span class={unit ? 'join flex-1' : 'flex-1'}>
			<input
				class="input validator text-center {unit ? className + ' join-item' : className}"
				type="number"
				bind:value
				oninput={handleInputChange}
				{name}
				{min}
				{max}
				{required}
				{...props}
			/>

			<span class="validator-hint {errorInline ? 'inline-error' : ''}">
				{#if children}
					{@render children()}
				{/if}
			</span>

			{#if unit}
				<p class="join-item btn btn-disabled text-base-content">
					{unit}
				</p>
			{/if}
		</span>

		<!-- Increment Section -->
		<div class="stepper-section">
			<button
				type="button"
				class="btn btn-primary stepper-button"
				onclick={increment}
				disabled={max !== undefined && value >= max}
				aria-label="Increment by {activeIncrementStep}"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
				</svg>
			</button>
			{#if showRightWheel}
				{#if useSingleStep}
					<InlineNumberWheel numbers={sharedSteps} bind:value={sharedStep} />
				{:else}
					<InlineNumberWheel numbers={incrementSteps} bind:value={incrementStep} />
				{/if}
			{/if}
		</div>
	</div>
</label>

<style>
	label {
		position: relative;
	}

	.number-stepper-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.stepper-section {
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
		align-items: center;
	}

	.stepper-button {
		min-height: 3rem;
		height: 3rem;
		width: 3rem;
		padding: 0;
	}

	.inline-error {
		position: absolute;
		bottom: 4em;
		right: 0;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: textfield;
	}
</style>
