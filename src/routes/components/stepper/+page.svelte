<script lang="ts">
	import Stepper from '$lib/components/stepper/Stepper.svelte';

	let currentStep = $state(1);
	let stickyStep = $state(1);

	function handleNext() {
		console.log('Moving to next step');
	}

	function handleFinish() {
		console.log('Wizard completed!');
	}
</script>

<div class="flex flex-col gap-8 p-4">
	<div>
		<h1 class="mb-2 text-3xl font-bold">Stepper Examples</h1>
		<p class="mb-4 text-sm opacity-70">
			Multi-step wizard with progress indicator, smooth animations, and navigation controls
		</p>
	</div>

	<!-- Default Stepper -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Default Stepper</h2>
		<p class="mb-4 text-sm opacity-70">
			Standard stepper with animated transitions and dynamic content sizing
		</p>

		<Stepper
			bind:currentStep
			onnext={handleNext}
			onfinish={handleFinish}
			activeClass="badge-primary"
		>
			{#snippet step1()}
				<div class="p-4">
					<h3 class="mb-2 text-lg font-bold">Step 1: Personal Info</h3>
					<p class="mb-4">Enter your details here</p>
					<div class="form-control">
						<label class="label" for="name">
							<span class="label-text">Name</span>
						</label>
						<input id="name" type="text" placeholder="John Doe" class="input input-bordered" />
					</div>
				</div>
			{/snippet}

			{#snippet step2()}
				<div class="p-4">
					<h3 class="mb-2 text-lg font-bold">Step 2: Preferences</h3>
					<p class="mb-4">Set your preferences</p>
					<p class="text-sm opacity-70">
						This step has more content to demonstrate the smooth height transition animation!
					</p>
					<div class="form-control mt-4">
						<label class="label cursor-pointer">
							<span class="label-text">Enable notifications</span>
							<input type="checkbox" class="checkbox" />
						</label>
					</div>
				</div>
			{/snippet}

			{#snippet step3()}
				<div class="p-4">
					<h3 class="mb-2 text-lg font-bold">Step 3: Review</h3>
					<p>Review and confirm your information</p>
				</div>
			{/snippet}
		</Stepper>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Current step:</strong>
				{currentStep} of 3
			</p>
		</div>
	</section>

	<!-- Sticky Buttons Stepper -->
	<section>
		<h2 class="mb-4 text-2xl font-semibold">Sticky Buttons</h2>
		<p class="mb-4 text-sm opacity-70">
			Buttons stick to the bottom while content scrolls independently - perfect for long forms
		</p>

		<div class="border-base-300 rounded-box flex h-96 border-2 border-dashed">
			<Stepper
				bind:currentStep={stickyStep}
				onnext={handleNext}
				onfinish={handleFinish}
				activeClass="badge-secondary"
				stickyButtons={true}
			>
				{#snippet step1()}
					<div class="p-4">
						<h3 class="mb-2 text-lg font-bold">Step 1: Long Form</h3>
						<p class="mb-4">
							This step has a lot of content. Scroll down to see the buttons stay fixed at the
							bottom!
						</p>
						<div class="form-control mb-4">
							<label class="label" for="field1">
								<span class="label-text">Field 1</span>
							</label>
							<input id="field1" type="text" class="input input-bordered" />
						</div>
						<div class="form-control mb-4">
							<label class="label" for="field2">
								<span class="label-text">Field 2</span>
							</label>
							<input id="field2" type="text" class="input input-bordered" />
						</div>
						<div class="form-control mb-4">
							<label class="label" for="field3">
								<span class="label-text">Field 3</span>
							</label>
							<input id="field3" type="text" class="input input-bordered" />
						</div>
						<div class="form-control mb-4">
							<label class="label" for="field4">
								<span class="label-text">Field 4</span>
							</label>
							<textarea id="field4" class="textarea textarea-bordered" rows="4"></textarea>
						</div>
						<div class="form-control mb-4">
							<label class="label" for="field5">
								<span class="label-text">Field 5</span>
							</label>
							<input id="field5" type="text" class="input input-bordered" />
						</div>
						<div class="form-control mb-4">
							<label class="label" for="field6">
								<span class="label-text">Field 6</span>
							</label>
							<input id="field6" type="text" class="input input-bordered" />
						</div>
						<p class="text-sm opacity-70">
							Notice how the buttons remain accessible even with all this content!
						</p>
					</div>
				{/snippet}

				{#snippet step2()}
					<div class="p-4">
						<h3 class="mb-2 text-lg font-bold">Step 2: More Content</h3>
						<p class="mb-4">Another step with scrollable content</p>
						<div class="form-control mb-4">
							<label class="label" for="option1">
								<span class="label-text">Option 1</span>
							</label>
							<select id="option1" class="select select-bordered">
								<option>Choice A</option>
								<option>Choice B</option>
								<option>Choice C</option>
							</select>
						</div>
						<div class="form-control mb-4">
							<label class="label" for="option2">
								<span class="label-text">Option 2</span>
							</label>
							<input id="option2" type="text" class="input input-bordered" />
						</div>
						<div class="form-control mb-4">
							<label class="label" for="option3">
								<span class="label-text">Option 3</span>
							</label>
							<input id="option3" type="text" class="input input-bordered" />
						</div>
						<div class="prose">
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua.
							</p>
						</div>
					</div>
				{/snippet}

				{#snippet step3()}
					<div class="p-4">
						<h3 class="mb-2 text-lg font-bold">Step 3: Summary</h3>
						<p class="mb-4">Review your submission</p>
						<div class="bg-base-200 rounded-box p-4">
							<p class="text-sm">All fields completed successfully!</p>
						</div>
					</div>
				{/snippet}
			</Stepper>
		</div>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Sticky stepper - Current step:</strong>
				{stickyStep} of 3
			</p>
		</div>
	</section>

	<!-- Features Section -->
	<section class="bg-base-200 rounded-box p-6">
		<h2 class="mb-4 text-xl font-semibold">Features</h2>
		<ul class="list-inside list-disc space-y-2 text-sm">
			<li>Smooth slide animations for both content and step indicators</li>
			<li>Direction-aware animations (left/right based on navigation)</li>
			<li>Dynamic height transitions when content sizes change</li>
			<li>Keyboard navigation support (Arrow keys)</li>
			<li>Optional sticky buttons for long forms</li>
			<li>Customizable animation duration</li>
			<li>Active step badge styling</li>
		</ul>
	</section>
</div>
