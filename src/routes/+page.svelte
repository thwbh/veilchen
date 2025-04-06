<script lang="ts">
	import { KeyValuePair } from '$lib/types/types.js';
	import RangeInput from '$lib/input/RangeInput.svelte';
	import ButtonGroup from '$lib/input/ButtonGroup.svelte';
	import Step from '$lib/stepper/Step.svelte';
	import Stepper from '$lib/stepper/Stepper.svelte';
	import Stack from '$lib/stack/Stack.svelte';
	import ValidatedInput from '$lib/input/ValidatedInput.svelte';

	let current = $state(1);

	let sliderValue = $state(40);
	let sliderStepValue = $state(0);

	const cardEntries = ['Card 1', 'Card 2', 'Card 3'];

	let segmentValue = $state('b');

	const passwordRegex = '';

	let emailValue = $state(null);
	let validatedValue = $state(null);
	let passwordValue = $state(null);
	let dateValue = $state(null);

	const segments = [
		new KeyValuePair('a', 'AAA'),
		new KeyValuePair('b', 'BBB'),
		new KeyValuePair('c', 'CCC')
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

	{segmentValue}

	<Stepper
		bind:currentStep={current}
		onnext={handleNextStep}
		onback={handleBackStep}
		onfinish={handleFinish}
		activeClass={'badge-primary'}
	>
		{#snippet step1()}
			<Step number={1} {current}>
				{#snippet header()}
					<header>Head 1</header>
				{/snippet}
				Content 1</Step
			>
		{/snippet}
		{#snippet step2()}
			<Step number={2} {current}>
				{#snippet header()}
					<header>Head 2</header>
				{/snippet}
				Content 2</Step
			>
		{/snippet}
		{#snippet step3()}
			<Step number={3} {current}>
				{#snippet header()}
					<header>Head 3</header>
				{/snippet}
				Content 3
			</Step>
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
		pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])"
		title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
	>
		Must be more than 8 characters, including
		<br />At least one number
		<br />At least one lowercase letter
		<br />At least one uppercase letter
	</ValidatedInput>

	<ValidatedInput
		bind:value={dateValue}
		label="Date"
		type="date"
		class="input validator"
		required
		placeholder="Pick a date in 2025"
		min="2025-01-01"
		max="2025-12-31"
		title="Must be valid URL"
	>
		Must be 2025
	</ValidatedInput>
</div>
