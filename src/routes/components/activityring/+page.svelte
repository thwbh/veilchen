<script lang="ts">
	import ActivityRing from '$lib/components/activity/ActivityRing.svelte';
	import { onMount } from 'svelte';

	// Example 1: Basic ring with steps
	let steps = $state(4200);
	let stepsGoal = $state(6000);

	// Example 2: Apple-style activity rings
	let moveProgress = $state(560);
	let exerciseProgress = $state(35);
	let standProgress = $state(10);

	function animateProgress() {
		if (moveProgress < 560) moveProgress += 10;
		if (exerciseProgress < 35) exerciseProgress += 1;
		if (standProgress < 10) standProgress += 1;
	}

	let animationRef = $state<number | undefined>(undefined);

	function startProgressLoop() {
		moveProgress = 0;
		exerciseProgress = 0;
		standProgress = 0;
		animationRef = setInterval(() => {
			if (moveProgress >= 560 && exerciseProgress >= 35 && standProgress >= 10) {
				clearInterval(animationRef);
				return;
			}
			animateProgress();
		}, 50);
	}

	onMount(() => {
		startProgressLoop();
		return () => {
			if (animationRef) clearInterval(animationRef);
		};
	});
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Activity Ring Examples</h1>
	<p class="mb-4 text-sm opacity-70">
		Concentric progress rings inspired by Apple Watch activity rings
	</p>

	<!-- Example 1: Basic -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Ring</h2>
		<p class="mb-4 text-sm opacity-70">Single ring with adjustable progress</p>

		<div class="flex flex-wrap items-center gap-8">
			<ActivityRing
				rings={[{ key: 'move', label: 'Move', current: steps, goal: stepsGoal, color: 'rose' }]}
				label={Math.round(steps).toString()}
				subtitle="steps"
			/>

			<div class="flex flex-col gap-3">
				<div>
					<label for="current-steps" class="label-text text-sm opacity-70">Current: {steps}</label>
					<input
						id="current-steps"
						type="range"
						min="0"
						max={stepsGoal}
						bind:value={steps}
						class="range range-primary"
					/>
				</div>
				<div>
					<label for="goal-steps" class="label-text text-sm opacity-70">Goal: {stepsGoal}</label>
					<input
						id="goal-steps"
						type="range"
						min="100"
						max="10000"
						bind:value={stepsGoal}
						class="range range-primary"
					/>
				</div>
				<div class="flex gap-2">
					<button class="btn btn-sm btn-primary" onclick={() => (steps = stepsGoal)}>
						Complete
					</button>
					<button class="btn btn-sm btn-ghost" onclick={() => (steps = 0)}> Reset </button>
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 2: Multiple rings -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Multiple Rings</h2>
		<p class="mb-4 text-sm opacity-70">Three-ring layout with legend — animated on mount</p>

		<div class="flex flex-wrap items-center gap-8">
			<ActivityRing
				size="xl"
				label="1,247"
				subtitle="calories"
				rings={[
					{
						key: 'move',
						label: 'Move',
						current: moveProgress,
						goal: 600,
						color: 'rose'
					},
					{
						key: 'exercise',
						label: 'Exercise',
						current: exerciseProgress,
						goal: 60,
						color: 'emerald'
					},
					{
						key: 'stand',
						label: 'Stand',
						current: standProgress,
						goal: 12,
						color: 'amber'
					}
				]}
			/>

			<div class="flex flex-col gap-3">
				<p class="text-sm opacity-70">
					Watch the rings animate on mount. Click to restart the animation.
				</p>
				<button class="btn btn-primary" onclick={startProgressLoop}> Restart Animation </button>
				<div class="text-sm opacity-70">
					<div>Move: {Math.round(moveProgress)} / 600</div>
					<div>Exercise: {Math.round(exerciseProgress)} / 60</div>
					<div>Stand: {Math.round(standProgress)} / 12</div>
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Size Variants</h2>
		<p class="mb-4 text-sm opacity-70">Compare small to extra-large</p>

		<div class="flex flex-wrap items-center justify-around gap-8">
			<div class="flex flex-col items-center gap-2">
				<ActivityRing
					rings={[{ key: 'a', label: 'A', current: 400, goal: 600, color: 'primary' }]}
					label="400"
					size="sm"
				/>
				<span class="text-xs opacity-70">Small (96px)</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<ActivityRing
					rings={[{ key: 'a', label: 'A', current: 400, goal: 600, color: 'primary' }]}
					label="400"
					size="md"
				/>
				<span class="text-xs opacity-70">Medium (140px)</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<ActivityRing
					rings={[{ key: 'a', label: 'A', current: 400, goal: 600, color: 'primary' }]}
					label="400"
					size="lg"
				/>
				<span class="text-xs opacity-70">Large (196px)</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<ActivityRing
					rings={[{ key: 'a', label: 'A', current: 400, goal: 600, color: 'primary' }]}
					label="400"
					size="xl"
				/>
				<span class="text-xs opacity-70">Extra Large (260px)</span>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 4: Show/hide center -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Center Visibility</h2>
		<p class="mb-4 text-sm opacity-70">Toggle the center label display</p>

		<div class="flex flex-wrap items-center gap-8">
			<ActivityRing
				rings={[{ key: 'a', label: 'With Center', current: 750, goal: 1000, color: 'info' }]}
				label="750"
				showCenter
			/>

			<ActivityRing
				rings={[{ key: 'b', label: 'Without Center', current: 750, goal: 1000, color: 'info' }]}
				label="750"
				showCenter={false}
			/>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 5: Color options -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Color Options</h2>
		<p class="mb-4 text-sm opacity-70">DaisyUI color names and hex values</p>

		<div class="flex flex-wrap items-center gap-8">
			<ActivityRing
				rings={[
					{ key: 'a', label: 'Primary', current: 800, goal: 1000, color: 'primary' },
					{ key: 'b', label: 'Secondary', current: 600, goal: 1000, color: 'secondary' }
				]}
				label="800"
				size="lg"
			/>

			<ActivityRing
				rings={[
					{ key: 'a', label: 'Hex #ff6b6b', current: 700, goal: 1000, color: '#ff6b6b' },
					{ key: 'b', label: 'Hex #4ecdc4', current: 500, goal: 1000, color: '#4ecdc4' }
				]}
				label="700"
				size="lg"
			/>
		</div>
	</div>

	<div class="divider"></div>

	<!-- Example 6: With children -->
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Custom Footer</h2>
		<p class="mb-4 text-sm opacity-70">Pass custom content via the children slot</p>

		<ActivityRing
			rings={[{ key: 'a', label: 'Goal', current: 4200, goal: 6000, color: 'accent' }]}
			label="4,200"
			subtitle="calories"
			size="xl"
		>
			<div class="flex flex-col items-center gap-2 text-center">
				<span class="text-sm opacity-70">Target: 6,000 cal</span>
				<span class="text-success text-sm font-bold">1,800 cal remaining</span>
			</div>
		</ActivityRing>
	</div>
</div>
