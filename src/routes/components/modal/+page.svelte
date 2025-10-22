<script lang="ts">
	import ModalDialog from '$lib/components/modal/ModalDialog.svelte';

	let dialog: HTMLDialogElement;

	function handleConfirm() {
		console.log('Confirmed!');
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-2">ModalDialog Example</h1>
	<p class="text-sm opacity-70 mb-4">Customizable modal dialog with confirm/cancel actions</p>

	<button class="btn" onclick={() => dialog?.showModal()}>Open Dialog</button>
</div>

<ModalDialog bind:dialog onconfirm={handleConfirm}>
	{#snippet title()}
		<h3 class="font-bold text-lg">Confirm Action</h3>
	{/snippet}

	{#snippet content()}
		<p>Are you sure you want to proceed?</p>
	{/snippet}
</ModalDialog>
