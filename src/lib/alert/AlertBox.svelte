<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		alertClass?: string;
		icon?: Snippet;
		children: Snippet;
	}

	let { alertClass = '', icon = undefined, children }: Props = $props();
</script>

<span role="alert" class="alert alert-horizontal {alertClass}">
	{#if icon}
		{@render icon()}
	{/if}
	<span class="flex flex-col">
		{@render children()}
	</span>
</span>
