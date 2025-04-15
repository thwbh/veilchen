<script lang="ts">
	import RangeInput from '$lib/components/input/RangeInput.svelte';
	import ValidatedInput from '$lib/components/input/ValidatedInput.svelte';

	let sliderValue = $state(40);
	let sliderStepValue = $state(0);
	let emailValue = $state(null);
	let passwordValue = $state(null);
	let numberValue = $state(0);
	let dateValue = $state();
	let validatedValue = $state();
	let unitValue = $state(100);
</script>

<div class="flex flex-col gap-4 p-4">
	<RangeInput label="Slider" bind:value={sliderValue} min={10} max={200} unit="Joule" />

	<RangeInput
		label="Stepped Slider"
		bind:value={sliderStepValue}
		min={0}
		max={3}
		step={0.25}
		unit="Tons"
		rangeClass={'range range-xs'}
	/>

	<ValidatedInput
		bind:value={emailValue}
		class="input validator"
		label="Validated Email"
		type="email"
		required={true}
		placeholder="mail@site.com"
	>
		Enter a valid email address
	</ValidatedInput>

	<ValidatedInput
		bind:value={validatedValue}
		label="Validated Input"
		type="text"
		placeholder="Validated Input"
		required={true}
		minlength={3}
		maxlength={30}
		title="Only letters, numbers or dash"
	>
		Must be 3 to 30 characters
		<br />containing only letters, numbers or dash
	</ValidatedInput>

	<ValidatedInput
		bind:value={passwordValue}
		label="Password"
		type="password"
		required
		placeholder="Password"
		minlength={8}
		pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){'{'}3{'}'}"
		title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
	>
		Must be more than 8 characters, including
		<br />At least one number
		<br />At least one lowercase letter
		<br />At least one uppercase letter
	</ValidatedInput>

	{dateValue}

	<ValidatedInput
		bind:value={dateValue}
		label="Date"
		type="date"
		class="input validator"
		required
		placeholder="Pick a date in 2025"
		min="2025-01-01"
		max="2025-12-31"
		title="Must be a date in 2025."
	>
		Must be a date in 2025.
	</ValidatedInput>

	<ValidatedInput
		bind:value={numberValue}
		label="Number"
		type="number"
		class="input validator"
		required
		placeholder="Insert a number."
		min="0"
		max="10"
		errorInline={true}
	>
		Must be in range 0..10
	</ValidatedInput>

	<ValidatedInput
		bind:value={unitValue}
		label="Number"
		type="number"
		required
		placeholder="Insert a number."
		min="100"
		max="1000"
		errorInline={true}
		unit="Mt"
	>
		Must be in range 100..1000
	</ValidatedInput>
</div>
