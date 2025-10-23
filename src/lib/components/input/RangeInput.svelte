<script lang="ts">
	/**
	 * A range input component with visual steps and text input.
	 */
	interface Props {
		/** Label text displayed above the range input */
		label?: string;
		/** The current value of the range */
		value: number;
		/** Minimum value */
		min: number;
		/** Maximum value */
		max: number;
		/** Optional unit to display after the value */
		unit?: string;
		/** Step increment for the range */
		step?: number;
		/** CSS class to apply to the range element */
		class?: string;
		/** Optional change handler called when value changes */
		onchange?: (value: number) => void;
	}

	let {
		label = 'Range value',
		value = $bindable(0),
		min = 0,
		max = 10,
		class: className = '',
		unit = undefined,
		step = undefined,
		onchange,
		...props
	}: Props = $props();

	const checkBounds = () => {
		if (value > max) value = max;
		if (value < min) value = min;

		if (step) {
			if (value % step !== 0) {
				value = min;
			}
		}
		onchange?.(value);
	};

	function handleChange() {
		onchange?.(value);
	}
</script>

<label class="flex flex-col gap-2" {...props}>
	<span class="flex flex-row justify-between">
		<span>{label}</span>
		<span>
			<input
				type="text"
				class="input-ghost w-range-input text-right"
				bind:value
				onfocusout={() => checkBounds()}
			/>
			<span>
				{unit}
			</span>
		</span>
	</span>

	<span>
		<input
			type="range"
			class="range {className} w-full"
			{min}
			{max}
			{step}
			bind:value
			onchange={handleChange}
		/>

		<div class="text-step flex grow-0 flex-row items-center justify-between px-2.5">
			{#if step}
				{@const steps = (max - min) / step + 1}
				{#each { length: steps }, i}
					<span> | </span>
				{/each}
			{/if}
		</div>
	</span>
</label>

<style>
	.w-range-input {
		width: 4em;
	}

	.text-step {
		font-size: calc(var(--text-sm) * 0.6);
	}

	.text-step > span {
		overflow: hidden;
		max-width: var(--spacing);
		text-align: center;
	}
</style>
