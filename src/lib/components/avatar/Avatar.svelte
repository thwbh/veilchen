<script lang="ts">
	import type { Snippet } from 'svelte';

	/**
	 * Avatar component based on DaisyUI for displaying user profile pictures.
	 * Supports images, placeholders, status indicators, and custom content.
	 */
	interface Props {
		/** Image source URL */
		src?: string;
		/** Alt text for the image */
		alt?: string;
		/** Size variant (uses Tailwind width classes) */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/** Shape variant */
		shape?: 'circle' | 'square' | 'rounded';
		/** Status indicator - uses DaisyUI avatar-online/offline */
		status?: 'online' | 'offline' | 'busy' | 'away' | null;
		/** Placeholder text (initials, emoji, etc.) - shown when no src */
		placeholder?: string;
		/** Custom placeholder content snippet */
		placeholderContent?: Snippet;
		/** Whether the avatar has a ring/border */
		ring?: boolean;
		/** Ring color class (e.g., 'ring-primary', 'ring-success') */
		ringColor?: string;
		/** Additional CSS classes */
		class?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
	}

	let {
		src = undefined,
		alt = 'Avatar',
		size = 'md',
		shape = 'circle',
		status = null,
		placeholder = undefined,
		placeholderContent = undefined,
		ring = false,
		ringColor = 'ring-primary',
		class: className = '',
		onclick = undefined
	}: Props = $props();

	let imageError = $state(false);
	let hasImage = $derived(src && !imageError);
	// isPlaceholder is true when there's no image (shows placeholder styling)
	let isPlaceholder = $derived(!hasImage);

	function handleImageError() {
		imageError = true;
	}

	// Size mappings (uses Tailwind width utilities like DaisyUI)
	const sizeClasses = {
		xs: 'w-6',
		sm: 'w-8',
		md: 'w-12',
		lg: 'w-16',
		xl: 'w-20',
		'2xl': 'w-24'
	};

	// Shape mappings
	const shapeClasses = {
		circle: 'rounded-full',
		square: 'rounded-none',
		rounded: 'rounded-xl'
	};

	const isClickable = onclick !== undefined;
</script>

<button
	class="avatar {isPlaceholder ? 'placeholder' : ''} {className}"
	class:avatar-online={status === 'online'}
	class:avatar-offline={status === 'offline'}
	class:avatar-busy={status === 'busy'}
	class:avatar-away={status === 'away'}
	class:clickable={isClickable}
	{onclick}
	disabled={!isClickable}
	type="button"
>
	<div
		class="{sizeClasses[size]} {shapeClasses[shape]} {ring
			? `ring ring-2 ${ringColor} ring-offset-base-100 ring-offset-2`
			: ''} {isClickable ? 'cursor-pointer transition-opacity hover:opacity-80' : ''} {isPlaceholder
			? 'bg-neutral text-neutral-content flex items-center justify-center'
			: ''}"
	>
		{#if hasImage}
			<img {src} {alt} onerror={handleImageError} />
		{:else if placeholderContent}
			<div class="flex h-full w-full items-center justify-center">
				{@render placeholderContent()}
			</div>
		{:else if placeholder}
			<span class="flex items-center justify-center">
				{placeholder}
			</span>
		{:else}
			<!-- Default placeholder icon -->
			<div class="flex h-full w-full items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-3/5 w-3/5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
					/>
				</svg>
			</div>
		{/if}
	</div>
</button>

<style>
	/* Reset button styles */
	.avatar {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		user-select: none;
		position: relative;
		display: inline-flex;
	}

	/* Disabled state - non-clickable avatar */
	.avatar:disabled {
		cursor: default;
		pointer-events: none;
	}

	/* Clickable state */
	.avatar.clickable {
		cursor: pointer;
	}

	.avatar.clickable:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	/* Custom status indicators for busy and away (DaisyUI only has online/offline) */
	/* Targeting the .avatar parent with the status class applied via class: directive */
	/* Matching DaisyUI's positioning: top: 7%, right: 7% */
	.avatar.avatar-busy::before {
		content: '';
		display: block;
		position: absolute;
		z-index: 1;
		top: 7%;
		right: 7%;
		width: 15%;
		height: 15%;
		border-radius: calc(infinity * 1px);
		background-color: var(--color-error); /* DaisyUI error color for busy */
		outline: 2px solid var(--color-base-100);
	}

	.avatar.avatar-away::before {
		content: '';
		display: block;
		position: absolute;
		z-index: 1;
		top: 7%;
		right: 7%;
		width: 15%;
		height: 15%;
		border-radius: calc(infinity * 1px);
		background-color: var(--color-warning); /* DaisyUI warning color for away */
		outline: 2px solid var(--color-base-100);
	}
</style>
