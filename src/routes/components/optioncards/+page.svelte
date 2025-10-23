<script lang="ts">
	import OptionCards from '$lib/components/list/OptionCards.svelte';
	import type { OptionCardData } from '$lib/types/types.js';

	// Example 1: With Emoji Icons
	let selected = $state('plan-a');

	const plans: OptionCardData<string>[] = [
		{
			value: 'plan-a',
			header: 'Starter',
			badge: { text: 'Free', color: 'success' },
			metrics: [
				{ label: 'Users', value: '5' },
				{ label: 'Storage', value: '10GB' }
			]
		},
		{
			value: 'plan-b',
			header: 'Professional',
			text: "I'd buy that for a dollar!",
			highlight: { text: 'Recommended', color: 'primary' },
			badge: { text: '$29/mo', color: 'primary' },
			metrics: [
				{ label: 'Users', value: '50' },
				{ label: 'Storage', value: '500GB' },
				{ label: 'Support', value: '24/7' }
			]
		}
	];

	const icons: Record<string, string> = {
		'plan-a': '🚀',
		'plan-b': '⭐'
	};

	// Example 2: With Custom Components
	let selected2 = $state('plan-a');

	// Example 3: Without Icons
	let selected3 = $state('plan-a');
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: With Emoji Icons</h2>
		<p class="mb-4 text-sm opacity-70">Using emoji passed through icon snippet</p>

		<OptionCards bind:value={selected} data={plans}>
			{#snippet icon(option)}
				<span class="text-2xl">{icons[option.value as string]}</span>
			{/snippet}
		</OptionCards>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected:</strong>
				{selected}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: With Custom Components</h2>
		<p class="mb-4 text-sm opacity-70">Using custom avatar components</p>

		<OptionCards bind:value={selected2} data={plans}>
			{#snippet icon(option)}
				<div class="avatar placeholder">
					<div class="bg-primary text-primary-content w-10 rounded-full">
						<span class="text-xs">{(option.value as string).slice(0, 2)}</span>
					</div>
				</div>
			{/snippet}
		</OptionCards>

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected:</strong>
				{selected2}
			</p>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Without Icons</h2>
		<p class="mb-4 text-sm opacity-70">Icons are completely optional</p>

		<OptionCards bind:value={selected3} data={plans} />

		<div class="bg-base-200 rounded-box mt-4 p-4">
			<p class="text-sm">
				<strong>Selected:</strong>
				{selected3}
			</p>
		</div>
	</div>
</div>
