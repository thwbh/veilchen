<script lang="ts">
	import type { BottomNavItem } from '$lib/types/types.js';

	/**
	 * Extended BottomNavItem with icon render function.
	 */
	interface BottomNavItemWithIcon extends BottomNavItem {
		/** Optional icon render function */
		icon?: () => string;
	}

	/**
	 * A bottom navigation component for mobile apps.
	 * Displays a fixed bar at the bottom with navigation items.
	 */
	interface Props {
		/** Array of navigation items to display */
		items: BottomNavItemWithIcon[];
		/** ID of the currently active item */
		activeId?: string;
		/** Callback fired when an item is clicked */
		onitemclick?: (id: string) => void;
		/** CSS class to apply to the navigation container */
		class?: string;
	}

	let {
		items,
		activeId = undefined,
		onitemclick = () => {},
		class: className = ''
	}: Props = $props();

	function handleClick(id: string) {
		onitemclick(id);
	}
</script>

<div class="btm-nav btm-nav-md {className}">
	{#each items as item}
		<button
			class:active={activeId === item.id}
			onclick={() => handleClick(item.id)}
			aria-label={item.label}
			aria-current={activeId === item.id ? 'page' : undefined}
		>
			{#if item.icon}
				<span>{item.icon()}</span>
			{/if}
			<span class="btm-nav-label">{item.label}</span>
		</button>
	{/each}
</div>

<style>
	.btm-nav-label {
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>
