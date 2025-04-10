<script lang="ts">
	import { KeyValuePair } from '$lib/types/types.js';
	import RangeInput from '$lib/input/RangeInput.svelte';
	import ButtonGroup from '$lib/input/ButtonGroup.svelte';
	import Stepper from '$lib/stepper/Stepper.svelte';
	import Stack from '$lib/stack/Stack.svelte';
	import ValidatedInput from '$lib/input/ValidatedInput.svelte';
	import AlertBox from '$lib/alert/AlertBox.svelte';

	let current = $state(1);

	let sliderValue = $state(40);
	let sliderStepValue = $state(0);

	const cardEntries = ['Card 1', 'Card 2', 'Card 3'];

	let segmentValue = $state('b');
	let segmentNumberValue = $state(1.5);

	const passwordRegex = '';

	let emailValue = $state(null);
	let validatedValue = $state(null);
	let passwordValue = $state(null);
	let dateValue = $state(new Date());
	let numberValue = $state(0);

	const segments = [
		new KeyValuePair('a', 'AAA'),
		new KeyValuePair('b', 'BBB'),
		new KeyValuePair('c', 'CCC')
	];

	const numberSegments = [
		new KeyValuePair(1, '111'),
		new KeyValuePair(1.5, '1.5'),
		new KeyValuePair(5, '555')
	];

	const handleNextStep = () => {
		console.log('next!');
	};

	const handleBackStep = () => {
		console.log('back!');
	};

	const handleFinish = () => {
		console.log('finish!');
	};
</script>

<div class="flex flex-col gap-4 p-4">
	<AlertBox>
		{#snippet icon()}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="stroke-info h-6 w-6 shrink-0"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				></path>
			</svg>
		{/snippet}

		<strong>Attention!</strong>
		<span>Free beer at 5pm.</span>
	</AlertBox>

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

	<ButtonGroup bind:value={segmentValue} entries={segments} />

	<ButtonGroup bind:value={segmentValue} entries={segments} label={'Choose'} />

	<ButtonGroup bind:value={segmentNumberValue} entries={numberSegments} label="Numbers" />

	{segmentNumberValue}

	{typeof segmentNumberValue === 'number'}

	{segmentValue}

	<Stepper
		bind:currentStep={current}
		onnext={handleNextStep}
		onback={handleBackStep}
		onfinish={handleFinish}
		activeClass={'badge-primary'}
	>
		{#snippet step1()}
			<div>
				<strong>Header 1</strong>
				<span>Content 1</span>
			</div>
		{/snippet}
		{#snippet step2()}
			<div>
				<strong>Header 2</strong>
				<span>Content 2</span>
			</div>
		{/snippet}
		{#snippet step3()}
			<div>
				<strong>Header 3</strong>
				<span>Content 3</span>
			</div>
		{/snippet}
		{#snippet step4()}
			<div>
				<strong>Header 4</strong>
				<span>Content 4</span>
			</div>
		{/snippet}
	</Stepper>

	<Stack size={cardEntries.length}>
		{#snippet card(index: number)}
			<div class="bg-primary text-primary-content rounded-box grid place-content-center">
				<p>index {index}</p>
				<p>
					{cardEntries[index]}
				</p>
			</div>
		{/snippet}
	</Stack>

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
	>
		Must be in range 0..10
	</ValidatedInput>
</div>
