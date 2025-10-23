<script lang="ts">
	import LineChart from '$lib/components/chart/LineChart.svelte';
	import BarChart from '$lib/components/chart/BarChart.svelte';
	import PolarAreaChart from '$lib/components/chart/PolarAreaChart.svelte';

	// LineChart Example
	const lineData = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
		datasets: [
			{
				label: 'Sales',
				data: [12, 19, 3, 5, 2],
				borderColor: 'rgb(75, 192, 192)',
				tension: 0.1
			}
		]
	};

	const lineOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'top' as const }
		}
	};

	// BarChart Example
	const barData = {
		labels: ['Q1', 'Q2', 'Q3', 'Q4'],
		datasets: [
			{
				label: 'Revenue',
				data: [65, 59, 80, 81],
				backgroundColor: 'rgba(54, 162, 235, 0.5)'
			}
		]
	};

	// PolarAreaChart Example
	const polarData = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
		datasets: [
			{
				data: [11, 16, 7, 3, 14],
				backgroundColor: [
					'rgb(255, 99, 132)',
					'rgb(75, 192, 192)',
					'rgb(255, 205, 86)',
					'rgb(201, 203, 207)',
					'rgb(54, 162, 235)'
				]
			}
		]
	};
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Chart Examples</h1>
	<p class="mb-4 text-sm opacity-70">Chart components powered by Chart.js</p>

	<div>
		<h2 class="mb-2 text-2xl font-bold">LineChart</h2>
		<p class="mb-4 text-sm opacity-70">Monthly sales data</p>
		<LineChart data={lineData} options={lineOptions} />
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">BarChart</h2>
		<p class="mb-4 text-sm opacity-70">Quarterly revenue</p>
		<BarChart data={barData} options={{}} />
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">PolarAreaChart</h2>
		<p class="mb-4 text-sm opacity-70">Color distribution</p>
		<PolarAreaChart data={polarData} options={{}} />
	</div>
</div>
