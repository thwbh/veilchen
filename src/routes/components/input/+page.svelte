<script lang="ts">
	import RangeInput from '$lib/components/input/RangeInput.svelte';
	import ValidatedInput from '$lib/components/input/ValidatedInput.svelte';

	// RangeInput Example 1: Basic Range Input
	let volume = $state(50);

	// RangeInput Example 2: With Steps and Custom Styling
	let brightness = $state(25);

	// ValidatedInput Example 1: Email Validation
	let email = $state('');

	// ValidatedInput Example 2: Password with Pattern
	let password = $state('');
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-4">RangeInput Examples</h1>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 1: Basic Range Input</h2>
		<p class="text-sm opacity-70 mb-4">Simple volume slider</p>

		<RangeInput label="Volume" bind:value={volume} min={0} max={100} unit="%" />

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Volume:</strong>
				{volume}%
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 2: With Steps and Custom Styling</h2>
		<p class="text-sm opacity-70 mb-4">Brightness control with 25-unit steps</p>

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
				<strong>Brightness:</strong>
				{brightness} lux
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<h1 class="text-3xl font-bold mb-4 mt-6">ValidatedInput Examples</h1>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 1: Email Validation</h2>
		<p class="text-sm opacity-70 mb-4">Built-in HTML5 email validation</p>

		<ValidatedInput
			bind:value={email}
			label="Email Address"
			type="email"
			required
			placeholder="your@email.com"
		>
			Please enter a valid email address
		</ValidatedInput>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Email:</strong>
				{email || '(empty)'}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 2: Password with Pattern</h2>
		<p class="text-sm opacity-70 mb-4">Complex validation with regex pattern</p>

		<ValidatedInput
			bind:value={password}
			label="Password"
			type="password"
			required
			minlength={8}
			pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{'}8,{'}'}"
		>
			Must be 8+ characters with uppercase, lowercase, and number
		</ValidatedInput>

		<div class="mt-4 p-4 bg-base-200 rounded-box">
			<p class="text-sm">
				<strong>Password length:</strong>
				{password.length} characters
			</p>
		</div>
	</div>
</div>
