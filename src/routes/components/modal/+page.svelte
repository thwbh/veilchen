<script lang="ts">
	import ValidatedInput from '$lib/components/input/ValidatedInput.svelte';
	import ModalDialog from '$lib/components/modal/ModalDialog.svelte';

	let confirmationValue = $state();

	let confirmDialog: HTMLDialogElement | undefined = $state();
	let customHeaderDialog: HTMLDialogElement | undefined = $state();
	let customContentDialog: HTMLDialogElement | undefined = $state();
	let customButtonDialog: HTMLDialogElement | undefined = $state();

	let customContentValue = $state(-3);
	let customButtonValue = $state(50);

	let deleteMode = $state(false);
</script>

<div class="flex flex-col gap-4 p-4">
	<div class="flex flex-col">
		<strong>Default Dialog</strong>

		<button class="btn" onclick={() => confirmDialog?.show()}>Open Confirmation</button>
	</div>

	<div class="flex flex-col">
		<strong>Custom Header</strong>
		<button class="btn" onclick={() => customHeaderDialog?.show()}>Open</button>
	</div>

	<div class="flex flex-col">
		<strong>Custom Content</strong>
		<button class="btn" onclick={() => customContentDialog?.show()}>Open</button>
	</div>

	<div class="flex flex-col">
		<strong>Custom Buttons</strong>
		<button class="btn" onclick={() => customButtonDialog?.show()}>Open</button>
	</div>

	<span>
		{confirmationValue}
	</span>
</div>

<ModalDialog
	bind:dialog={confirmDialog}
	onconfirm={() => (confirmationValue = 'confirmation')}
	oncancel={() => (confirmationValue = 'cancelled')}
/>

<ModalDialog
	bind:dialog={customHeaderDialog}
	onconfirm={() => (confirmationValue = 'custom confirmation')}
	oncancel={() => (confirmationValue = 'custom cancellation')}
>
	{#snippet title()}
		<span>Custom title</span>
		<span class="text-xs">Aligned</span>
	{/snippet}
</ModalDialog>

<ModalDialog
	bind:dialog={customContentDialog}
	onconfirm={() => (confirmationValue = `custom content: entered value: ${customContentValue}`)}
	oncancel={() => (confirmationValue = 'custom content cancellation')}
>
	{#snippet title()}
		<span>Edit data</span>
		<span class="text-xs opacity-60">Created: 2025-01-01</span>
	{/snippet}

	{#snippet content()}
		<fieldset>
			<ValidatedInput
				bind:value={customContentValue}
				label="Amount"
				unit="€"
				type="number"
				min={0}
				max={100}
				errorInline={true}
			>
				Must be between 0 - 100
			</ValidatedInput>
		</fieldset>
	{/snippet}
</ModalDialog>

<ModalDialog
	bind:dialog={customButtonDialog}
	onconfirm={() => (confirmationValue = 'custom button confirmation')}
	oncancel={() => (confirmationValue = 'custom button cancellation')}
>
	{#snippet title()}
		<span>Edit data</span>
		<button onclick={() => (deleteMode = true)} class="btn btn-xs btn-error">Delete</button>
	{/snippet}

	{#snippet content()}
		<fieldset>
			<ValidatedInput
				bind:value={customButtonValue}
				label="Amount"
				unit="€"
				type="number"
				min={0}
				max={100}
				errorInline={true}
				disabled={deleteMode}
			>
				Must be between 0 - 100
			</ValidatedInput>
		</fieldset>
	{/snippet}

	{#snippet footer()}
		{#if !deleteMode}
			<button
				onclick={() => (confirmationValue = `custom button entered value: ${customButtonValue}`)}
				class="btn btn-primary">Save</button
			>
		{:else}
			<button
				onclick={() => {
					confirmationValue = 'custom button delete';
					customButtonDialog?.close();
					deleteMode = false;
				}}
				class="btn btn-error">Delete</button
			>
		{/if}
		<button
			onclick={() => {
				confirmationValue = 'custom button cancellation';
				customButtonDialog?.close();
				deleteMode = false;
			}}
			class="btn">Cancel</button
		>
	{/snippet}
</ModalDialog>
