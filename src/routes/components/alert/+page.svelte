<script lang="ts">
	import AlertBox from '$lib/components/alert/AlertBox.svelte';
	import { AlertType } from '$lib/enum/enum.js';
</script>

<div class="flex flex-col gap-4 p-4">
	<AlertBox type={AlertType.Info} alertClass="alert-soft">
		<strong>Attention!</strong>
		<span>Free beer at 5pm.</span>
	</AlertBox>

	<AlertBox type={AlertType.Error} alertClass="alert-error alert-soft">
		<strong>Error!</strong>
		<span>An error occurred. Please try again later.</span>
	</AlertBox>

	<AlertBox type={AlertType.Warning} alertClass="alert-warning alert-soft">
		<strong>Warning!</strong>
		<span>This lake is populated by crocodiles. Proceed with caution.</span>
	</AlertBox>

	<AlertBox type={AlertType.Success} alertClass="alert-success alert-soft">
		<strong>Success!</strong>
		<span>Successfully intermingled flux capacitor with quantum loo.</span>
	</AlertBox>
</div>
