<script lang="ts">
	import AlertBox from '$lib/components/alert/AlertBox.svelte';
	import { AlertType } from '$lib/enum/enum.js';
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">AlertBox Examples</h1>
	<p class="mb-4 text-sm opacity-70">Alert messages with different severity types</p>

	<div>
		<h2 class="mb-2 text-xl font-bold">Success Alert</h2>
		<AlertBox type={AlertType.Success}>
			<strong>Success!</strong>
			<span>Your changes have been saved.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Warning Alert</h2>
		<AlertBox type={AlertType.Warning}>
			<strong>Warning:</strong>
			<span>Please review your input.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Info Alert</h2>
		<AlertBox type={AlertType.Info}>
			<strong>Info:</strong>
			<span>New features are available in version 2.0.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Error Alert</h2>
		<AlertBox type={AlertType.Error}>
			<strong>Error:</strong>
			<span>An error occurred. Please try again later.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Warning Alert with Custom Class</h2>
		<AlertBox type={AlertType.Warning} class="alert-soft">
			<strong>Warning:</strong>
			<span>Please review your input.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Info Alert with dashed border</h2>
		<AlertBox type={AlertType.Info} class="border-neutral border-dashed">
			<strong>Info:</strong>
			<span>The border of this box is dashed.</span>
		</AlertBox>
	</div>
</div>
