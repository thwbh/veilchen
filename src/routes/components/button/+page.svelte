<script lang="ts">
	import ButtonGroup from '$lib/components/control/ButtonGroup.svelte';
	import type { KeyValuePair } from '$lib/types/types.js';

	// Example 1: Basic Button Group
	let value = $state('y');

	const entries: KeyValuePair<string, string>[] = [
		{ key: 'y', value: 'Yes' },
		{ key: 'n', value: 'No' }
	];

	// Example 2: With Change Handler
	let selectedValue = $state('a');

	const entries2: KeyValuePair<string, string>[] = [
		{ key: 'a', value: 'Option A' },
		{ key: 'b', value: 'Option B' },
		{ key: 'c', value: 'Option C' }
	];

	function handleChange(value: string | number) {
		console.log('Selected:', value);
	}

	// Example 3: With Numbers
	let rating = $state(3);

	const entries3: KeyValuePair<number, string>[] = [
		{ key: 1, value: '⭐' },
		{ key: 2, value: '⭐⭐' },
		{ key: 3, value: '⭐⭐⭐' },
		{ key: 4, value: '⭐⭐⭐⭐' },
		{ key: 5, value: '⭐⭐⭐⭐⭐' }
	];
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Button Group</h2>
		<p class="mb-4 text-sm opacity-70">Simple Yes/No selection</p>

		<ButtonGroup label="Confirm?" bind:value {entries} />

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected:</strong>
				{value}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: With Change Handler</h2>
		<p class="mb-4 text-sm opacity-70">Fires callback on selection change (check console)</p>

		<ButtonGroup
			label="Choose an option"
			bind:value={selectedValue}
			entries={entries2}
			onchange={handleChange}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected:</strong>
				{selectedValue}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: With Numbers</h2>
		<p class="mb-4 text-sm opacity-70">Using numeric values for ratings</p>

		<ButtonGroup label="Rate this" bind:value={rating} entries={entries3} />

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Rating:</strong>
				{rating} / 5
			</p>
		</div>
	</div>
</div>
