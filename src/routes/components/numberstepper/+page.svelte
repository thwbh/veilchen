<script lang="ts">
	import NumberStepper from '$lib/components/input/NumberStepper.svelte';

	// Example 1: Basic Number Stepper
	let quantity = $state(0);

	// Example 2: Number Stepper with Limits
	let temperature = $state(20);

	// Example 3: Number Stepper with Custom Steps
	let weight = $state(70);

	// Example 4: Number Stepper with Unit
	let distance = $state(0);

	// Example 5: Number Stepper with Different Step Sizes
	let price = $state(100);

	// Example 6: Required Field with Validation
	let age = $state(0);
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-4 text-3xl font-bold">NumberStepper Examples</h1>
	<p class="mb-2 text-sm opacity-70">
		Number input with increment/decrement buttons and configurable step sizes via iOS-style wheel
		pickers
	</p>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Number Stepper</h2>
		<p class="mb-4 text-sm opacity-70">Simple quantity counter with default step sizes (1, 5, 10)</p>

		<NumberStepper bind:value={quantity} label="Quantity" min={0} />

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Current Value:</strong>
				{quantity}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Number Stepper with Limits</h2>
		<p class="mb-4 text-sm opacity-70">Temperature control with min/max constraints</p>

		<NumberStepper bind:value={temperature} label="Temperature" min={-10} max={40} unit="°C" />

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Temperature:</strong>
				{temperature}°C
			</p>
			<p class="mt-1 text-xs opacity-70">Range: -10°C to 40°C</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Number Stepper with Custom Steps</h2>
		<p class="mb-4 text-sm opacity-70">Weight adjustment with custom step sizes</p>

		<NumberStepper
			bind:value={weight}
			label="Body Weight"
			min={30}
			max={200}
			unit="kg"
			incrementSteps={[0.5, 1, 5, 10]}
			decrementSteps={[0.5, 1, 5, 10]}
			initialIncrementStep={1}
			initialDecrementStep={1}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Weight:</strong>
				{weight} kg
			</p>
			<p class="mt-1 text-xs opacity-70">
				Try clicking the step size buttons (-1, +1) to change the increment/decrement amount!
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Number Stepper with Large Steps</h2>
		<p class="mb-4 text-sm opacity-70">Distance tracker with larger increments</p>

		<NumberStepper
			bind:value={distance}
			label="Distance Traveled"
			min={0}
			unit="km"
			incrementSteps={[1, 10, 50, 100]}
			decrementSteps={[1, 10, 50, 100]}
			initialIncrementStep={10}
			initialDecrementStep={10}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Distance:</strong>
				{distance} km
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Price Adjuster</h2>
		<p class="mb-4 text-sm opacity-70">Different step sizes for increment and decrement</p>

		<NumberStepper
			bind:value={price}
			label="Price"
			min={0}
			unit="$"
			incrementSteps={[1, 5, 10, 25, 50, 100]}
			decrementSteps={[1, 5, 10, 25, 50]}
			initialIncrementStep={10}
			initialDecrementStep={5}
		/>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Price:</strong>
				${price}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Required Field</h2>
		<p class="mb-4 text-sm opacity-70">Number stepper with validation</p>

		<NumberStepper
			bind:value={age}
			label="Age"
			min={0}
			max={120}
			required
			incrementSteps={[1, 5, 10]}
			decrementSteps={[1, 5, 10]}
		>
			Age is required and must be between 0 and 120
		</NumberStepper>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Age:</strong>
				{age} years
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div class="bg-info/20 rounded-box p-4">
		<h3 class="mb-2 text-lg font-bold">How to Use:</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-80">
			<li>Click the minus (-) or plus (+) buttons to decrement/increment the value</li>
			<li>Click the step size buttons (e.g., "-1", "+5") to open the iOS-style wheel picker</li>
			<li>In the wheel picker, scroll or tap to select a different step size</li>
			<li>The selected step size will be used for subsequent increment/decrement operations</li>
			<li>You can also type directly into the number field</li>
		</ul>
	</div>
</div>
