<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		dialog?: HTMLDialogElement;
		title?: Snippet;
		content?: Snippet;
		footer?: Snippet;
		onconfirm?: () => void;
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
		<div class="dialog-header border-base-300 mb-2 pb-2">
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

<style>
	.dialog-header {
		@apply flex w-full grow items-center justify-between border-b border-dashed;
	}
</style>
