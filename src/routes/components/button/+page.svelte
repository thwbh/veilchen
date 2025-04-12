<script lang="ts">
	import ButtonGroup from '$lib/components/input/ButtonGroup.svelte';
	import type { KeyValuePair } from '$lib/types/types.js';

	let segmentValue = $state('b');
	let segmentNumberValue = $state(1.5);

	const segments: Array<KeyValuePair> = [
		{ key: 'a', value: 'AAA' },
		{ key: 'b', value: 'BBB' },
		{ key: 'c', value: 'CCC' }
	];

	const numberSegments: Array<KeyValuePair> = [
		{ key: 1, value: '111' },
		{ key: 1.5, value: '1.5' },
		{ key: 5, value: '555' }
	];
</script>

<div class="flex flex-col gap-4 p-4">
	<ButtonGroup bind:value={segmentValue} entries={segments} />

	<ButtonGroup bind:value={segmentValue} entries={segments} label={'Choose'} />

	<ButtonGroup bind:value={segmentNumberValue} entries={numberSegments} label="Numbers" />

	{segmentNumberValue}

	{typeof segmentNumberValue === 'number'}

	{segmentValue}
</div>
