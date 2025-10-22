<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import type { ChartProps } from '$lib/chart/props.js';

	/**
	 * A line chart component powered by Chart.js.
	 * Automatically updates when data or options change.
	 */
	const { data, options, ...rest }: ChartProps<'line'> = $props();

	let canvasElem: HTMLCanvasElement;
	let chart: Chart;

	// Initialize chart on mount
	$effect(() => {
		chart = new Chart(canvasElem, {
			type: 'line',
			data,
			options
		});

		// Cleanup on unmount
		return () => {
			chart.destroy();
		};
	});

	// Update chart when data changes
	$effect(() => {
		if (chart) {
			chart.data = data;
			chart.update();
		}
	});
</script>

<canvas bind:this={canvasElem} {...rest}></canvas>
