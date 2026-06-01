<script lang="ts">
	import SearchBar from '$lib/components/input/SearchBar.svelte';
import { InputSize } from '$lib/enum/enum.js';

	// Example 1: Basic search
	let query1 = $state('');

	// Example 2: Debounced search
	let query2 = $state('');
	let searchCount = $state(0);

	// Example 3: Clearable with callback
	let query3 = $state('');

	// Example 4: Suffix slot (result count)
	let query4 = $state('');
	const exercises = [
		'Push-ups',
		'Squats',
		'Plank',
		'Jumping Jacks',
		'Lunges',
		'Deadlift',
		'Bench Press',
		'Burpees',
		'Dumbbell Curl',
		'Shoulder Press'
	];

	let filtered = $derived(
		query4.length > 0
			? exercises.filter(e => e.toLowerCase().includes(query4.toLowerCase()))
			: []
	);

	// Example 5: Size variants
	let query5 = $state('');
	let query6 = $state('');
	let query7 = $state('');
	let query8 = $state('');

	// Example 6: Color variants
	let query9 = $state('');
	let query10 = $state('');
	let query11 = $state('');

	function handleSearch2(_q: string) {
		searchCount += 1;
	}

	function handleClear3() {
		console.log('Search cleared!');
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-4 text-3xl font-bold">SearchBar Examples</h1>
	<p class="mb-2 text-sm opacity-70">
		A headless search input component with magnifier icon, clear button, and optional debounce.
		The consumer handles filtering and displaying results.
	</p>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Search</h2>
		<p class="mb-4 text-sm opacity-70">Simple search input with two-way binding</p>

		<SearchBar
			bind:value={query1}
			placeholder="Search..."
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Query:</strong>
				{query1 || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Debounced Search</h2>
		<p class="mb-4 text-sm opacity-70">Search fires 300ms after the user stops typing</p>

		<SearchBar
			bind:value={query2}
			placeholder="Type to search (debounced)..."
			debounce={300}
			onsearch={handleSearch2}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Query:</strong>
				{query2 || '(empty)'}
			</p>
			<p class="mt-1 text-xs opacity-70">
				Search events fired: <strong>{searchCount}</strong>
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Clear Callback</h2>
		<p class="mb-4 text-sm opacity-70">Fires a custom callback when the clear button is clicked</p>

		<SearchBar
			bind:value={query3}
			placeholder="Type to search..."
			onclear={handleClear3}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Query:</strong>
				{query3 || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Suffix Slot — Result Count</h2>
		<p class="mb-4 text-sm opacity-70">Use the children slot to display result count (exercise library)</p>

		<SearchBar
			bind:value={query4}
			placeholder="Search exercises..."
		>
			{#if filtered.length > 0}
				<span class="text-xs opacity-70">{filtered.length} results</span>
			{:else if query4.length > 0}
				<span class="text-xs opacity-70">No results</span>
			{/if}
		</SearchBar>

		{#if filtered.length > 0}
			<ul class="mt-4 list-inside list-disc text-sm">
				{#each filtered as exercise}
					<li>{exercise}</li>
				{/each}
			</ul>
		{/if}

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Query:</strong>
				{query4 || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Input Sizes</h2>
		<p class="mb-4 text-sm opacity-70">xs, sm, md, lg size variants</p>

		<div class="flex flex-col gap-4">
			<div>
				<p class="mb-1 text-xs opacity-70">XS</p>
				<SearchBar
					bind:value={query5}
					placeholder="XS input..."
					inputSize={InputSize.XS}
				/>
			</div>
			<div>
				<p class="mb-1 text-xs opacity-70">SM</p>
				<SearchBar
					bind:value={query6}
					placeholder="SM input..."
					inputSize={InputSize.SM}
				/>
			</div>
			<div>
				<p class="mb-1 text-xs opacity-70">MD (default)</p>
				<SearchBar
					bind:value={query7}
					placeholder="MD input..."
					inputSize={InputSize.MD}
				/>
			</div>
			<div>
				<p class="mb-1 text-xs opacity-70">LG</p>
				<SearchBar
					bind:value={query8}
					placeholder="LG input..."
					inputSize={InputSize.LG}
				/>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Color Variants</h2>
		<p class="mb-4 text-sm opacity-70">DaisyUI color variants for the input</p>

		<div class="flex flex-col gap-4">
			<div>
				<p class="mb-1 text-xs opacity-70">Primary</p>
				<SearchBar
					bind:value={query9}
					placeholder="Primary..."
					color="primary"
				/>
			</div>
			<div>
				<p class="mb-1 text-xs opacity-70">Secondary</p>
				<SearchBar
					bind:value={query10}
					placeholder="Secondary..."
					color="secondary"
				/>
			</div>
			<div>
				<p class="mb-1 text-xs opacity-70">Accent</p>
				<SearchBar
					bind:value={query11}
					placeholder="Accent..."
					color="accent"
				/>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 7: Without Clear Button</h2>
		<p class="mb-4 text-sm opacity-70">Set clearable=false to hide the clear button</p>

		<SearchBar
			bind:value={query1}
			placeholder="Search without clear button..."
			clearable={false}
		/>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 8: With Custom Label</h2>
		<p class="mb-4 text-sm opacity-70">Accessible label for screen readers</p>

		<SearchBar
			bind:value={query1}
			label="Search exercises and workouts"
			placeholder="What are you looking for?"
		/>
	</div>
</div>
