<script lang="ts">
	import type { FABAction } from '$lib/types/types.js';
	import type { Snippet, Component } from 'svelte';
	import './fab.css';

	/**
	 * A Floating Action Button (FAB) component with speed dial functionality.
	 * Supports vertical stack and flower (quarter circle) arrangements.
	 * Based on DaisyUI's FAB component - uses CSS focus states, no JavaScript needed for open/close.
	 */
	interface Props {
		/** Array of action items to display when FAB is focused */
		actions?: FABAction[];
		/** Main trigger icon component */
		icon?: Component;
		/** Props to pass to the main trigger icon */
		iconProps?: Record<string, any>;
		/** Color variant for the main trigger button */
		color?:
			| 'primary'
			| 'secondary'
			| 'accent'
			| 'neutral'
			| 'info'
			| 'success'
			| 'warning'
			| 'error';
		/** Size of the FAB buttons */
		size?: 'sm' | 'md' | 'lg';
		/** Layout variant: 'vertical' for stacked, 'flower' for quarter circle */
		variant?: 'vertical' | 'flower';
		/** Position on screen */
		position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
		/** Whether to show labels for actions (only in vertical mode) */
		showLabels?: boolean;
		/** CSS class to apply to the FAB container */
		class?: string;
		/** Custom trigger content snippet */
		trigger?: Snippet;
		/** Use fixed positioning (viewport) instead of absolute (parent container) */
		fixed?: boolean;
	}

	let {
		actions = [],
		icon,
		iconProps = {},
		color = 'primary',
		size = 'lg',
		variant = 'vertical',
		position = 'bottom-right',
		showLabels = true,
		class: className = '',
		trigger,
		fixed = false
	}: Props = $props();

	function handleActionClick(action: FABAction) {
		if (action.disabled) return;
		if (action.onclick) {
			action.onclick();
		}
	}

	// Get main action if defined
	const mainAction = $derived(actions.find((a) => a.isMainAction));
	// Get regular actions (non-main)
	const regularActions = $derived(actions.filter((a) => !a.isMainAction));

	// Size classes
	const sizeClasses = {
		sm: 'btn-sm',
		md: 'btn-md',
		lg: 'btn-lg'
	};

	// Position classes - use !important to override defaults if needed
	const positionClasses = {
		'bottom-right': 'bottom-4! right-4!',
		'bottom-left': 'bottom-4! left-4!',
		'top-right': 'top-4! right-4!',
		'top-left': 'top-4! left-4!'
	};

	// Color classes
	function getColorClass(colorName?: string): string {
		if (!colorName) return '';
		return `btn-${colorName}`;
	}
</script>

<div
	class="fab {variant === 'flower' ? 'fab-flower' : ''} {className}"
	class:absolute={!fixed}
	style="{!fixed ? `${position.includes('right') ? 'right' : 'left'}: 1rem; ${position.includes('bottom') ? 'bottom' : 'top'}: 1rem;` : ''}"
	role="group"
	aria-label="Floating action button"
