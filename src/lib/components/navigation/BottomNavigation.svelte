<script lang="ts">
	import type { BottomNavItem } from '$lib/types/types.js';
	import { DockSize } from '$lib/enum/enum.js';

	/**
	 * A bottom navigation component for mobile apps.
	 * Displays a fixed bar at the bottom with navigation items.
	 */
	interface Props {
		/** Array of navigation items to display */
		items: BottomNavItem[];
		/** ID of the currently active item */
		activeId?: string;
		/** CSS class to apply to the navigation container */
		class?: string;
		/** Size of the dock navigation */
		size?: DockSize;
	}

	let { items, activeId = undefined, class: className = '', size = DockSize.MD }: Props = $props();

	function handleClick(item: BottomNavItem) {
		// Call the item's specific onclick handler if provided
		if (item.onclick) {
			item.onclick();
		}
	}
</script>

<div class="dock dock-bottom {size} {className}">
	{#each items as item}
		{#if item.href}
			<a
				href={item.href}
				class="dock-item"
				class:dock-active={activeId === item.id}
				onclick={() => handleClick(item)}
				aria-label={item.label}
				aria-current={activeId === item.id ? 'page' : undefined}
			>
				{#if item.icon}
					{@const IconComponent = item.icon}
					{#if item.iconProps}
						<IconComponent {...item.iconProps} />
					{:else}
						<IconComponent />
					{/if}
				{/if}
				<span class="dock-label">{item.label}</span>
			</a>
		{:else}
			<button
				class="dock-item"
				class:dock-active={activeId === item.id}
				onclick={() => handleClick(item)}
				aria-label={item.label}
				aria-current={activeId === item.id ? 'page' : undefined}
			>
				{#if item.icon}
					{@const IconComponent = item.icon}
					{#if item.iconProps}
						<IconComponent {...item.iconProps} />
					{:else}
						<IconComponent />
					{/if}
				{/if}
				<span class="dock-label">{item.label}</span>
			</button>
		{/if}
	{/each}
</div>
