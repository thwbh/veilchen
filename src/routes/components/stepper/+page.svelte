<script lang="ts">
	import Stepper from '$lib/components/stepper/Stepper.svelte';

	let currentStep = $state(1);

	function handleNext() {
		console.log('Moving to next step');
	}

	function handleFinish() {
		console.log('Wizard completed!');
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Stepper Example</h1>
	<p class="mb-4 text-sm opacity-70">
		Multi-step wizard with progress indicator and navigation controls
	</p>

	<Stepper bind:currentStep onnext={handleNext} onfinish={handleFinish} activeClass="badge-primary">
		{#snippet step1()}
			<div class="p-4">
				<h3 class="font-bold">Step 1: Personal Info</h3>
				<p>Enter your details here</p>
			</div>
		{/snippet}

		{#snippet step2()}
			<div class="p-4">
				<h3 class="font-bold">Step 2: Preferences</h3>
				<p>Set your preferences</p>
			</div>
		{/snippet}

		{#snippet step3()}
			<div class="p-4">
				<h3 class="font-bold">Step 3: Review</h3>
				<p>Review and confirm</p>
			</div>
		{/snippet}
	</Stepper>

	<div class="bg-base-200 rounded-box mt-4 p-4">
		<p class="text-sm">
			<strong>Current step:</strong>
			{currentStep} of 3
		</p>
	</div>
</div>
