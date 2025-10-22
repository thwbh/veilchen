<script lang="ts">
	import ModalDialog from '$lib/components/modal/ModalDialog.svelte';
	import AlertBox from '$lib/components/alert/AlertBox.svelte';
	import { AlertType } from '$lib/enum/enum.js';

	// Example 1: Basic Confirmation Dialog
	let dialog1: HTMLDialogElement;
	let confirmResult = $state('');

	function handleConfirm1() {
		confirmResult = 'User confirmed the action';
		console.log('Confirmed!');
	}

	function handleCancel1() {
		confirmResult = 'User cancelled the action';
		console.log('Cancelled!');
	}

	// Example 2: Delete Confirmation with Custom Title
	let dialog2: HTMLDialogElement;
	let deleteResult = $state('');

	function handleDelete() {
		deleteResult = 'Item deleted successfully';
	}

	// Example 3: Form Dialog with Custom Content
	let dialog3: HTMLDialogElement;
	let userName = $state('');
	let userEmail = $state('');
	let formResult = $state('');

	function handleFormSubmit() {
		formResult = `Form submitted: ${userName} (${userEmail})`;
		userName = '';
		userEmail = '';
	}

	// Example 4: Custom Footer with Multiple Actions
	let dialog4: HTMLDialogElement;
	let actionResult = $state('');

	function handleSave() {
		actionResult = 'Changes saved';
		dialog4?.close();
	}

	function handleSaveAndClose() {
		actionResult = 'Changes saved and closed';
		dialog4?.close();
	}

	function handleDiscard() {
		actionResult = 'Changes discarded';
		dialog4?.close();
	}

	// Example 5: Info Dialog (No Actions Required)
	let dialog5: HTMLDialogElement;

	// Example 6: Long Content Dialog
	let dialog6: HTMLDialogElement;
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="text-3xl font-bold mb-2">ModalDialog Examples</h1>
	<p class="text-sm opacity-70 mb-4">
		Customizable modal dialogs with various configurations and use cases
	</p>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 1: Basic Confirmation Dialog</h2>
		<p class="text-sm opacity-70 mb-4">Standard confirm/cancel dialog with callbacks</p>

		<button class="btn btn-primary" onclick={() => dialog1?.showModal()}>
			Open Confirmation Dialog
		</button>

		{#if confirmResult}
			<div class="mt-4 p-4 bg-base-200 rounded-box">
				<p class="text-sm">{confirmResult}</p>
			</div>
		{/if}
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 2: Delete Confirmation</h2>
		<p class="text-sm opacity-70 mb-4">Warning dialog for destructive actions</p>

		<button class="btn btn-error" onclick={() => dialog2?.showModal()}>Delete Item</button>

		{#if deleteResult}
			<div class="mt-4">
				<AlertBox type={AlertType.Success}>{deleteResult}</AlertBox>
			</div>
		{/if}
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 3: Form Dialog</h2>
		<p class="text-sm opacity-70 mb-4">Dialog with form inputs</p>

		<button class="btn btn-secondary" onclick={() => dialog3?.showModal()}>Add User</button>

		{#if formResult}
			<div class="mt-4 p-4 bg-base-200 rounded-box">
				<p class="text-sm">{formResult}</p>
			</div>
		{/if}
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 4: Custom Footer with Multiple Actions</h2>
		<p class="text-sm opacity-70 mb-4">Dialog with custom footer snippet and multiple buttons</p>

		<button class="btn btn-accent" onclick={() => dialog4?.showModal()}>Edit Document</button>

		{#if actionResult}
			<div class="mt-4">
				<AlertBox type={AlertType.Info}>{actionResult}</AlertBox>
			</div>
		{/if}
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 5: Information Dialog</h2>
		<p class="text-sm opacity-70 mb-4">Simple informational dialog with custom close button</p>

		<button class="btn btn-info" onclick={() => dialog5?.showModal()}>Show Info</button>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="text-2xl font-bold mb-2">Example 6: Long Content Dialog</h2>
		<p class="text-sm opacity-70 mb-4">Dialog with scrollable content</p>

		<button class="btn" onclick={() => dialog6?.showModal()}>View Terms & Conditions</button>
	</div>
</div>

<!-- Example 1: Basic Confirmation Dialog -->
<ModalDialog bind:dialog={dialog1} onconfirm={handleConfirm1} oncancel={handleCancel1}>
	{#snippet title()}
		<h3 class="font-bold text-lg">Confirm Action</h3>
	{/snippet}

	{#snippet content()}
		<p>Are you sure you want to proceed with this action?</p>
		<p class="text-sm opacity-70 mt-2">This will make changes to your account.</p>
	{/snippet}
</ModalDialog>

<!-- Example 2: Delete Confirmation -->
<ModalDialog bind:dialog={dialog2} onconfirm={handleDelete}>
	{#snippet title()}
		<h3 class="font-bold text-lg text-error">⚠️ Delete Item</h3>
	{/snippet}

	{#snippet content()}
		<AlertBox type={AlertType.Warning}>
			<strong>Warning:</strong>
			<span>This action cannot be undone.</span>
		</AlertBox>
		<p class="mt-4">Are you sure you want to permanently delete this item?</p>
	{/snippet}
</ModalDialog>

<!-- Example 3: Form Dialog -->
<ModalDialog bind:dialog={dialog3} onconfirm={handleFormSubmit}>
	{#snippet title()}
		<h3 class="font-bold text-lg">Add New User</h3>
	{/snippet}

	{#snippet content()}
		<div class="flex flex-col gap-4">
			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Name</span>
				</div>
				<input
					type="text"
					placeholder="John Doe"
					class="input input-bordered w-full"
					bind:value={userName}
				/>
			</label>

			<label class="form-control w-full">
				<div class="label">
					<span class="label-text">Email</span>
				</div>
				<input
					type="email"
					placeholder="john@example.com"
					class="input input-bordered w-full"
					bind:value={userEmail}
				/>
			</label>
		</div>
	{/snippet}
</ModalDialog>

<!-- Example 4: Custom Footer -->
<ModalDialog bind:dialog={dialog4}>
	{#snippet title()}
		<h3 class="font-bold text-lg">Unsaved Changes</h3>
	{/snippet}

	{#snippet content()}
		<p>You have unsaved changes in your document.</p>
		<p class="text-sm opacity-70 mt-2">What would you like to do?</p>
	{/snippet}

	{#snippet footer()}
		<button class="btn btn-primary" onclick={handleSave}>Save</button>
		<button class="btn btn-secondary" onclick={handleSaveAndClose}>Save & Close</button>
		<button class="btn btn-ghost" onclick={handleDiscard}>Discard Changes</button>
	{/snippet}
</ModalDialog>

<!-- Example 5: Info Dialog -->
<ModalDialog bind:dialog={dialog5}>
	{#snippet title()}
		<h3 class="font-bold text-lg">ℹ️ Information</h3>
	{/snippet}

	{#snippet content()}
		<AlertBox type={AlertType.Info}>
			<strong>Did you know?</strong>
			<span>You can customize the modal dialog with any content you want!</span>
		</AlertBox>
		<p class="mt-4">
			This modal demonstrates a simple informational dialog without requiring user confirmation.
		</p>
	{/snippet}

	{#snippet footer()}
		<button class="btn btn-primary" onclick={() => dialog5?.close()}>Got it!</button>
	{/snippet}
</ModalDialog>

<!-- Example 6: Long Content Dialog -->
<ModalDialog bind:dialog={dialog6}>
	{#snippet title()}
		<h3 class="font-bold text-lg">Terms & Conditions</h3>
	{/snippet}

	{#snippet content()}
		<div class="prose prose-sm max-h-96 overflow-y-auto">
			<h4>1. Introduction</h4>
			<p>
				Welcome to our service. By using this application, you agree to be bound by these terms and
				conditions.
			</p>

			<h4>2. User Responsibilities</h4>
			<p>
				Users are responsible for maintaining the confidentiality of their account information and
				for all activities that occur under their account.
			</p>

			<h4>3. Privacy Policy</h4>
			<p>
				We respect your privacy and are committed to protecting your personal data. Please review
				our privacy policy for more information.
			</p>

			<h4>4. Data Usage</h4>
			<p>
				By using our service, you consent to the collection and use of your data as described in
				our privacy policy.
			</p>

			<h4>5. Service Modifications</h4>
			<p>
				We reserve the right to modify or discontinue our service at any time without prior notice.
			</p>

			<h4>6. Limitation of Liability</h4>
			<p>
				We shall not be liable for any indirect, incidental, special, or consequential damages
				arising out of or in connection with our service.
			</p>

			<h4>7. Governing Law</h4>
			<p>These terms shall be governed by and construed in accordance with applicable laws.</p>

			<h4>8. Contact Information</h4>
			<p>For questions about these terms, please contact us through our support channels.</p>
		</div>
	{/snippet}

	{#snippet footer()}
		<button class="btn btn-primary" onclick={() => dialog6?.close()}>I Agree</button>
		<button class="btn btn-ghost" onclick={() => dialog6?.close()}>Close</button>
	{/snippet}
</ModalDialog>
