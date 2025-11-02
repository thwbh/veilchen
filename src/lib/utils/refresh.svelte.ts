import { getContext, setContext, onDestroy } from 'svelte';

interface RefreshContext {
	handler?: () => void | Promise<void>;
	isRefreshing: boolean;
}

const REFRESH_CONTEXT_KEY = Symbol('refresh');

/**
 * Creates a refresh context for AppShell.
 * Call this in your layout component that uses AppShell.
 */
export function createRefreshContext() {
	const context = $state<RefreshContext>({
		handler: undefined,
		isRefreshing: false
	});

	setContext(REFRESH_CONTEXT_KEY, context);

	return {
		get handler() {
			return context.handler;
		},
		get isRefreshing() {
			return context.isRefreshing;
		},
		set isRefreshing(value: boolean) {
			context.isRefreshing = value;
		}
	};
}

/**
 * Registers a refresh handler for the current page.
 * Call this in your page component to enable pull-to-refresh for that page.
 *
 * @param handler - Async function to call when refresh is triggered
 * @returns The refresh context with isRefreshing state
 */
export function useRefresh(handler: () => void | Promise<void>) {
	const context = getContext<RefreshContext>(REFRESH_CONTEXT_KEY);

	if (!context) {
		throw new Error('useRefresh must be called within a component that has createRefreshContext');
	}

	// Register handler
	$effect(() => {
		context.handler = handler;

		// Cleanup on unmount
		return () => {
			context.handler = undefined;
		};
	});

	return {
		get isRefreshing() {
			return context.isRefreshing;
		}
	};
}
