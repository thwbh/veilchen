<script lang="ts">
	import ButtonGroup from '$lib/components/control/ButtonGroup.svelte';
	import { InputSize } from '$lib/index.js';
	import { onMount } from 'svelte';

	// Example 1: Basic usage
	let basicValue = $state('option2');

	// Example 2: Mobile-optimized with swipe
	let mobileValue = $state('week');

	// Example 3: Different sizes
	let sizeValue = $state('md');

	// Example 4: Numeric keys
	let ratingValue = $state(3);

	const timePeriods = [
		{ key: 'day', value: 'Day' },
		{ key: 'week', value: 'Week' },
		{ key: 'month', value: 'Month' },
		{ key: 'year', value: 'Year' }
	];

	const sizes = [
		{ key: 'sm', value: 'Small' },
		{ key: 'md', value: 'Medium' },
		{ key: 'lg', value: 'Large' }
	];

	const yesNoOptions = [
		{ key: 'yes', value: 'Yes' },
		{ key: 'no', value: 'No' },
		{ key: 'maybe', value: 'Maybe' }
	];

	const ratings = [
		{ key: 1, value: '⭐' },
		{ key: 2, value: '⭐⭐' },
		{ key: 3, value: '⭐⭐⭐' },
		{ key: 4, value: '⭐⭐⭐⭐' },
		{ key: 5, value: '⭐⭐⭐⭐⭐' }
	];

	const colors = [
		{ key: 'primary', value: 'Primary' },
		{ key: 'secondary', value: 'Secondary' },
		{ key: 'accent', value: 'Accent' }
	];

	// Mobile detection for demo purposes
	let isMobile = $state(false);

	onMount(() => {
		// Simple mobile detection
		isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
	});
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">ButtonGroup Examples</h1>
	<p class="mb-4 text-sm opacity-70">Segmented control component with mobile optimizations</p>

	<!-- Example 1: Basic -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Usage</h2>
		<p class="mb-4 text-sm opacity-70">Standard segmented control</p>

		<ButtonGroup
			label="Select an option"
			bind:value={basicValue}
			entries={[
				{ key: 'option1', value: 'Option 1' },
				{ key: 'option2', value: 'Option 2' },
				{ key: 'option3', value: 'Option 3' }
			]}
		/>

		<div class="mt-2 text-sm opacity-70">
			Selected: <strong>{basicValue}</strong>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 2: Mobile with Swipe -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Mobile with Swipe</h2>
		<p class="mb-4 text-sm opacity-70">Swipe left/right to navigate (mobile only)</p>

		<ButtonGroup
			label="Time Period"
			bind:value={mobileValue}
			entries={timePeriods}
			swipeable
			size={InputSize.LG}
		/>

		<div class="mt-2 text-sm opacity-70">
			Selected: <strong>{mobileValue}</strong>
			{isMobile ? ' 📱 Swipe gestures enabled' : ' 🖥️ Swipe gestures work on touch devices'}
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 3: Size Variants -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Size Variants</h2>
		<p class="mb-4 text-sm opacity-70">Different sizes for various use cases</p>

		<div class="flex flex-col gap-4">
			<ButtonGroup label="Small Size" bind:value={sizeValue} entries={sizes} size={InputSize.SM} />

			<ButtonGroup
				label="Medium Size (default)"
				bind:value={sizeValue}
				entries={sizes}
				size={InputSize.MD}
			/>

			<ButtonGroup label="Large Size" bind:value={sizeValue} entries={sizes} size={InputSize.LG} />
		</div>

		<div class="mt-2 text-sm opacity-70">
			Selected: <strong>{sizeValue}</strong>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 4: Numeric Keys -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Numeric Keys</h2>
		<p class="mb-4 text-sm opacity-70">Using numbers as keys for ratings</p>

		<ButtonGroup label="Rating" bind:value={ratingValue} entries={ratings} size={InputSize.LG} />

		<div class="mt-2 text-sm opacity-70">
			Selected: <strong>{ratingValue} stars</strong>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Mobile Features Summary -->
	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 text-lg font-bold">📱 Mobile Features</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-80">
			<li><strong>Large touch targets:</strong> Minimum 48px height for easy tapping</li>
			<li><strong>Swipe gestures:</strong> Swipe left/right to navigate options</li>
			<li><strong>Haptic feedback:</strong> Subtle vibration on selection</li>
			<li><strong>Visual feedback:</strong> Scale animation on touch</li>
			<li><strong>Responsive sizing:</strong> Three size variants (sm/md/lg)</li>
			<li><strong>Accessibility:</strong> Proper ARIA attributes and touch targets</li>
		</ul>
	</div>
</div>
