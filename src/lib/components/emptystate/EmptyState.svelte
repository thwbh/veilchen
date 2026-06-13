<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * An empty state component for displaying placeholder content when no data is available.
	 */
	interface Props {
		/** The icon to display (can be an SVG snippet or icon name) */
		icon?: Snippet | string;
		/** The title/text displayed prominently */
		title: string;
		/** Optional description text */
		description?: string;
		/** CSS class to apply to the container */
		class?: string;
		/** Action buttons or content to display below the message */
		children?: Snippet;
	}

	let { icon, title, description = '', class: className = '', children }: Props = $props();
</script>

<div class="flex flex-col items-center justify-center text-center py-12 px-4 {className}">
	{#if icon}
		{#if typeof icon === 'string'}
			<!-- Default icon if string is provided -->
			<div class="text-6xl text-gray-400 mb-4">
				{icon}
			</div>
		{:else}
			<!-- Custom icon snippet -->
			<div class="mb-4">
				{@render icon()}
			</div>
		{/if}
	{/if}

	<h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>

	{#if description}
		<p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">{description}</p>
	{/if}

	{#if children}
		<div class="flex flex-wrap gap-2 justify-center">
			{@render children()}
		</div>
	{/if}
</div>
