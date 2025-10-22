<script lang="ts">
	import {
		Chart,
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Title,
		Tooltip,
		Legend,
		Filler
	} from 'chart.js';
	import type { ChartProps } from '$lib/chart/props.js';

	// Register only the components needed for line charts
	Chart.register(
		LineController,
		LineElement,
		PointElement,
		LinearScale,
		CategoryScale,
		Title,
		Tooltip,
		Legend,
		Filler
	);

	/**
	 * A line chart component powered by Chart.js.
	 * Automatically updates when data or options change.
	 * Uses tree-shakeable imports for optimal bundle size.
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
