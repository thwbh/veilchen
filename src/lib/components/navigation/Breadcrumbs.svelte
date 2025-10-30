<script lang="ts">
	import type { BreadcrumbItem } from '$lib/types/types.js';
	import { TextSize } from '$lib/enum/enum.js';

	interface Props {
		/** Array of breadcrumb items to display */
		items: BreadcrumbItem[];
		/** Optional CSS class for customization */
		class?: string;
		/** Optional size variant */
		size?: TextSize;
		/** Enable horizontal scrolling for long breadcrumbs */
		scrollable?: boolean;
	}

	let {
		items,
		class: className = '',
		size = TextSize.SM,
		scrollable = false
	}: Props = $props();

	function handleClick(item: BreadcrumbItem, event: MouseEvent) {
		if (item.onclick) {
			event.preventDefault();
			item.onclick();
		}
	}
</script>

<div class="breadcrumbs {size} {scrollable ? 'max-w-xs overflow-x-auto' : ''} {className}">
	<ul>
		{#each items as item, index (item.id)}
			<li>
				{#if index === items.length - 1}
					<!-- Last item (current page) - not clickable -->
					{#if item.icon}
						<span class="inline-flex items-center gap-2">
							{#if item.iconProps}
								<item.icon {...item.iconProps} />
							{:else}
								<item.icon />
							{/if}
							{item.label}
						</span>
					{:else}
						{item.label}
					{/if}
				{:else if item.href}
					<!-- Link item with href -->
					<a href={item.href} onclick={(e) => handleClick(item, e)}>
						{#if item.icon}
							{#if item.iconProps}
								<item.icon {...item.iconProps} />
							{:else}
								<item.icon />
							{/if}
						{/if}
						{item.label}
					</a>
				{:else}
					<!-- Clickable item without href -->
					<button type="button" onclick={(e) => handleClick(item, e)} class="breadcrumb-link">
						{#if item.icon}
							{#if item.iconProps}
								<item.icon {...item.iconProps} />
							{:else}
								<item.icon />
							{/if}
						{/if}
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<style>
	.breadcrumb-link {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
		text-decoration: underline;
	}

	.breadcrumb-link:hover {
		opacity: 0.8;
	}
</style>
