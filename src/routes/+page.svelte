<script lang="ts">
	import { KeyValuePair } from '$lib/types/types.js';
	import RangeInput from '$lib/input/RangeInput.svelte';
	import ButtonGroup from '$lib/input/ButtonGroup.svelte';
	import Step from '$lib/stepper/Step.svelte';
	import Stepper from '$lib/stepper/Stepper.svelte';
	import Stack from '$lib/stack/Stack.svelte';

	let current = $state(1);

	let sliderValue = $state(40);
	let sliderStepValue = $state(0);

	const cardEntries = ['Card 1', 'Card 2', 'Card 3'];

	let segmentValue = $state('b');

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
	>
		{#snippet step1()}
			<Step number={1} {current}>Content 1</Step>
		{/snippet}
		{#snippet step2()}
			<Step number={2} {current}>Content 2</Step>
		{/snippet}
		{#snippet step3()}
			<Step number={3} {current}>Content 3</Step>
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
</div>
