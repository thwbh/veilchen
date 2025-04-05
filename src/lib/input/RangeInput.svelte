<script lang="ts">
	interface Props {
		label: string;
		value: number;
		min: number;
		max: number;
		unit: string;
		rangeClass: string;
	}

	let {
		label = 'Range value',
		value = $bindable(0),
		min = 0,
		max = 10,
		rangeClass = 'range',
		unit = undefined,
		...props
	} = $props();

	const checkBounds = () => {
		if (value > max) value = max;
		if (value < min) value = min;
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
	<input type="range" class={rangeClass} {min} {max} bind:value />
</label>

<style>
	.w-range-input {
		width: 4em;
	}
</style>
