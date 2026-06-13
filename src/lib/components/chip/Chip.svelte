<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A chip/tag component for displaying small informational badges.
	 * Can be interactive with remove functionality.
	 */
	interface Props {
		/** The text content of the chip */
		children: Snippet;
		/** Whether the chip can be removed */
		removable?: boolean;
		/** CSS class to apply to the chip */
		class?: string;
		/** Color variant of the chip */
		color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		/** Callback when chip is removed */
		onremove?: () => void;
	}

	let {
		children,
		removable = false,
		class: className = '',
		color = 'primary',
		onremove
	}: Props = $props();

	/**
	 * Handle remove button click
	 */
	function handleRemove(event: Event) {
		event.preventDefault();
		event.stopPropagation();
		if (onremove) {
			onremove();
		}
	}
</script>

<div
	class="badge badge-{color} gap-2 {className}"
	class:cursor-pointer={removable}
	class:hover:opacity-80={removable}
>
	{@render children()}
	{#if removable}
		<button
			class="btn btn-xs btn-circle btn-ghost text-inherit hover:bg-inherit"
			onclick={handleRemove}
			aria-label="Remove chip"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-4 w-4"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	{/if}
</div>
