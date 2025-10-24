<script lang="ts">
	import PullToRefresh from '$lib/components/refresh/PullToRefresh.svelte';

	let refreshing = $state(false);
	let items = $state([
		'Item 1',
		'Item 2',
		'Item 3',
		'Item 4',
		'Item 5',
		'Item 6',
		'Item 7',
		'Item 8'
	]);
	let refreshCount = $state(0);

	async function handleRefresh() {
		refreshing = true;

		// Simulate network request
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Add new item at the top
		refreshCount++;
		items = [`New Item ${refreshCount}`, ...items];

		refreshing = false;
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-4">Pull to Refresh</h1>

	<div class="prose mb-6">
		<p>
			A mobile-optimized pull-to-refresh component. Pull down on the content area to trigger a
			refresh action.
		</p>
		<p class="text-sm text-base-content/70">
			Note: This component is touch-only and works best on mobile devices or touch-enabled
			screens.
		</p>
	</div>

	<div class="card bg-base-200 shadow-xl">
		<div class="card-body p-0">
			<h2 class="card-title px-6 pt-6">Demo: Pull to Add Items</h2>

			<!-- Pull to Refresh Container -->
			<PullToRefresh
				onrefresh={handleRefresh}
				bind:refreshing
				class="h-[500px] px-6 pb-6"
			>
				<div class="space-y-2">
					{#each items as item, i (item)}
						<div
							class="p-4 bg-base-100 rounded-lg shadow"
							style="animation: slideIn 0.3s ease-out;"
						>
							<div class="flex items-center justify-between">
								<span class="font-medium">{item}</span>
								<span class="badge badge-neutral">#{items.length - i}</span>
							</div>
						</div>
					{/each}
				</div>
			</PullToRefresh>
		</div>
	</div>

	<!-- Custom Indicator Example -->
	<div class="card bg-base-200 shadow-xl mt-8">
		<div class="card-body p-0">
			<h2 class="card-title px-6 pt-6">Custom Indicator</h2>

			<PullToRefresh
				onrefresh={handleRefresh}
				bind:refreshing
				class="h-[400px] px-6 pb-6"
			>
				{#snippet indicator(progress)}
					<div
						class="custom-indicator"
						style="
							width: 50px;
							height: 50px;
							border-radius: 50%;
							background: linear-gradient(135deg, hsl(var(--p)) 0%, hsl(var(--s)) 100%);
							display: flex;
							align-items: center;
							justify-content: center;
							opacity: {progress};
							transform: scale({progress});
							box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
						"
					>
						<span class="text-white text-2xl">↓</span>
					</div>
				{/snippet}

				<div class="alert alert-info">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="stroke-current shrink-0 w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>Pull down to see the custom indicator!</span>
				</div>

				<div class="grid grid-cols-2 gap-4 mt-4">
					{#each [1, 2, 3, 4, 5, 6] as num}
						<div class="stat bg-base-100 shadow rounded-lg">
							<div class="stat-title">Card {num}</div>
							<div class="stat-value text-primary">{num * 100}</div>
							<div class="stat-desc">Sample data</div>
						</div>
					{/each}
				</div>
			</PullToRefresh>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 shadow-xl mt-8">
		<div class="card-body">
			<h2 class="card-title">Props</h2>

			<div class="overflow-x-auto">
				<table class="table table-zebra">
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
							<td><code>onrefresh</code></td>
							<td><code>() =&gt; void | Promise&lt;void&gt;</code></td>
							<td>-</td>
							<td>Callback fired when refresh is triggered</td>
						</tr>
						<tr>
							<td><code>refreshing</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Whether a refresh is currently in progress (bindable)</td>
						</tr>
						<tr>
							<td><code>threshold</code></td>
							<td><code>number</code></td>
							<td><code>80</code></td>
							<td>Minimum pull distance in pixels to trigger refresh</td>
						</tr>
						<tr>
							<td><code>maxPullDistance</code></td>
							<td><code>number</code></td>
							<td><code>120</code></td>
							<td>Maximum pull distance in pixels</td>
						</tr>
						<tr>
							<td><code>resistance</code></td>
							<td><code>number</code></td>
							<td><code>2.5</code></td>
							<td>Resistance factor for pull (higher = more resistance)</td>
						</tr>
						<tr>
							<td><code>indicator</code></td>
							<td><code>Snippet&lt;[number]&gt;</code></td>
							<td>-</td>
							<td>Custom refresh indicator snippet (receives progress 0-1)</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Scrollable content</td>
						</tr>
						<tr>
							<td><code>class</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Additional CSS classes</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>

<style>
	@keyframes slideIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
