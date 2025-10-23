<script lang="ts">
	import CircularProgress from '$lib/components/progress/CircularProgress.svelte';

	// Example 1: Basic Progress
	let progress1 = $state(65);

	// Example 2: Different Colors
	let progress2 = $state(30);
	let progress3 = $state(75);
	let progress4 = $state(100);

	// Example 3: Different Sizes
	let progress5 = $state(50);

	// Example 4: Custom Content
	let progress6 = $state(42);

	// Example 5: Interactive Progress
	let progress7 = $state(0);

	function startProgress() {
		progress7 = 0;
		const interval = setInterval(() => {
			progress7 += 1;
			if (progress7 >= 100) {
				clearInterval(interval);
			}
		}, 30);
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Circular Progress</h2>
		<p class="mb-4 text-sm opacity-70">Default progress indicator</p>

		<div class="flex items-center gap-4">
			<CircularProgress value={progress1}>
				<span class="text-lg font-bold">{progress1}%</span>
			</CircularProgress>

			<div>
				<input type="range" min="0" max="100" bind:value={progress1} class="range range-primary" />
				<div class="text-sm opacity-70">Adjust value: {progress1}%</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Different Colors</h2>
		<p class="mb-4 text-sm opacity-70">Using DaisyUI color classes</p>

		<div class="flex flex-wrap gap-8">
			<div class="flex flex-col items-center gap-2">
				<CircularProgress value={progress2} color="text-primary">
					<span class="text-sm">{progress2}%</span>
				</CircularProgress>
				<span class="text-xs opacity-70">Primary</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<CircularProgress value={progress3} color="text-success">
					<span class="text-sm">{progress3}%</span>
				</CircularProgress>
				<span class="text-xs opacity-70">Success</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<CircularProgress value={progress4} color="text-warning">
					<span class="text-sm">{progress4}%</span>
				</CircularProgress>
				<span class="text-xs opacity-70">Warning</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<CircularProgress value={50} color="text-error">
					<span class="text-sm">50%</span>
				</CircularProgress>
				<span class="text-xs opacity-70">Error</span>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Different Sizes</h2>
		<p class="mb-4 text-sm opacity-70">Customizable size using CSS values</p>

		<div class="flex flex-wrap items-center gap-8">
			<CircularProgress value={progress5} size="3rem">
				<span class="text-xs">{progress5}%</span>
			</CircularProgress>

			<CircularProgress value={progress5} size="5rem">
				<span class="text-sm">{progress5}%</span>
			</CircularProgress>

			<CircularProgress value={progress5} size="8rem">
				<span class="text-2xl font-bold">{progress5}%</span>
			</CircularProgress>

			<CircularProgress value={progress5} size="10rem">
				<span class="text-3xl font-bold">{progress5}%</span>
			</CircularProgress>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Custom Content</h2>
		<p class="mb-4 text-sm opacity-70">Display custom content inside the circle</p>

		<div class="flex flex-wrap gap-8">
			<CircularProgress value={progress6} size="8rem" color="text-accent">
				<div class="flex flex-col items-center">
					<span class="text-3xl font-bold">{progress6}</span>
					<span class="text-xs opacity-70">Tasks</span>
				</div>
			</CircularProgress>

			<CircularProgress value={85} size="8rem" color="text-success">
				<div class="flex flex-col items-center">
					<span class="text-2xl">✓</span>
					<span class="text-sm font-bold">85%</span>
					<span class="text-xs opacity-70">Complete</span>
				</div>
			</CircularProgress>

			<CircularProgress value={15} size="8rem" color="text-warning">
				<div class="flex flex-col items-center">
					<span class="text-2xl">⚠️</span>
					<span class="text-sm font-bold">15%</span>
					<span class="text-xs opacity-70">Low</span>
				</div>
			</CircularProgress>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Animated Progress</h2>
		<p class="mb-4 text-sm opacity-70">Click to start progress animation</p>

		<div class="flex items-center gap-4">
			<CircularProgress value={progress7} size="8rem" color="text-info">
				<span class="text-2xl font-bold">{progress7}%</span>
			</CircularProgress>

			<button
				class="btn btn-primary"
				onclick={startProgress}
				disabled={progress7 > 0 && progress7 < 100}
			>
				{progress7 === 100 ? 'Complete!' : progress7 > 0 ? 'Loading...' : 'Start Progress'}
			</button>
		</div>
	</div>
</div>
