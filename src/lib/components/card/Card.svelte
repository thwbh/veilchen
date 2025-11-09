<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A card component based on DaisyUI styling.
	 * Provides a container with optional title, image, body, and actions.
	 */
	interface Props {
		/** Optional card title snippet */
		title?: Snippet;
		/** Optional image snippet (displayed at top of card) */
		image?: Snippet;
		/** Card body content snippet */
		children: Snippet;
		/** Optional actions snippet (displayed at bottom of card) */
		actions?: Snippet;
		/** Additional CSS classes for the card */
		class?: string;
		/** Additional CSS classes for the card body */
		bodyClass?: string;
		/** Card variant (normal, compact, side, glass, bordered) */
		variant?: 'normal' | 'compact' | 'side' | 'glass' | 'bordered';
		/** Whether the image should cover the full card width */
		imageFull?: boolean;
	}

	let {
		title = undefined,
		image = undefined,
		children,
		actions = undefined,
		class: className = '',
		bodyClass = '',
		variant = 'normal',
		imageFull = false
	}: Props = $props();

	const variantClasses = $derived({
		normal: 'card',
		compact: 'card card-compact',
		side: 'card card-side',
		glass: 'card glass',
		bordered: 'card card-bordered'
	}[variant]);

	const imageClasses = $derived(imageFull ? '' : 'px-4 pt-4');
</script>

<div class="{variantClasses} bg-base-100 shadow-xl {className}">
	{#if image}
		<figure class={imageClasses}>
			{@render image()}
		</figure>
	{/if}

	<div class="card-body {bodyClass}">
		{#if title}
			<h2 class="card-title">
				{@render title()}
			</h2>
		{/if}

		{@render children()}

		{#if actions}
			<div class="card-actions justify-end">
				{@render actions()}
			</div>
		{/if}
	</div>
</div>
