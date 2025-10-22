<script lang="ts">
	import RangeInput from '$lib/components/input/RangeInput.svelte';

	// Example 1: Basic Range Input
	let volume = $state(50);

	// Example 2: With Steps and Custom Styling
	let brightness = $state(25);

	// Example 3: Temperature Control
	let temperature = $state(20);

	// Example 4: With Change Handler
	let zoom = $state(100);
	let zoomLog = $state<string[]>([]);

	function handleZoomChange(value: number) {
		zoomLog = [...zoomLog, `Zoom changed to ${value}%`].slice(-3);
	}

	// Example 5: Different Color Themes
	let bass = $state(5);
	let treble = $state(5);
	let mid = $state(5);

	// Example 6: Price Range
	let price = $state(500);
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-4">RangeInput Examples</h1>
	<p class="text-sm opacity-70 mb-2">
		Range input component with visual steps and text input for precise value entry
	</p>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 1: Basic Range Input</h2>
		<p class="text-sm opacity-70 mb-4">Simple volume slider with percentage unit</p>

		<RangeInput label="Volume" bind:value={volume} min={0} max={100} unit="%" />

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Current value:</strong>
				{volume}%
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 2: With Steps and Custom Styling</h2>
		<p class="text-sm opacity-70 mb-4">Brightness control with 25-unit steps and primary color</p>

		<RangeInput
			label="Brightness"
			bind:value={brightness}
			min={0}
			max={100}
			step={25}
			class="range-primary"
			unit="lux"
		/>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Current value:</strong>
				{brightness} lux
			</p>
			<p class="text-xs opacity-70 mt-1">Snaps to: 0, 25, 50, 75, 100</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 3: Temperature Control</h2>
		<p class="text-sm opacity-70 mb-4">Fine-grained control with smaller steps</p>

		<RangeInput
			label="Room Temperature"
			bind:value={temperature}
			min={15}
			max={30}
			step={0.5}
			class="range-secondary"
			unit="°C"
		/>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Current value:</strong>
				{temperature}°C
			</p>
			<p class="text-xs opacity-70 mt-1">
				{#if temperature < 18}
					Too cold
				{:else if temperature > 24}
					Too warm
				{:else}
					Comfortable temperature
				{/if}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 4: With Change Handler</h2>
		<p class="text-sm opacity-70 mb-4">Zoom control that logs changes</p>

		<RangeInput
			label="Zoom Level"
			bind:value={zoom}
			min={50}
			max={200}
			step={10}
			class="range-accent"
			unit="%"
			onchange={handleZoomChange}
		/>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Current value:</strong>
				{zoom}%
			</p>
			<div class="mt-2">
				<p class="text-xs font-bold">Recent changes:</p>
				{#if zoomLog.length > 0}
					<ul class="text-xs opacity-70 list-disc list-inside">
						{#each zoomLog as log}
							<li>{log}</li>
						{/each}
					</ul>
				{:else}
					<p class="text-xs opacity-70">No changes yet</p>
				{/if}
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 5: Multiple Ranges with Different Colors</h2>
		<p class="text-sm opacity-70 mb-4">Audio equalizer with bass, mid, and treble controls</p>

		<div class="space-y-4">
			<RangeInput label="Bass" bind:value={bass} min={0} max={10} class="range-error" />

			<RangeInput label="Mid" bind:value={mid} min={0} max={10} class="range-warning" />

			<RangeInput label="Treble" bind:value={treble} min={0} max={10} class="range-success" />
		</div>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>EQ Settings:</strong>
			</p>
			<div class="grid grid-cols-3 gap-2 mt-2 text-xs">
				<div>Bass: {bass}</div>
				<div>Mid: {mid}</div>
				<div>Treble: {treble}</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 6: Wide Range with Unit</h2>
		<p class="text-sm opacity-70 mb-4">Budget/price selector with larger range</p>

		<RangeInput
			label="Maximum Price"
			bind:value={price}
			min={0}
			max={2000}
			step={50}
			class="range-info"
			unit="€"
		/>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Budget:</strong>
				{price}€
			</p>
			<p class="text-xs opacity-70 mt-1">
				{#if price < 500}
					Budget range
				{:else if price < 1000}
					Mid-range
				{:else if price < 1500}
					Premium range
				{:else}
					Luxury range
				{/if}
			</p>
		</div>
	</div>
</div>
