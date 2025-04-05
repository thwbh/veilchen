<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		number: number;
		current: number;
		header?: Snippet;
		children: Snippet;
	}

	let { number, current, header = undefined, children }: Props = $props();
</script>

{#if number == current}
	<header>
		{@render header?.()}
	</header>

	<div>
		{@render children()}
	</div>
{/if}
