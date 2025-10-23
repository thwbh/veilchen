<script lang="ts">
	import ValidatedInput from '$lib/components/input/ValidatedInput.svelte';
	import Stack from '$lib/components/stack/Stack.svelte';
	import StackCard from '$lib/components/stack/StackCard.svelte';
	import Page from '../../+page.svelte';

	let currentIndex = $state(0);
	const cards = ['Card 1', 'Card 2', 'Card 3'];

	let styledIndex = $state(0);

	const styledCardStyles = [
		'bg-neutral text-neutral-content',
		'bg-primary text-primary-content',
		'bg-secondary text-secondary-content',
		'bg-accent text-accent-content'
	];

	const styledCards = [
		'Conan, what is the meaning of life?',
		'To crush your enemies',
		'see them driven before you',
		'and hear the lamentation of their women!'
	];

	let employeeCardIndex = $state(0);
	const employeeCards = ['Employee 1', 'Employee 2', 'Employee 3'];
	const employeeNames = ['Bob', 'Alice', 'John'];
	const employeeBirthDates = ['1992-04-14', '1990-01-28', '2001-06-09'];
	const employeeOccupations = [
		'Senior Facility Manager',
		'Chief Senior Lead Leader',
		'Lead Leading Lead Inspector'
	];
</script>

<div class="flex flex-col gap-6 overflow-x-hidden p-4">
	<h1 class="mb-2 text-3xl font-bold">Stack Example</h1>
	<p class="mb-4 text-sm opacity-70">
		Swipeable card stack with keyboard navigation (Arrow Left/Right). Click the indicator dots to
		jump to a specific card!
	</p>

	<Stack
		bind:index={currentIndex}
		size={cards.length}
		onchange={(idx) => console.log('Now showing:', idx)}
	>
		{#snippet card(index, outFlyParams, inFlyParams)}
			<StackCard isActive={index === currentIndex} cardKey={index} {outFlyParams} {inFlyParams}>
				<h2 class="card-title">{cards[index]}</h2>
				<p>Swipe, use arrow keys, or click the dots to navigate</p>
			</StackCard>
		{/snippet}
	</Stack>

	<div class="bg-base-200 rounded-box mt-4 p-4">
		<p class="text-sm">
			<strong>Current card:</strong>
			{currentIndex + 1} of {cards.length}
		</p>
	</div>
</div>

<div class="divider"></div>

<div class="flex flex-col gap-6 overflow-x-hidden p-4">
	<h2 class="mb-2 text-xl font-bold">Stack with different colors</h2>
	<p class="mb-4 text-sm opacity-70">Swipable stack with different styles.</p>

	<Stack bind:index={styledIndex} size={styledCards.length}>
		{#snippet card(index, outFlyParams, inFlyParams)}
			<StackCard
				isActive={index === styledIndex}
				cardKey={index}
				{outFlyParams}
				{inFlyParams}
				class={styledCardStyles[index]}
			>
				<div>
					<p>{styledCards[index]}</p>
				</div>
			</StackCard>
		{/snippet}
	</Stack>
</div>

<div class="divider"></div>

<div class="flex flex-col gap-6 overflow-x-hidden p-4">
	<h2 class="mb-2 text-xl font-bold">Stack with input mask</h2>
	<p class="mb-4 text-sm opacity-70">Swipable stack card with input masks.</p>

	<Stack
		bind:index={employeeCardIndex}
		size={employeeCards.length}
		onchange={(idx) => console.log('Now showing input:', idx)}
	>
		{#snippet card(index, outFlyParams, inFlyParams)}
			<StackCard
				class="card-border border-neutral"
				isActive={index === employeeCardIndex}
				cardKey={index}
				{outFlyParams}
				{inFlyParams}
			>
				<div class="flex flex-row justify-between">
					<h3 class="card-title">{employeeCards[index]}</h3>
					<span class="badge badge-neutral text-xs">Number {index + 1}</span>
				</div>
				<div>
					<strong class="mb-2 text-xl font-bold"></strong>
					<p class="mb-4 text-sm opacity-70">Attention! Confidental personnel file.</p>

					<ValidatedInput
						bind:value={employeeNames[index]}
						label="Name"
						type="text"
						minlength={3}
						maxlength={20}
						disabled
					/>

					<ValidatedInput
						bind:value={employeeBirthDates[index]}
						label="Date of Birth"
						type="date"
						disabled
					/>

					<div class="bg-base-200 rounded-box mt-4 p-4">
						<p class="text-sm">
							<strong>Name:</strong>
							{employeeNames[index] || '(empty)'}
						</p>
						<p class="mt-1 text-xs opacity-70">
							<strong>Occupation:</strong>
							{employeeOccupations[index] || '(none)'}
						</p>
					</div>
				</div>

				<div></div>
			</StackCard>
		{/snippet}
	</Stack>
</div>
