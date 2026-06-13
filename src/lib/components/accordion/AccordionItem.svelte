<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * An individual accordion item with a toggleable header and content.
	 */
	interface Props {
		/** The title/text displayed in the accordion header */
		title: string;
		/** Whether the item is initially expanded */
		open?: boolean;
		/** CSS class to apply to the item */
		class?: string;
		/** Content to display when expanded */
		children: Snippet;
	}

	let { title, open = false, class: className = '', children, ...props }: Props = $props();
	let isOpen = $state(open);

	function toggle() {
		isOpen = !isOpen;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggle();
		}
	}
</script>

<div class="collapse collapse-arrow join-item border border-base-300 {className}" {...props}>
	<input type="checkbox" bind:checked={isOpen} class="peer" />
	<button
		class="collapse-title text-xl font-medium peer-checked:bg-primary peer-checked:text-primary-content w-full text-left"
		onclick={toggle}
		onkeydown={handleKeyDown}
		aria-expanded={isOpen}
		aria-controls="collapse-content"
	>
		{title}
	</button>
	<div class="collapse-content peer-checked:bg-base-100 peer-checked:text-base-content">
		<div class="p-4">
			{@render children()}
		</div>
	</div>
</div>
