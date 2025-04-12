<script lang="ts">
	import type { ListPickerData } from '$lib/types/types.js';
	import ListPicker from '$lib/components/list/ListPicker.svelte';

	let listValue = $state(1.2);
	const listData: Array<ListPickerData> = [
		{ value: 1, header: 'Header 1', description: 'Content 1' },
		{
			value: 1.1,
			header: 'Header 2',
			description: 'Content 2',
			label: { text: 'Now vegan!', activeClassName: 'badge-primary' }
		},
		{
			value: 1.2,
			header: 'Header 3',
			description: 'Content 3',
			label: { text: 'Recommended', className: 'badge-primary' }
		},
		{ value: 1.3, header: 'Header 4', description: 'Content 4' },
		{ value: 1.4, header: 'Header 5', description: 'Content 5' }
	];

	let listValue2 = $state(300);
	const listData2 = [
		{
			value: 100,
			header: 'End Date: 01.07.2026',
			description: 'A with a deficit of 100 kcal, you reach your goal in 467 days.'
		},
		{
			value: 200,
			header: 'End Date: 31.12.2025',
			description: 'A with a deficit of 200 kcal, you reach your goal in 451 days.'
		},
		{
			value: 300,
			header: 'End Date: 04.11.2025',
			description: 'A with a deficit of 300 kcal, you reach your goal in 420 days.'
		},

		{
			value: 400,
			header: 'End Date: 08.10.2025',
			description: 'A with a deficit of 400 kcal, you reach your goal in 397 days.'
		},

		{
			value: 500,
			header: 'End Date: 27.08.2025',
			description: 'A with a deficit of 500 kcal, you reach your goal in 361 days.',
			label: {
				text: 'Sweet spot',
				className: 'badge-primary'
			}
		},

		{
			value: 600,
			header: 'End Date: 30.06.2025',
			description: 'A with a deficit of 600 kcal, you reach your goal in 312 days.'
		},

		{
			value: 700,
			header: 'End Date: 17.05.2025',
			description: 'A with a deficit of 700 kcal, you reach your goal in 261 days.',
			label: {
				text: 'Tough',
				className: 'badge-error'
			}
		}
	];
</script>

<div class="flex flex-col gap-4 p-4">
	<ListPicker bind:value={listValue} data={listData}>
		{#snippet header()}
			<span>List description goes here.</span>
		{/snippet}
	</ListPicker>

	<ListPicker bind:value={listValue2} data={listData2}>
		{#snippet header()}
			Please review and choose.
		{/snippet}
	</ListPicker>
</div>
