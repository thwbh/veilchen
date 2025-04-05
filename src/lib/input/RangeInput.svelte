<script lang="ts">
	interface Props {
		label: string;
		value: number;
		min: number;
		max: number;
		unit: string;
		step: number;
		rangeClass: string;
	}

	let {
		label = 'Range value',
		value = $bindable(0),
		min = 0,
		max = 10,
		rangeClass = 'range',
		unit = undefined,
		step = undefined,
		...props
	} = $props();

	const checkBounds = () => {
		if (value > max) value = max;
		if (value < min) value = min;

		if (step) {
			if (value % step !== 0) {
				value = min;
			}
		}
	};
</script>

<label class="flex flex-col gap-2">
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
		<input type="range" class="{rangeClass} w-full" {min} {max} {step} bind:value />

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
