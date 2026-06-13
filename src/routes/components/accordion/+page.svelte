<script lang="ts">
	import Accordion from '$lib/components/accordion/Accordion.svelte';
	import AccordionItem from '$lib/components/accordion/AccordionItem.svelte';
	import { createRawSnippet } from 'svelte';
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Accordion Examples</h1>
	<p class="mb-4 text-sm opacity-70">Expandable content sections with smooth animations</p>

	<div>
		<h2 class="mb-2 text-xl font-bold">Basic Accordion</h2>
		<Accordion>
			<AccordionItem title="Section 1">
				<p class="mb-2">This is the content for section 1.</p>
				<p>Accordion items can contain any content you need.</p>
			</AccordionItem>
			<AccordionItem title="Section 2">
				<p>This is the content for section 2.</p>
			</AccordionItem>
			<AccordionItem title="Section 3">
				<p>This is the content for section 3.</p>
			</AccordionItem>
		</Accordion>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Initially Expanded Item</h2>
		<Accordion>
			<AccordionItem title="Default Collapsed">
				<p>This item starts collapsed.</p>
			</AccordionItem>
			<AccordionItem title="Initially Expanded" open={true}>
				<p>This item starts expanded by default.</p>
				<p>Use the <code>open</code> prop to control initial state.</p>
			</AccordionItem>
		</Accordion>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Custom Content</h2>
		<Accordion>
			<AccordionItem title="Rich Content Example">
				<div class="space-y-4">
					<p>Accordion items can contain complex content:</p>
					<ul class="list-disc pl-6">
						<li>Lists</li>
						<li>Images</li>
						<li>Buttons</li>
						<li>Any other components</li>
					</ul>
					<button class="btn btn-primary btn-sm">Example Button</button>
				</div>
			</AccordionItem>
		</Accordion>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Code Example</h2>
		<div class="mockup-code">
			<pre><code
					>{`import { Accordion, AccordionItem } from 'veilchen';

<Accordion>
  <AccordionItem title="Section Title">
    Your content here
  </AccordionItem>
  <AccordionItem title="Another Section" open={true}>
    Initially expanded content
  </AccordionItem>
</Accordion>`}</code
				></pre>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Props</h2>
		<div class="overflow-x-auto">
			<table class="table table-compact">
				<thead>
					<tr>
						<th>Component</th>
						<th>Prop</th>
						<th>Type</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td rowspan="2">Accordion</td>
						<td>class</td>
						<td>string</td>
						<td>CSS class for container</td>
					</tr>
					<tr>
						<td>children</td>
						<td>Snippet</td>
						<td>AccordionItem components</td>
					</tr>
					<tr>
						<td rowspan="5">AccordionItem</td>
						<td>title</td>
						<td>string</td>
						<td>Header text</td>
					</tr>
					<tr>
						<td>open</td>
						<td>boolean</td>
						<td>Initially expanded</td>
					</tr>
					<tr>
						<td>class</td>
						<td>string</td>
						<td>CSS class for item</td>
					</tr>
					<tr>
						<td>children</td>
						<td>Snippet</td>
						<td>Content to display</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Features</h2>
		<ul class="list-disc pl-6 space-y-2">
			<li>✅ Mobile-first design with touch support</li>
			<li>✅ Keyboard navigation (Enter/Space to toggle)</li>
			<li>✅ Smooth animations via DaisyUI</li>
			<li>✅ Accessible with ARIA attributes</li>
			<li>✅ DaisyUI theming support</li>
			<li>✅ Multiple items can be expanded simultaneously</li>
		</ul>
	</div>
</div>