>
	<!-- Main trigger button -->
	{#if trigger}
		<div
			tabindex="0"
			role="button"
			class="btn btn-circle {sizeClasses[size]} {getColorClass(color)}"
			aria-haspopup="true"
		>
			{@render trigger()}
		</div>
	{:else}
		<div
			tabindex="0"
			role="button"
			class="btn btn-circle {sizeClasses[size]} {getColorClass(color)}"
			aria-haspopup="true"
		>
			{#if icon}
				{@const IconComponent = icon}
				{#if iconProps && Object.keys(iconProps).length > 0}
					<IconComponent {...iconProps} />
				{:else}
					<IconComponent />
				{/if}
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
			{/if}
		</div>
	{/if}

	<!-- Main action (shown when FAB is focused) -->
	{#if mainAction}
		{#if mainAction.href}
			<a
				href={mainAction.href}
				class="fab-main-action btn btn-circle {sizeClasses[size]} {getColorClass(
					mainAction.color || 'secondary'
				)}"
				class:btn-disabled={mainAction.disabled}
				aria-label={mainAction.label}
				onclick={() => handleActionClick(mainAction)}
			>
				{#if mainAction.icon}
					{@const MainIconComponent = mainAction.icon}
					{#if mainAction.iconProps && Object.keys(mainAction.iconProps).length > 0}
						<MainIconComponent {...mainAction.iconProps} />
					{:else}
						<MainIconComponent />
					{/if}
				{/if}
			</a>
		{:else}
			<button
				class="fab-main-action btn btn-circle {sizeClasses[size]} {getColorClass(
					mainAction.color || 'secondary'
				)}"
				disabled={mainAction.disabled}
				aria-label={mainAction.label}
				onclick={() => handleActionClick(mainAction)}
			>
				{#if mainAction.icon}
					{@const MainIconComponent = mainAction.icon}
					{#if mainAction.iconProps && Object.keys(mainAction.iconProps).length > 0}
						<MainIconComponent {...mainAction.iconProps} />
					{:else}
						<MainIconComponent />
					{/if}
				{/if}
			</button>
		{/if}
	{/if}

	<!-- Action buttons -->
	{#each regularActions as action (action.id)}
		{#if variant === 'flower'}
			<!-- Flower variant: tooltips wrap buttons directly (DaisyUI requirement) -->
			{#if action.href}
				<div class="tooltip tooltip-left" data-tip={action.label}>
					<a
						href={action.href}
						class="btn btn-circle {sizeClasses[size]} {getColorClass(action.color)}"
						class:btn-disabled={action.disabled}
						aria-label={action.label}
						onclick={() => handleActionClick(action)}
					>
						{#if action.icon}
							{@const ActionIcon = action.icon}
							{#if action.iconProps && Object.keys(action.iconProps).length > 0}
								<ActionIcon {...action.iconProps} />
							{:else}
								<ActionIcon />
							{/if}
						{/if}
					</a>
				</div>
			{:else}
				<div class="tooltip tooltip-left" data-tip={action.label}>
					<button
						class="btn btn-circle {sizeClasses[size]} {getColorClass(action.color)}"
						disabled={action.disabled}
						aria-label={action.label}
						onclick={() => handleActionClick(action)}
					>
						{#if action.icon}
							{@const ActionIcon = action.icon}
							{#if action.iconProps && Object.keys(action.iconProps).length > 0}
								<ActionIcon {...action.iconProps} />
							{:else}
								<ActionIcon />
							{/if}
						{/if}
					</button>
				</div>
			{/if}
		{:else}
			<!-- Vertical variant: inline labels -->
			<div>
				{#if showLabels && action.label}
					<span class="badge badge-neutral text-sm shadow-md">{action.label}</span>
				{/if}
				{#if action.href}
					<a
						href={action.href}
						class="btn btn-circle {sizeClasses[size]} {getColorClass(action.color)}"
						class:btn-disabled={action.disabled}
						aria-label={action.label}
						onclick={() => handleActionClick(action)}
					>
						{#if action.icon}
							{@const ActionIcon = action.icon}
							{#if action.iconProps && Object.keys(action.iconProps).length > 0}
								<ActionIcon {...action.iconProps} />
							{:else}
								<ActionIcon />
							{/if}
						{/if}
					</a>
				{:else}
					<button
						class="btn btn-circle {sizeClasses[size]} {getColorClass(action.color)}"
						disabled={action.disabled}
						aria-label={action.label}
						onclick={() => handleActionClick(action)}
					>
						{#if action.icon}
							{@const ActionIcon = action.icon}
							{#if action.iconProps && Object.keys(action.iconProps).length > 0}
								<ActionIcon {...action.iconProps} />
							{:else}
								<ActionIcon />
							{/if}
						{/if}
					</button>
				{/if}
			</div>
		{/if}
	{/each}
</div>

