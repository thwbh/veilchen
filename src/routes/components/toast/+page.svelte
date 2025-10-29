<script lang="ts">
	import { toast } from '$lib/components/toast/toast.svelte.js';
	import ToastContainer from '$lib/components/toast/ToastContainer.svelte';
	import { AlertType } from '$lib/enum/enum.js';

	function showSuccess() {
		toast.success('Operation completed successfully!');
	}

	function showError() {
		toast.error('An error occurred while processing your request.');
	}

	function showWarning() {
		toast.warning('Please review your settings before continuing.');
	}

	function showInfo() {
		toast.info('New updates are available for download.');
	}

	function showMultiple() {
		toast.info('First notification');
		setTimeout(() => toast.success('Second notification'), 300);
		setTimeout(() => toast.warning('Third notification'), 600);
		setTimeout(() => toast.error('Fourth notification'), 900);
	}

	function showLongDuration() {
		toast.info('This message will stay for 10 seconds', 10000);
	}

	function showPersistent() {
		toast.add('This message stays until dismissed', {
			type: AlertType.Warning,
			duration: 0,
			dismissible: true
		});
	}

	function clearAll() {
		toast.clear();
	}

	function simulateApiSuccess() {
		setTimeout(() => {
			toast.success('User profile updated successfully!', 3000);
		}, 1000);
	}

	function simulateApiError() {
		setTimeout(() => {
			toast.error('Failed to connect to server. Please try again.', 5000);
		}, 1000);
	}
</script>

<ToastContainer position="top" align="center" />

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">Toast / Snackbar Examples</h1>
	<p class="mb-4 text-sm opacity-70">
		Programmatic notifications with swipe-to-dismiss support
	</p>

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
		<span><strong>Try it:</strong> Swipe toasts left or right to dismiss them!</span>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Basic Toast Types</h2>
		<div class="grid grid-cols-2 gap-3">
			<button class="btn btn-success" onclick={showSuccess}>Success Toast</button>
			<button class="btn btn-error" onclick={showError}>Error Toast</button>
			<button class="btn btn-warning" onclick={showWarning}>Warning Toast</button>
			<button class="btn btn-info" onclick={showInfo}>Info Toast</button>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Multiple Toasts</h2>
		<p class="mb-2 text-sm opacity-70">
			When multiple toasts are triggered, they stack vertically. As toasts dismiss, others move up.
		</p>
		<button class="btn btn-primary" onclick={showMultiple}>Show Multiple Toasts</button>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Custom Duration</h2>
		<div class="flex gap-3">
			<button class="btn btn-secondary" onclick={showLongDuration}>Long Duration (10s)</button>
			<button class="btn btn-accent" onclick={showPersistent}>Persistent (Manual Dismiss)</button>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">API Simulation</h2>
		<p class="mb-2 text-sm opacity-70">
			Common use case: showing feedback after API calls complete
		</p>
		<div class="flex gap-3">
			<button class="btn btn-success btn-outline" onclick={simulateApiSuccess}>
				Simulate API Success
			</button>
			<button class="btn btn-error btn-outline" onclick={simulateApiError}>
				Simulate API Error
			</button>
		</div>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Clear All Toasts</h2>
		<button class="btn btn-ghost" onclick={clearAll}>Clear All Notifications</button>
	</div>

	<div class="mt-4 rounded-lg bg-base-200 p-4">
		<h3 class="mb-2 font-bold">Features</h3>
		<ul class="mb-4 list-inside list-disc space-y-1 text-sm">
			<li>Auto-dismiss with configurable duration</li>
			<li>Swipe left or right to dismiss (touch & pointer support)</li>
			<li>Toasts fly to top/bottom when closing based on position</li>
			<li>Multiple toasts stack vertically and shift up as they dismiss</li>
			<li>Visual feedback with opacity change during swipe</li>
		</ul>

		<h3 class="mb-2 font-bold">Usage</h3>
		<div class="text-sm">
			<p class="mb-2">1. Add the ToastContainer to your root layout:</p>
			<pre class="mb-4 rounded bg-base-300 p-2"><code
					>&lt;ToastContainer position="top" align="center" /&gt;</code
				></pre>

			<p class="mb-2">2. Trigger toasts programmatically from anywhere:</p>
			<pre class="mb-2 rounded bg-base-300 p-2"><code>import &#123; toast &#125; from '@thwbh/veilchen';</code
				></pre>
			<pre class="mb-2 rounded bg-base-300 p-2"><code>toast.success('Success message');</code></pre>
			<pre class="mb-2 rounded bg-base-300 p-2"><code>toast.error('Error message');</code></pre>
			<pre class="mb-2 rounded bg-base-300 p-2"><code
					>toast.warning('Warning message');</code
				></pre>
			<pre class="rounded bg-base-300 p-2"><code>toast.info('Info message');</code></pre>
		</div>
	</div>
</div>
