<script lang="ts">
	import LineChart from '$lib/components/chart/LineChart.svelte';

	const style = getComputedStyle(document.body);

	const legend = ['1', '2', '3', '4', '5', '6', '7'];
	const axisLabel = 'Value (Mt)';
	const data = [19, 45, 100, 98, 99, 35, 31];

	const lineChartData = {
		data: {
			labels: legend,
			datasets: [
				{
					label: axisLabel,
					data
				}
			]
		},
		options: {
			responsive: true
		}
	};

	const filledChartData = {
		data: {
			labels: legend,
			datasets: [
				{
					label: 'Axis 1',
					data: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22],
					fill: '1'
				},
				{
					label: 'Axis 2',
					data: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
					fill: 'start'
				},
				{
					label: 'Axis 3',
					data: [10, 12, 14, 16, 18, 20, 22, 24, 26],
					fill: 'end'
				}
			]
		},
		options: { responsive: true }
	};

	const bmiChart = {
		data: {
			labels: ['150', '160', '170', '180', '190', '200', '220'],
			datasets: [
				{
					label: 'optimal upper',
					data: [54.1, 67.3, 75.6, 84.1, 93.5, 101.2, 111.0],
					backgroundColor: `${style.getPropertyValue('--color-success')}`
				},
				{
					label: 'optimal lower',
					data: [43.1, 54.2, 64.1, 73.9, 83.1, 90.1, 99.9],
					fill: '0',
					backgroundColor: `${style.getPropertyValue('--color-success')}`
				}
			]
		},
		options: { responsive: true }
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<LineChart data={lineChartData.data} options={lineChartData.options} />

	<LineChart data={filledChartData.data} options={filledChartData.options} />

	<LineChart data={bmiChart.data} options={bmiChart.options} />
</div>
