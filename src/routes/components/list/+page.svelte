<script lang="ts">
	import type { ListPickerData } from '$lib/types/types.js';
	import ListPicker from '$lib/components/list/ListPicker.svelte';

	// Example from README
	let selected = $state(2);

	const options: ListPickerData<number>[] = [
		{
			value: 1,
			header: 'Basic Plan',
			description: 'Perfect for individuals',
			label: { text: 'Popular', className: 'badge-primary' }
		},
		{
			value: 2,
			header: 'Pro Plan',
			description: 'For professionals',
			label: { text: 'Best Value', className: 'badge-success' }
		},
		{
			value: 3,
			header: 'Enterprise',
			description: 'For large teams'
		}
	];
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h2 class="mb-2 text-2xl font-bold">ListPicker Example</h2>
		<p class="mb-4 text-sm opacity-70">
			Selectable list with headers, descriptions, and optional labels
		</p>

		<ListPicker bind:value={selected} data={options}>
			{#snippet header()}
				<span>Choose your plan</span>
			{/snippet}
		</ListPicker>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected plan ID:</strong>
				{selected}
			</p>
		</div>
	</div>
</div>
