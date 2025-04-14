<script lang="ts">
	import { Chart } from 'chart.js/auto';
	import type { ChartProps } from '$lib/chart/props.js';

	const { data, options, ...rest }: ChartProps<'bar'> = $props();

	let canvasElem: HTMLCanvasElement;
	let chart: Chart;

	$effect(() => {
		chart = new Chart(canvasElem, {
			type: 'bar',
			data,
			options
		});

		return () => {
			chart.destroy();
		};
	});

	$effect(() => {
		if (chart) {
			chart.data = data;
			chart.update();
		}
	});
</script>

<canvas bind:this={canvasElem} {...rest}></canvas>
