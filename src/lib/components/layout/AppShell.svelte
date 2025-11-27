<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { BottomNavItem, NavBarConfig } from '$lib/types/types.js';
	import { DockSize, DOCK_HEIGHT_MAP } from '$lib/enum/enum.js';
	import BottomNavigation from '$lib/components/navigation/BottomNavigation.svelte';
	import NavBar from '$lib/components/navigation/NavBar.svelte';
	import PullToRefresh from '$lib/components/refresh/PullToRefresh.svelte';

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
		/** Controls visibility of the loading progress bar */
		loading?: boolean;
		/** Loading progress bar color */
		loadingColor?:
			| 'progress-primary'
			| 'progress-secondary'
			| 'progress-accent'
			| 'progress-info'
			| 'progress-success'
			| 'progress-warning'
			| 'progress-error'
			| 'progress-neutral';
		/** Callback fired when pull-to-refresh is triggered. If provided, enables pull-to-refresh functionality */
		onrefresh?: () => void | Promise<void>;
		/** Whether a refresh is currently in progress */
		refreshing?: boolean;
		/** Custom refresh indicator snippet */
		refreshIndicator?: Snippet<[number]>;
		/** Size of the bottom dock navigation */
		dockSize?: DockSize;
	}

	let {
		items,
		activeId = undefined,
		children,
		navbar = undefined,
		class: className = '',
		contentClass = '',
		navClass = '',
		loading = false,
		loadingColor = 'progress-primary',
		onrefresh = undefined,
		refreshing = $bindable(false),
		refreshIndicator = undefined,
		dockSize = DockSize.MD
	}: Props = $props();

	// Calculate the bottom padding based on dock size
	const dockHeight = $derived(DOCK_HEIGHT_MAP[dockSize]);
</script>

<div class="app-shell {className}">
	{#if navbar}
		<div class="app-shell-navbar">
			<NavBar config={navbar} />
		</div>
	{/if}

	{#if loading}
		<div class="app-shell-loading">
			<progress class="progress {loadingColor} w-full p-0"></progress>
		</div>
	{/if}

	{#if onrefresh}
		<PullToRefresh
			{onrefresh}
			bind:refreshing
			indicator={refreshIndicator}
			bottomPadding={0}
			class="app-shell-content {contentClass}"
		>
			{@render children()}
		</PullToRefresh>
	{:else}
		<main class="app-shell-content {contentClass}">
			{@render children()}
		</main>
	{/if}

	<div class="app-shell-bottom-nav">
		<BottomNavigation {items} {activeId} size={dockSize} class={navClass} />
	</div>
</div>

<style>
	.app-shell {
		display: flex;
		flex-direction: column;
		height: 100vh;
		height: 100dvh; /* Use dynamic viewport height for mobile browsers */
		overflow: hidden;
		position: relative;
	}

	.app-shell-navbar {
		flex-shrink: 0;
		position: sticky;
		top: 0;
		z-index: 20;
		background: inherit;
	}

	.app-shell-loading {
		flex-shrink: 0;
		position: sticky;
		top: 0;
		z-index: 30;
	}

	.app-shell-content {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		min-height: 0; /* Important: allows flex child to shrink below content size */
	}

	.app-shell-bottom-nav {
		flex-shrink: 0;
		/* Override DaisyUI's dock-bottom fixed positioning to keep it in document flow */
		position: relative !important;
		/* Add safe area inset for devices with home indicators */
		padding-bottom: env(safe-area-inset-bottom);
	}

	/* Override the fixed positioning from DaisyUI's dock-bottom class within AppShell */
	.app-shell-bottom-nav :global(.dock-bottom) {
		position: relative !important;
		bottom: auto !important;
	}
</style>
