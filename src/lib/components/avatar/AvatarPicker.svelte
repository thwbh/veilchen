<script lang="ts">
	import Avatar from './Avatar.svelte';
	import type { AvatarOption } from '$lib/types/types.js';

	/**
	 * AvatarPicker component for selecting from predefined avatar options.
	 */
	interface Props {
		/** Currently selected avatar id (bindable) - returns the avatar option id */
		value?: string;
		/** Array of avatar options */
		avatars: AvatarOption[];
		/** Size of the avatar options */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
		/** Shape of the avatars */
		shape?: 'circle' | 'square' | 'rounded';
		/** Callback fired when an avatar is selected */
		onchange?: (id: string, option: AvatarOption) => void;
		/** Label text */
		label?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		value = $bindable(undefined),
		avatars,
		size = 'lg',
		shape = 'circle',
		onchange = undefined,
		label = 'Choose your avatar',
		class: className = ''
	}: Props = $props();

	function selectAvatar(option: AvatarOption) {
		value = option.id;
		onchange?.(option.id, option);
	}
</script>

<div class="avatar-picker {className}">
	{#if label}
		<span class="label pb-4">
			<span class="label-text font-semibold">{label}</span>
		</span>
	{/if}

	<div class="flex flex-wrap gap-4">
		{#each avatars as option (option.id)}
			<button
				type="button"
				class="avatar-option focus-visible:ring-primary relative rounded-full transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 {value ===
				option.id
					? 'scale-110'
					: 'hover:scale-105'}"
				onclick={() => selectAvatar(option)}
				aria-label={option.alt || `Select avatar ${option.id}`}
				aria-pressed={value === option.id}
			>
				<Avatar
					src={option.src}
					{size}
					{shape}
					ring={value === option.id}
					ringColor="ring-primary"
					alt={option.alt || `Avatar ${option.id}`}
				/>

				{#if value === option.id}
					<!-- Selected indicator -->
					<div
						class="bg-primary text-primary-content absolute -right-1 -bottom-1 rounded-full p-1"
						aria-hidden="true"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="3"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.avatar-option {
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		position: relative;
	}

	.avatar-option:active {
		transform: scale(0.95);
	}
</style>
