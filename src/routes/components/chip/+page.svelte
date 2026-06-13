<script lang="ts">
	import Chip from '$lib/components/chip/Chip.svelte';

	let chips = ['Svelte', 'Tailwind', 'DaisyUI', 'Mobile', 'Components'];
	let removableChips = ['Tag 1', 'Tag 2', 'Tag 3'];

	function handleRemove(index: number) {
		removableChips = removableChips.filter((_, i) => i !== index);
	}

	function handleAddChip() {
		removableChips = [...removableChips, `Tag ${removableChips.length + 1}`];
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Chip Examples</h1>
	<p class="mb-4 text-sm opacity-70">Interactive tag components with multiple variants</p>

	<div>
		<h2 class="mb-2 text-xl font-bold">Basic Chips</h2>
		<div class="flex flex-wrap gap-2">
			{#each chips as chip}
				<Chip>{chip}</Chip>
			{/each}
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Color Variants</h2>
		<div class="flex flex-wrap gap-2">
			<Chip color="primary">Primary</Chip>
			<Chip color="secondary">Secondary</Chip>
			<Chip color="accent">Accent</Chip>
			<Chip color="info">Info</Chip>
			<Chip color="success">Success</Chip>
			<Chip color="warning">Warning</Chip>
			<Chip color="error">Error</Chip>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Removable Chips</h2>
		<div class="flex flex-wrap gap-2 mb-2">
			{#each removableChips as chip, index}
				<Chip removable onremove={() => handleRemove(index)} class="transition-all">
					{chip}
				</Chip>
			{/each}
		</div>
		<button class="btn btn-sm btn-outline" on:click={handleAddChip}> + Add Chip </button>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Interactive Example</h2>
		<p class="mb-2 text-sm opacity-70">Click the remove button on chips to delete them</p>
		<div class="flex flex-wrap gap-2">
			<Chip removable onremove={() => console.log('Removed basic chip')}>Basic Chip</Chip>
			<Chip color="success" removable onremove={() => console.log('Removed success chip')}>
				Success Status
			</Chip>
			<Chip color="warning" removable onremove={() => console.log('Removed warning chip')}>
				Warning Status
			</Chip>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Code Example</h2>
		<div class="mockup-code">
			<pre><code
					>{`import { Chip } from 'veilchen';

<!-- Basic chip -->
<Chip>Tag Name</Chip>

<!-- Colored chip -->
<Chip color="success">Success</Chip>

<!-- Removable chip -->
<Chip removable onremove={handleRemove}>
  Removable Tag
</Chip>`}</code
				></pre>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Props</h2>
		<div class="overflow-x-auto">
			<table class="table table-compact">
				<thead>
					<tr>
						<th>Prop</th>
						<th>Type</th>
						<th>Default</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>children</td>
						<td>Snippet</td>
						<td>-</td>
						<td>Text content of the chip</td>
					</tr>
					<tr>
						<td>removable</td>
						<td>boolean</td>
						<td>false</td>
						<td>Show remove button</td>
					</tr>
					<tr>
						<td>color</td>
						<td>'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'</td>
						<td>'primary'</td>
						<td>Color variant</td>
					</tr>
					<tr>
						<td>class</td>
						<td>string</td>
						<td>''</td>
						<td>Additional CSS classes</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Events</h2>
		<div class="overflow-x-auto">
			<table class="table table-compact">
				<thead>
					<tr>
						<th>Event</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>remove</td>
						<td>Dispatched when remove button is clicked (only when removable=true)</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Features</h2>
		<ul class="list-disc pl-6 space-y-2">
			<li>✅ Multiple color variants matching DaisyUI theme</li>
			<li>✅ Removable functionality with custom events</li>
			<li>✅ Touch-friendly interactions</li>
			<li>✅ Accessible button controls with ARIA labels</li>
			<li>✅ Compact design optimized for mobile</li>
			<li>✅ Smooth hover and transition effects</li>
		</ul>
	</div>
</div>
