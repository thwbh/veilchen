<script lang="ts">
	import Step from '$lib/stepper/Step.svelte';
	import Stepper from '$lib/stepper/Stepper.svelte';

	let current = $state(1);

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
