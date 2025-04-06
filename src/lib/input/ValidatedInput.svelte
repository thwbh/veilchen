<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends HTMLInputAttributes {
		className?: string;
		label: string;
		name?: string;
		value: unknown;
		type: string;
		required?: boolean;
		children: Snippet;
		[key: string]: unknown;
	}

	let {
		className = '',
		label,
		name = undefined,
		value = $bindable(),
		type = 'text',
		required = false,
		pattern = undefined,
		children,
		...props
	}: Props = $props();
</script>

<label class="flex flex-col gap-2">
	<span class="text-xs">
		{label}
	</span>
	<input class="input validator {className}" bind:value {name} {type} {required} {...props} />
	<div class="validator-hint">
		{@render children()}
	</div>
</label>
