<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BottomNavItem, NavBarConfig } from '$lib/types/types.js';
	import BottomNavigation from '$lib/components/navigation/BottomNavigation.svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';

	/**
	 * AppShell component provides a mobile app layout structure with optional top navbar and bottom navigation.
	 * Designed to be used in SvelteKit layouts with automatic active state management.
	 */
	interface Props {
		/** Navigation items for bottom navigation bar */
		items: BottomNavItem[];
		/** ID of the currently active navigation item */
		activeId?: string;
		/** Content to display in the main area */
		children: Snippet;
		/** Optional navbar configuration for top navigation */
		navbar?: NavBarConfig;
		/** Additional CSS classes for the shell container */
		class?: string;
		/** Additional CSS classes for the content area */
		contentClass?: string;
		/** Additional CSS classes for the bottom navigation */
		navClass?: string;
	}

	let {
		items,
		activeId = undefined,
		children,
		navbar = undefined,
		class: className = '',
		contentClass = '',
		navClass = ''
	}: Props = $props();
</script>

<div class="app-shell {className}">
	{#if navbar}
		<NavBar config={navbar} />
	{/if}

	<main class="app-shell-content {contentClass}">
		{@render children()}
	</main>

	<BottomNavigation {items} {activeId} class={navClass} />
</div>

<style>
	.app-shell {
		display: flex;
		flex-direction: column;
		height: 100vh;
		height: 100dvh; /* Use dynamic viewport height for mobile browsers */
		overflow: hidden;
	}

	.app-shell-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		/* Reserve space for dock navigation */
		padding-bottom: calc(4rem + env(safe-area-inset-bottom));
	}
</style>
