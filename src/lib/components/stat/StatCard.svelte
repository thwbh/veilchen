<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A statistics card component for displaying metrics and KPIs.
	 * Follows DaisyUI's stat component pattern with figure, title, value, and description.
	 */
	interface Props {
		/** Optional figure/icon snippet displayed on the side */
		figure?: Snippet;
		/** Title text for the statistic */
		title?: string;
		/** Main value to display (can be string or number) */
		value?: string | number;
		/** Description or additional context */
		description?: string;
		/** CSS class to apply to the stat container */
		class?: string;
		/** CSS class to apply to the title */
		titleClass?: string;
		/** CSS class to apply to the value */
		valueClass?: string;
		/** CSS class to apply to the description */
		descClass?: string;
		/** Optional actions snippet displayed below description */
		actions?: Snippet;
	}

	let {
		figure,
		title,
		value,
		description,
		class: className = '',
		titleClass = '',
		valueClass = '',
		descClass = '',
		actions
	}: Props = $props();
</script>

<div class="stat {className}">
	{#if figure}
		<div class="stat-figure">
			{@render figure()}
		</div>
	{/if}

	{#if title}
		<div class="stat-title {titleClass}">{title}</div>
	{/if}

	{#if value !== undefined}
		<div class="stat-value {valueClass}">{value}</div>
	{/if}

	{#if description}
		<div class="stat-desc {descClass}">{description}</div>
	{/if}

	{#if actions}
		<div class="stat-actions">
			{@render actions()}
		</div>
	{/if}
</div>
