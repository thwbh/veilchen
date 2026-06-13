<script lang="ts">
	import EmptyState from '$lib/components/emptystate/EmptyState.svelte';
	import { createRawSnippet } from 'svelte';
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">EmptyState Examples</h1>
	<p class="mb-4 text-sm opacity-70">Placeholder content for when no data is available</p>

	<div>
		<h2 class="mb-2 text-xl font-bold">Basic Empty State</h2>
		<div class="border border-base-300 rounded-lg p-4">
			<EmptyState
				icon="📭"
				title="No Messages"
				description="You don't have any messages yet. Start a conversation!"
			>
				<button class="btn btn-primary btn-sm">Compose Message</button>
			</EmptyState>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Custom Icon</h2>
		<div class="border border-base-300 rounded-lg p-4">
			<EmptyState
				icon="📊"
				title="No Data Available"
				description="There's no data to display for this view."
			>
				<button class="btn btn-outline btn-sm">Refresh</button>
			</EmptyState>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Without Description</h2>
		<div class="border border-base-300 rounded-lg p-4">
			<EmptyState icon="📂" title="Empty Folder">
				<button class="btn btn-sm btn-success">Create New</button>
			</EmptyState>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Multiple Actions</h2>
		<div class="border border-base-300 rounded-lg p-4">
			<EmptyState
				icon="🔍"
				title="No Results Found"
				description="Try adjusting your search criteria or filters."
			>
				<div class="flex flex-wrap gap-2">
					<button class="btn btn-primary btn-sm">Reset Filters</button>
					<button class="btn btn-outline btn-sm">Browse All</button>
				</div>
			</EmptyState>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Code Example</h2>
		<div class="mockup-code">
			<pre><code
					>{`import { EmptyState } from 'veilchen';

<!-- Basic empty state -->
<EmptyState
  icon="📭"
  title="No Messages"
  description="You don't have any messages yet"
>
  <button class="btn btn-primary">Compose</button>
</EmptyState>

<!-- Custom SVG icon -->
<EmptyState
  icon={
    <svelte:fragment slot="icon">
      <svg>...</svg>
    </svelte:fragment>
  }
  title="No Data"
>
  <button class="btn btn-outline">Refresh</button>
</EmptyState>`}</code
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
						<th>Required</th>
						<th>Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>icon</td>
						<td>Snippet | string</td>
						<td>No</td>
						<td>Icon (emoji or SVG snippet)</td>
					</tr>
					<tr>
						<td>title</td>
						<td>string</td>
						<td>Yes</td>
						<td>Main title text</td>
					</tr>
					<tr>
						<td>description</td>
						<td>string</td>
						<td>No</td>
						<td>Optional description text</td>
					</tr>
					<tr>
						<td>class</td>
						<td>string</td>
						<td>No</td>
						<td>Additional CSS classes</td>
					</tr>
					<tr>
						<td>children</td>
						<td>Snippet</td>
						<td>No</td>
						<td>Action buttons/content</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Features</h2>
		<ul class="list-disc pl-6 space-y-2">
			<li>✅ Custom icon support (emoji or SVG)</li>
			<li>✅ Title and optional description</li>
			<li>✅ Action button slot for user interactions</li>
			<li>✅ Centered responsive layout</li>
			<li>✅ Accessible semantic HTML</li>
			<li>✅ Mobile-optimized design</li>
			<li>✅ DaisyUI theme integration</li>
		</ul>
	</div>

	<div class="card bg-base-200 p-4">
		<h2 class="mb-2 text-xl font-bold">Use Cases</h2>
		<ul class="list-disc pl-6 space-y-2">
			<li>Empty search results</li>
			<li>No data in lists/tables</li>
			<li>Onboarding empty states</li>
			<li>Error states with recovery actions</li>
			<li>Loading placeholders</li>
			<li>First-time user guidance</li>
		</ul>
	</div>
</div>
