<script lang="ts">
	import Breadcrumbs from '$lib/components/navigation/Breadcrumbs.svelte';
	import { TextSize } from '$lib/index.js';
	import type { BreadcrumbItem } from '$lib/types/types.js';
	import HomeIcon from './HomeIcon.svelte';
	import FolderIcon from './FolderIcon.svelte';
	import DocumentIcon from './DocumentIcon.svelte';

	let clickedItem = $state<string | null>(null);

	const basicBreadcrumbs: BreadcrumbItem[] = [
		{ id: '1', label: 'Home', href: '/' },
		{ id: '2', label: 'Components', href: '/components' },
		{ id: '3', label: 'Breadcrumbs' }
	];

	const withIconsBreadcrumbs: BreadcrumbItem[] = [
		{ id: '1', label: 'Home', href: '/', icon: HomeIcon },
		{ id: '2', label: 'Documents', href: '/documents', icon: FolderIcon },
		{ id: '3', label: 'Add Document', icon: DocumentIcon }
	];


	const longBreadcrumbs: BreadcrumbItem[] = [
		{ id: '1', label: 'Home', href: '/' },
		{ id: '2', label: 'Products', href: '/products' },
		{ id: '3', label: 'Electronics', href: '/products/electronics' },
		{ id: '4', label: 'Computers', href: '/products/electronics/computers' },
		{ id: '5', label: 'Laptops', href: '/products/electronics/computers/laptops' },
		{ id: '6', label: 'Gaming Laptops' }
	];

	const clickableBreadcrumbs: BreadcrumbItem[] = [
		{
			id: '1',
			label: 'Dashboard',
			onclick: () => {
				clickedItem = 'Dashboard';
				setTimeout(() => (clickedItem = null), 2000);
			}
		},
		{
			id: '2',
			label: 'Settings',
			onclick: () => {
				clickedItem = 'Settings';
				setTimeout(() => (clickedItem = null), 2000);
			}
		},
		{ id: '3', label: 'Profile' }
	];
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-3xl font-bold">Breadcrumbs</h1>

	<div class="prose mb-6">
		<p>
			Breadcrumbs show the current location within a hierarchy and allow navigation to parent
			pages. Perfect for multi-level navigation structures.
		</p>
	</div>

	{#if clickedItem}
		<div class="alert alert-info mb-4">
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
			<span>Clicked on: {clickedItem}</span>
		</div>
	{/if}

	<!-- Basic Breadcrumbs -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Basic Breadcrumbs</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Simple breadcrumb navigation with links and a current page indicator
			</p>
			<Breadcrumbs items={basicBreadcrumbs} />
		</div>
	</div>

	<!-- With Icons -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">With Icons</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Breadcrumbs with icon components for visual clarity
			</p>
			<Breadcrumbs items={withIconsBreadcrumbs} />
		</div>
	</div>

	<!-- Sizes -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Sizes</h2>
			<p class="text-base-content/70 mb-4 text-sm">Different text size variants</p>
			<div class="space-y-4">
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Extra Small</span>
					<Breadcrumbs items={basicBreadcrumbs} size={TextSize.XS} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Small</span>
					<Breadcrumbs items={basicBreadcrumbs} size={TextSize.SM} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Medium</span>
					<Breadcrumbs items={basicBreadcrumbs} size={TextSize.MD} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Large</span>
					<Breadcrumbs items={basicBreadcrumbs} size={TextSize.LG} />
				</div>
			</div>
		</div>
	</div>

	<!-- Scrollable -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Scrollable (Long Breadcrumbs)</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Enable horizontal scrolling for long breadcrumb paths
			</p>
			<Breadcrumbs items={longBreadcrumbs} scrollable />
		</div>
	</div>

	<!-- Clickable Handlers -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">With Click Handlers</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Breadcrumbs with onclick handlers instead of href links
			</p>
			<Breadcrumbs items={clickableBreadcrumbs} />
		</div>
	</div>

	<!-- Real-world Example -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Real-world Example: E-commerce Navigation</h2>
			<div class="bg-base-100 mt-4 rounded-lg p-6">
				<Breadcrumbs items={longBreadcrumbs} size={TextSize.SM} />
				<div class="divider"></div>
				<h3 class="mb-4 text-2xl font-bold">Gaming Laptops</h3>
				<div class="grid gap-4 md:grid-cols-2">
					<div class="card bg-base-200 shadow">
						<div class="card-body p-4">
							<h4 class="font-semibold">Product 1</h4>
							<p class="text-sm opacity-70">High-performance gaming laptop</p>
						</div>
					</div>
					<div class="card bg-base-200 shadow">
						<div class="card-body p-4">
							<h4 class="font-semibold">Product 2</h4>
							<p class="text-sm opacity-70">Budget gaming laptop</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Breadcrumbs Props</h2>

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
							<td><code>items</code></td>
							<td><code>BreadcrumbItem[]</code></td>
							<td>-</td>
							<td>Array of breadcrumb items to display</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>TextSize</code></td>
							<td><code>TextSize.SM</code></td>
							<td>Text size variant (XS, SM, MD, LG, XL)</td>
						</tr>
						<tr>
							<td><code>scrollable</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Enable horizontal scrolling for long breadcrumbs</td>
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

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">BreadcrumbItem Interface</h2>

			<div class="overflow-x-auto">
				<table class="table-zebra table">
					<thead>
						<tr>
							<th>Property</th>
							<th>Type</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><code>id</code></td>
							<td><code>string</code></td>
							<td>Unique identifier for the breadcrumb</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td>Label text to display</td>
						</tr>
						<tr>
							<td><code>href</code></td>
							<td><code>string (optional)</code></td>
							<td>Optional href for navigation</td>
						</tr>
						<tr>
							<td><code>onclick</code></td>
							<td><code>() =&gt; void (optional)</code></td>
							<td>Optional click handler</td>
						</tr>
						<tr>
							<td><code>icon</code></td>
							<td><code>Snippet (optional)</code></td>
							<td>Optional icon snippet for this breadcrumb</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="alert alert-info mt-4">
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
					The last item in the breadcrumbs array is automatically rendered as non-clickable,
					representing the current page.
				</span>
			</div>
		</div>
	</div>
</div>
