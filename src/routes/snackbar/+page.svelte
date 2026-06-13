<script lang="ts">
	import { snackbar } from '$lib/components/snackbar/snackbar.svelte.js';
	import type { SnackbarDismissReason } from '$lib/components/snackbar/snackbar.svelte.js';
	import SnackbarContainer from '$lib/components/snackbar/SnackbarContainer.svelte';

	let deletedItems: string[] = [];
	let items = $state(['Item 1', 'Item 2', 'Item 3']);
	let actionCount = $state(0);
	let timeoutCount = $state(0);
	let manualCount = $state(0);

	function deleteItems() {
		deletedItems = [...items];
		items = [];

		snackbar.add('3 items deleted', {
			actionLabel: 'Undo',
			onAction: () => {
				items = [...deletedItems];
				deletedItems = [];
				actionCount++;
			},
			onDismiss: (reason: SnackbarDismissReason) => {
				if (reason === 'action') {
					actionCount++;
				} else if (reason === 'timeout') {
					timeoutCount++;
				} else if (reason === 'manual') {
					manualCount++;
				}
			},
			duration: 5000
		});
	}

	function showSimpleSnackbar() {
		snackbar.show('Operation completed successfully');
	}

	function showCustomSnackbar() {
		snackbar.add('Custom snackbar with 3 second duration', {
			duration: 3000,
			dismissible: true
		});
	}

	function showPersistentSnackbar() {
		snackbar.add('This snackbar requires manual dismissal', {
			duration: 0,
			dismissible: true
		});
	}

	function showNonDismissibleSnackbar() {
		snackbar.add('Important message (no dismiss button)', {
			duration: 5000,
			dismissible: false
		});
	}

	function showActionOnlySnackbar() {
		snackbar.add('Do you want to proceed?', {
			actionLabel: 'Yes',
			onAction: () => {
				snackbar.show('Action confirmed!', undefined, undefined, 2000);
			},
			duration: 0,
			dismissible: true
		});
	}

	function showMultipleSnackbars() {
		snackbar.add('First message', { duration: 2000 });
		setTimeout(() => {
			snackbar.add('Second message', { duration: 2000 });
		}, 500);
		setTimeout(() => {
			snackbar.add('Third message', { duration: 2000 });
		}, 1000);
	}

	function clearAllSnackbars() {
		snackbar.clear();
	}

	function resetCounters() {
		actionCount = 0;
		timeoutCount = 0;
		manualCount = 0;
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-3xl font-bold">Snackbar Component</h1>

	<div class="prose mb-6">
		<p>
			Transient notification surface with optional action button, designed for the "undo" pattern
			and other user feedback scenarios. Snackbars differ from Toasts by supporting action callbacks
			and richer lifecycle management.
		</p>
	</div>

	<!-- Basic Examples -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Basic Examples</h2>

			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<button class="btn btn-primary" onclick={showSimpleSnackbar}> Simple Snackbar </button>
				<button class="btn btn-secondary" onclick={showCustomSnackbar}>
					Custom Duration (3s)
				</button>
				<button class="btn btn-accent" onclick={showPersistentSnackbar}>
					Persistent (Manual Dismiss)
				</button>
				<button class="btn btn-info" onclick={showNonDismissibleSnackbar}> Non-Dismissible </button>
			</div>
		</div>
	</div>

	<!-- Undo Pattern -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Undo Pattern (Main Use Case)</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				The canonical undo pattern: perform an action optimistically, offer undo via snackbar action
				button.
			</p>

			<div class="flex flex-col gap-4">
				<button class="btn btn-error" onclick={deleteItems} disabled={items.length === 0}>
					Delete Items (Undo Demo)
				</button>

				<div class="mt-4">
					<h3 class="mb-2 font-semibold">Current Items:</h3>
					{#if items.length > 0}
						<ul class="list-disc pl-5">
							{#each items as item}
								<li>{item}</li>
							{/each}
						</ul>
					{:else}
						<p class="text-gray-500">No items (deleted)</p>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Action Button Examples -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Action Button Examples</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Snackbars can include a single action button for user interaction.
			</p>

			<div class="flex flex-col gap-4">
				<button class="btn btn-success" onclick={showActionOnlySnackbar}>
					Action-Only Snackbar
				</button>
				<button class="btn btn-warning" onclick={showMultipleSnackbars}>
					Multiple Snackbars
				</button>
			</div>
		</div>
	</div>

	<!-- Dismiss Statistics -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Dismiss Statistics</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Track how snackbars are dismissed (action, timeout, or manual).
			</p>

			<div class="stats stats-vertical shadow lg:stats-horizontal">
				<div class="stat">
					<div class="stat-title">Action Dismisses</div>
					<div class="stat-value">{actionCount}</div>
					<div class="stat-desc">User clicked action button</div>
				</div>

				<div class="stat">
					<div class="stat-title">Timeout Dismisses</div>
					<div class="stat-value">{timeoutCount}</div>
					<div class="stat-desc">Auto-dismissed after duration</div>
				</div>

				<div class="stat">
					<div class="stat-title">Manual Dismisses</div>
					<div class="stat-value">{manualCount}</div>
					<div class="stat-desc">User clicked close button</div>
				</div>
			</div>

			<div class="mt-4 flex gap-4">
				<button class="btn btn-ghost" onclick={clearAllSnackbars}> Clear All Snackbars </button>
				<button class="btn btn-ghost" onclick={resetCounters}> Reset Counters </button>
			</div>
		</div>
	</div>

	<!-- Position Examples -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Position Examples</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				SnackbarContainer supports different positions and alignments.
			</p>

			<div class="space-y-4">
				<div>
					<h3 class="mb-2 font-semibold">Top Position</h3>
					<div class="mockup-code">
						<pre><code>&lt;SnackbarContainer position="top" align="center" /&gt;</code></pre>
					</div>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Bottom Position (Default)</h3>
					<div class="mockup-code">
						<pre><code>&lt;SnackbarContainer position="bottom" align="center" /&gt;</code></pre>
					</div>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Alignment Options</h3>
					<div class="mockup-code">
						<pre><code>&lt;SnackbarContainer position="bottom" align="start" /&gt;</code></pre>
						<pre><code>&lt;SnackbarContainer position="bottom" align="center" /&gt;</code></pre>
						<pre><code>&lt;SnackbarContainer position="bottom" align="end" /&gt;</code></pre>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Real-world Examples -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Real-world Examples</h2>

			<div class="space-y-6">
				<div>
					<h3 class="mb-2 font-semibold">Email Sent Confirmation</h3>
					<button
						class="btn btn-info"
						onclick={() =>
							snackbar.add('Email sent successfully', {
								actionLabel: 'View',
								onAction: () => alert('Opening email...'),
								duration: 4000
							})}
					>
						Simulate Email Send
					</button>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Form Submission</h3>
					<button
						class="btn btn-success"
						onclick={() =>
							snackbar.add('Profile updated successfully', {
								duration: 3000
							})}
					>
						Simulate Form Submit
					</button>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Batch Operation</h3>
					<button
						class="btn btn-warning"
						onclick={() =>
							snackbar.add('5 items archived', {
								actionLabel: 'Undo',
								onAction: () => snackbar.show('Items restored!', undefined, undefined, 2000),
								duration: 6000
							})}
					>
						Simulate Batch Archive
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Snackbar Store API</h2>

			<div class="overflow-x-auto">
				<table class="table-zebra table">
					<thead>
						<tr>
							<th>Method</th>
							<th>Parameters</th>
							<th>Returns</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>add(message, options)</code></td>
							<td>
								<code>message: string</code><br />
								<code>options?: SnackbarOptions</code>
							</td>
							<td><code>string</code> (snackbar ID)</td>
							<td>Show a snackbar with optional action</td>
						</tr>
						<tr>
							<td><code>show(message, actionLabel, onAction, duration)</code></td>
							<td>
								<code>message: string</code><br />
								<code>actionLabel?: string</code><br />
								<code>onAction?: () => void</code><br />
								<code>duration?: number</code>
							</td>
							<td><code>string</code> (snackbar ID)</td>
							<td>Convenience method for simple snackbars</td>
						</tr>
						<tr>
							<td><code>dismiss(id, reason)</code></td>
							<td>
								<code>id: string</code><br />
								<code>reason: SnackbarDismissReason</code>
							</td>
							<td><code>void</code></td>
							<td>Manually dismiss a snackbar</td>
						</tr>
						<tr>
							<td><code>clear()</code></td>
							<td>-</td>
							<td><code>void</code></td>
							<td>Clear all snackbars</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">SnackbarOptions Interface</h2>

			<div class="overflow-x-auto">
				<table class="table-zebra table">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Default</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>actionLabel</code></td>
							<td><code>string | undefined</code></td>
							<td>-</td>
							<td>Label for the action button</td>
						</tr>
						<tr>
							<td><code>onAction</code></td>
							<td><code>() => void | undefined</code></td>
							<td>-</td>
							<td>Callback when action button is clicked</td>
						</tr>
						<tr>
							<td><code>onDismiss</code></td>
							<td><code>(reason: SnackbarDismissReason) => void | undefined</code></td>
							<td>-</td>
							<td>Callback when snackbar is dismissed</td>
						</tr>
						<tr>
							<td><code>duration</code></td>
							<td><code>number | undefined</code></td>
							<td><code>5000</code></td>
							<td>Auto-dismiss timeout in milliseconds</td>
						</tr>
						<tr>
							<td><code>dismissible</code></td>
							<td><code>boolean | undefined</code></td>
							<td><code>true</code></td>
							<td>Whether to show close button</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">SnackbarContainer Props</h2>

			<div class="overflow-x-auto">
				<table class="table-zebra table">
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
							<td><code>position</code></td>
							<td><code>'top' | 'bottom'</code></td>
							<td><code>'bottom'</code></td>
							<td>Vertical position of snackbars</td>
						</tr>
						<tr>
							<td><code>align</code></td>
							<td><code>'start' | 'center' | 'end'</code></td>
							<td><code>'center'</code></td>
							<td>Horizontal alignment</td>
						</tr>
						<tr>
							<td><code>class</code></td>
							<td><code>string</code></td>
							<td><code>''</code></td>
							<td>Additional CSS classes</td>
						</tr>
						<tr>
							<td><code>swipeThreshold</code></td>
							<td><code>number</code></td>
							<td><code>100</code></td>
							<td>Minimum swipe distance to dismiss (px)</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Types</h2>

			<div class="space-y-4">
				<div>
					<h3 class="mb-2 font-semibold">SnackbarDismissReason</h3>
					<div class="mockup-code">
						<pre><code>type SnackbarDismissReason = 'timeout' | 'action' | 'manual';</code></pre>
					</div>
					<ul class="mt-2 list-inside list-disc space-y-1 text-sm">
						<li><code>'timeout'</code> - Auto-dismissed after duration</li>
						<li><code>'action'</code> - User clicked action button</li>
						<li><code>'manual'</code> - User clicked close button or swiped</li>
					</ul>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">SnackbarMessage</h3>
					<div class="mockup-code">
						<pre><code
								>interface SnackbarMessage {'{'}
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () =&gt; void;
  onDismiss?: (reason: SnackbarDismissReason) =&gt; void;
  duration?: number;
  dismissible?: boolean;
{'}'}</code
							></pre>
					</div>
				</div>
			</div>

			<div class="alert alert-info mt-6">
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
				<span>
					<strong>Key Difference from Toast:</strong> Snackbar supports action callbacks and dismiss reason
					tracking, making it ideal for undo patterns and interactive notifications.
				</span>
			</div>
		</div>
	</div>

	<!-- Usage Examples -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Usage Examples</h2>

			<div class="space-y-6">
				<div>
					<h3 class="mb-2 font-semibold">Basic Usage</h3>
					<div class="bg-base-300 rounded p-3 font-mono text-sm">
						<code>&lt;SnackbarContainer position="bottom" align="center" /&gt;</code><br /><br />
						<code>// Show a simple snackbar</code><br />
						<code>snackbar.show('Operation completed successfully');</code>
					</div>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Undo Pattern</h3>
					<div class="bg-base-300 rounded p-3 font-mono text-sm">
						<code>snackbar.add('Items deleted', {'{'}</code><br />
						<code>&nbsp;&nbsp;actionLabel: 'Undo',</code><br />
						<code>&nbsp;&nbsp;onAction: () =&gt; {'{'}</code><br />
						<code>&nbsp;&nbsp;&nbsp;&nbsp;// Restore deleted items</code><br />
						<code>&nbsp;&nbsp;&nbsp;&nbsp;items = [...deletedItems];</code><br />
						<code>&nbsp;&nbsp;{'}'},</code><br />
						<code>&nbsp;&nbsp;onDismiss: (reason) =&gt; {'{'}</code><br />
						<code>&nbsp;&nbsp;&nbsp;&nbsp;if (reason === 'timeout') {'{'}</code><br />
						<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Items permanently deleted</code><br />
						<code>&nbsp;&nbsp;&nbsp;&nbsp;{'}'}</code><br />
						<code>&nbsp;&nbsp;{'}'},</code><br />
						<code>&nbsp;&nbsp;duration: 5000</code><br />
						<code>{'}'});</code>
					</div>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Custom Duration</h3>
					<div class="bg-base-300 rounded p-3 font-mono text-sm">
						<code>// Short duration</code><br />
						<code>snackbar.add('Quick message', {'{'} duration: 2000 {'}'});</code><br /><br />
						<code>// Persistent (manual dismiss only)</code><br />
						<code>snackbar.add('Important message', {'{'} duration: 0 {'}'});</code>
					</div>
				</div>

				<div>
					<h3 class="mb-2 font-semibold">Non-Dismissible</h3>
					<div class="bg-base-300 rounded p-3 font-mono text-sm">
						<code>snackbar.add('Critical alert', {'{'}</code><br />
						<code>&nbsp;&nbsp;dismissible: false,</code><br />
						<code>&nbsp;&nbsp;duration: 5000</code><br />
						<code>{'}'});</code>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Snackbar Container (positioned at bottom) -->
	<SnackbarContainer position="bottom" align="center" />
</div>
