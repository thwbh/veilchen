<script lang="ts">
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
	}

	let {
		variant = 'spinner',
		size = 'md',
		color = 'text-primary',
		class: className = '',
		label = undefined,
		visible = true
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
	{#if label}
		<div class="flex flex-col items-center justify-center gap-2">
			<span class={loadingClass}></span>
			<span class="text-sm opacity-70">{label}</span>
		</div>
	{:else}
		<span class={loadingClass}></span>
	{/if}
{/if}
