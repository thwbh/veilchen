<script lang="ts">
	import Step from '$lib/stepper/Step.svelte';
	import Stepper from '$lib/stepper/Stepper.svelte';
	import Stack from '$lib/stack/Stack.svelte';

	let current = $state(1);

	const cardEntries = ['Card 1', 'Card 2', 'Card 3'];

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

<div class="flex flex-col p-4">
	<Stepper
		bind:currentStep={current}
		onnext={handleNextStep}
		onback={handleBackStep}
		onfinish={handleFinish}
	>
		{#snippet step1()}
			<Step number="1" {current}>Content 1</Step>
		{/snippet}
		{#snippet step2()}
			<Step number="2" {current}>Content 2</Step>
		{/snippet}
		{#snippet step3()}
			<Step number="3" {current}>Content 3</Step>
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
