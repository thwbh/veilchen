<script lang="ts">
	import LongPressContainer from '$lib/components/gesture/LongPressContainer.svelte';
	import { toast } from '$lib/components/toast/toast.svelte.js';

	let pressCount = $state(0);
	let lastPressedItem = $state('');

	function handleLongPress(item: string) {
		pressCount++;
		lastPressedItem = item;
		toast.success(`Long pressed: ${item}`);
	}
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h1 class="mb-2 text-3xl font-bold">LongPressContainer Component</h1>
		<p class="mb-4 text-sm opacity-70">
			A container that wraps content and triggers callbacks on long press gestures (300ms)
		</p>
	</div>

	<div class="alert alert-info">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			class="h-6 w-6 shrink-0 stroke-current"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			></path>
		</svg>
		<span>Touch and hold any item below for 300ms to trigger the long press action</span>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Status</h3>
		<div class="text-sm">
			<p>Total long presses: <span class="font-bold">{pressCount}</span></p>
			<p>Last pressed: <span class="font-bold">{lastPressedItem || 'None'}</span></p>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Card</h2>
		<p class="mb-4 text-sm opacity-70">Long press to trigger action</p>

		<LongPressContainer onlongpress={() => handleLongPress('Card 1')} class="card bg-base-200 p-4">
			<h3 class="text-lg font-bold">Card 1</h3>
			<p class="text-sm opacity-70">Long press this card to see the action</p>
		</LongPressContainer>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Multiple Items</h2>
		<p class="mb-4 text-sm opacity-70">List of cards with long press support</p>

		<div class="space-y-3">
			{#each ['Item A', 'Item B', 'Item C'] as item}
				<LongPressContainer
					onlongpress={() => handleLongPress(item)}
					class="card bg-base-200 p-4 hover:bg-base-300 transition-colors cursor-pointer"
				>
					<div class="flex items-center justify-between">
						<div>
							<h3 class="font-bold">{item}</h3>
							<p class="text-sm opacity-70">Long press for options</p>
						</div>
						<span class="text-2xl">⋮</span>
					</div>
				</LongPressContainer>
			{/each}
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Using as Button</h2>
		<p class="mb-4 text-sm opacity-70">Long press button element for delete action</p>

		<LongPressContainer
			as="button"
			onlongpress={() => handleLongPress('Delete Button')}
			class="btn btn-error btn-outline"
		>
			<span>Hold to Delete</span>
		</LongPressContainer>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: List Items</h2>
		<p class="mb-4 text-sm opacity-70">Long press list items for context menu</p>

		<ul class="menu bg-base-200 w-full rounded-box">
			{#each [1, 2, 3, 4] as num}
				<li>
					<LongPressContainer
						as="button"
						onlongpress={() => handleLongPress(`List Item ${num}`)}
						class="w-full text-left"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						List Item {num}
					</LongPressContainer>
				</li>
			{/each}
		</ul>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Image Gallery</h2>
		<p class="mb-4 text-sm opacity-70">Long press images for download/share options</p>

		<div class="grid grid-cols-2 gap-4">
			{#each ['nature', 'architecture', 'food', 'technology'] as category}
				<LongPressContainer
					onlongpress={() => handleLongPress(`Image: ${category}`)}
					class="card bg-base-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
				>
					<figure class="aspect-square bg-base-300">
						<div class="flex items-center justify-center h-full w-full">
							<span class="text-4xl opacity-30">🖼️</span>
						</div>
					</figure>
					<div class="card-body p-3">
						<h3 class="card-title text-sm capitalize">{category}</h3>
					</div>
				</LongPressContainer>
			{/each}
		</div>
	</div>

	<div class="divider"></div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Props</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-70">
			<li><code>onlongpress: () => void</code> - Callback triggered on long press (required)</li>
			<li>
				<code>as?: 'div' | 'button' | 'article' | 'section' | 'li'</code> - HTML element type (default:
				'div')
			</li>
			<li><code>class?: string</code> - Additional CSS classes</li>
			<li><code>children: Snippet</code> - Content to display inside the container</li>
		</ul>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Features</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-70">
			<li>Detects long press gestures (300ms hold time)</li>
			<li>Cancels if user moves finger (swipe detection)</li>
			<li>Works with touch and mouse events</li>
			<li>Accessible with proper ARIA roles and tabindex</li>
			<li>Compatible with parent swipe containers</li>
		</ul>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Usage Example</h3>
		<pre class="bg-base-300 rounded p-3 text-xs"><code
				>&lt;script lang="ts"&gt;
  import {`{`} LongPressContainer {`}`} from '@thwbh/veilchen';
  import {`{`} toast {`}`} from '@thwbh/veilchen';

  function handleDelete() {`{`}
    toast.success('Item deleted!');
    // Perform delete action
  {`}`}
&lt;/script&gt;

&lt;LongPressContainer
  onlongpress={`{`}handleDelete{`}`}
  class="card bg-base-200 p-4"
&gt;
  &lt;h3&gt;Long press to delete&lt;/h3&gt;
&lt;/LongPressContainer&gt;

&lt;!-- As a button --&gt;
&lt;LongPressContainer
  as="button"
  onlongpress={`{`}handleDelete{`}`}
  class="btn btn-error"
&gt;
  &lt;span&gt;Hold to Delete&lt;/span&gt;
&lt;/LongPressContainer&gt;</code
			></pre>
	</div>
</div>
