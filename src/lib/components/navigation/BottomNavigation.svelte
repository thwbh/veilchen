<script lang="ts">
	import type { BottomNavItem } from '$lib/types/types.js';

	/**
	 * A bottom navigation component for mobile apps.
	 * Displays a fixed bar at the bottom with navigation items.
	 */
	interface Props {
		/** Array of navigation items to display */
		items: BottomNavItem[];
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

<div class="btm-nav btm-nav-md {className}" style="grid-template-columns: repeat({items.length}, minmax(0, 1fr))">
	{#each items as item}
		{#if item.href}
			<a
				href={item.href}
				class:active={activeId === item.id}
				onclick={() => handleClick(item.id)}
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
				<span class="btm-nav-label">{item.label}</span>
			</a>
		{:else}
			<button
				class:active={activeId === item.id}
				onclick={() => handleClick(item.id)}
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
				<span class="btm-nav-label">{item.label}</span>
			</button>
		{/if}
	{/each}
</div>

<style>
	.btm-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: grid;
		width: 100%;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		padding-bottom: env(safe-area-inset-bottom);
		background-color: oklch(var(--b1) / var(--tw-bg-opacity));
		--tw-bg-opacity: 1;
		border-top: 1px solid oklch(var(--b3) / var(--tw-border-opacity));
		--tw-border-opacity: 0.2;
		z-index: 10;
		height: 4rem;
	}

	.btm-nav > * {
		display: grid;
		flex: 1 1 0%;
		cursor: pointer;
		place-items: center;
		gap: 0.25rem;
		padding: 0.5rem;
		border: none;
		background: transparent;
		text-decoration: none;
		color: inherit;
		transition: opacity 0.2s;
	}

	.btm-nav > :where(*:not(.active)) {
		opacity: 0.6;
	}

	.btm-nav > .active {
		opacity: 1;
	}

	.btm-nav-label {
		font-size: 0.75rem;
		margin-top: 0.25rem;
	}
</style>
