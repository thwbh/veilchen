<script lang="ts">
	import Stepper from '$lib/components/stepper/Stepper.svelte';

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

<div class="flex flex-col gap-4 p-4">
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
</div>
