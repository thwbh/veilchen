<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * A loading indicator component that displays various loading animations.
	 * Can be used standalone or integrated into other components like AppShell.
	 */
	interface Props {
		/** Style of the loading animation */
		variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity';
		/** Size of the loading indicator */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Color class for the loading indicator (e.g., "text-primary", "text-accent") */
		color?: string;
		/** Additional CSS classes for the loading indicator */
		class?: string;
		/** Optional label text to display below the loading indicator */
		label?: string;
		/** Controls visibility of the loading indicator */
		visible?: boolean;
		/** When true, stops animation and shows finished state */
		finished?: boolean;
		/** Custom snippet for the finished state (overrides default checkmark and message) */
		finishedContent?: Snippet;
		/** When true, stops animation and shows error state */
		error?: boolean;
		/** Custom snippet for the error state (overrides default error icon and message) */
		errorContent?: Snippet;
	}

	let {
		variant = 'spinner',
		size = 'md',
		color = 'text-primary',
		class: className = '',
		label = undefined,
		visible = true,
		finished = false,
		finishedContent,
		error = false,
		errorContent
	}: Props = $props();

	// Map variant to full class names to avoid Tailwind JIT tree-shaking
	const variantClasses = {
		spinner: 'loading-spinner',
		dots: 'loading-dots',
		ring: 'loading-ring',
		ball: 'loading-ball',
		bars: 'loading-bars',
		infinity: 'loading-infinity'
	} as const;

	// Map size to full class names
	const sizeClasses = {
		xs: 'loading-xs',
		sm: 'loading-sm',
		md: 'loading-md',
		lg: 'loading-lg',
		xl: 'loading-xl'
	} as const;

	let loadingClass = $derived(
		`loading ${variantClasses[variant]} ${sizeClasses[size]} ${color} ${className}`
	);
</script>

{#if visible}
	{#if error}
		<div class="animate-morph-in">
			{#if errorContent}
				{@render errorContent()}
			{:else}
				<div class="flex flex-col items-center justify-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-error"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
					<span class="text-sm opacity-70">Error</span>
				</div>
			{/if}
		</div>
	{:else if finished}
		<div class="animate-morph-in">
			{#if finishedContent}
				{@render finishedContent()}
			{:else}
				<div class="flex flex-col items-center justify-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-success"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<span class="text-sm opacity-70">Done</span>
				</div>
			{/if}
		</div>
	{:else if label}
		<div class="flex flex-col items-center justify-center gap-2">
			<span class={loadingClass}></span>
			<span class="text-sm opacity-70">{label}</span>
		</div>
	{:else}
		<span class={loadingClass}></span>
	{/if}
{/if}

<style>
	.animate-morph-in {
		animation: morph-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes morph-in {
		from {
			opacity: 0;
			transform: scale(0.5);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
