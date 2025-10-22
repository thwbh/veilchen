<script lang="ts">
	import AlertBox from '$lib/components/alert/AlertBox.svelte';
	import { AlertType } from '$lib/enum/enum.js';
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-2">AlertBox Examples</h1>
	<p class="text-sm opacity-70 mb-4">Alert messages with different severity types</p>

	<div>
		<h2 class="text-xl font-bold mb-2">Success Alert</h2>
		<AlertBox type={AlertType.Success}>
			<strong>Success!</strong>
			<span>Your changes have been saved.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="text-xl font-bold mb-2">Warning Alert with Custom Class</h2>
		<AlertBox type={AlertType.Warning} class="alert-soft">
			<strong>Warning:</strong>
			<span>Please review your input.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="text-xl font-bold mb-2">Info Alert</h2>
		<AlertBox type={AlertType.Info}>
			<strong>Info:</strong>
			<span>New features are available in version 2.0.</span>
		</AlertBox>
	</div>

	<div>
		<h2 class="text-xl font-bold mb-2">Error Alert</h2>
		<AlertBox type={AlertType.Error}>
			<strong>Error:</strong>
			<span>An error occurred. Please try again later.</span>
		</AlertBox>
	</div>
</div>
