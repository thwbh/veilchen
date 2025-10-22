<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A modal dialog component with customizable content and actions.
	 * Provides default confirm/cancel buttons or custom footer.
	 */
	interface Props {
		/** Bindable reference to the dialog element for programmatic control */
		dialog?: HTMLDialogElement;
		/** Optional title snippet (defaults to "Please confirm") */
		title?: Snippet;
		/** Optional content snippet for the dialog body */
		content?: Snippet;
		/** Optional footer snippet (defaults to Confirm/Cancel buttons) */
		footer?: Snippet;
		/** Callback fired when confirm button is clicked */
		onconfirm?: () => void;
		/** Callback fired when cancel button is clicked */
		oncancel?: () => void;
	}

	let {
		dialog = $bindable(),
		title = undefined,
		content = undefined,
		footer = undefined,
		onconfirm = () => {},
		oncancel = () => {}
	}: Props = $props();

	const confirm = () => {
		onconfirm?.();

		dialog?.close();
	};

	const cancel = () => {
		oncancel?.();

		dialog?.close();
	};
</script>

<dialog bind:this={dialog} id="intake-modal" class="modal modal-bottom sm:modal-middle">
	<div class="modal-box flex flex-col gap-2">
		<div
			class="border-base-300 mb-2 flex w-full grow items-center justify-between border-b border-dashed pb-2"
		>
			{#if title}
				{@render title()}
			{:else}
				<span>Please confirm</span>
			{/if}
		</div>
		<div>
			{@render content?.()}
		</div>
		<div class="flex flex-col gap-2">
			{#if footer}
				{@render footer()}
			{:else}
				<button class="btn btn-primary" onclick={confirm}>Confirm</button>
				<button class="btn" onclick={cancel}>Cancel</button>
			{/if}
		</div>
	</div>
</dialog>
