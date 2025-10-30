<script lang="ts">
	import Menu from '$lib/components/menu/Menu.svelte';
	import { MenuSize } from '$lib/index.js';
	import type { MenuItem, MenuTitle } from '$lib/types/types.js';

	let clickedItem = $state<string | null>(null);
	let activeItemId = $state<string>('item1');

	function handleItemClick(label: string) {
		clickedItem = label;
		setTimeout(() => (clickedItem = null), 2000);
	}

	const basicItems: MenuItem[] = [
		{ id: 'item1', label: 'Item 1', onclick: () => handleItemClick('Item 1') },
		{ id: 'item2', label: 'Item 2', onclick: () => handleItemClick('Item 2') },
		{ id: 'item3', label: 'Item 3', onclick: () => handleItemClick('Item 3') }
	];

	const withIconsItems: MenuItem[] = [
		{
			id: 'home',
			label: 'Home',
			onclick: () => handleItemClick('Home'),
			icon: () => {
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>` as any;
			}
		},
		{
			id: 'search',
			label: 'Search',
			onclick: () => handleItemClick('Search'),
			icon: () => {
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>` as any;
			}
		},
		{
			id: 'settings',
			label: 'Settings',
			onclick: () => handleItemClick('Settings'),
			icon: () => {
				return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>` as any;
			}
		}
	];

	const nestedItems: MenuItem[] = [
		{ id: 'dashboard', label: 'Dashboard', active: true },
		{
			id: 'projects',
			label: 'Projects',
			submenuOpen: true,
			submenu: [
				{ id: 'all-projects', label: 'All Projects', onclick: () => handleItemClick('All Projects') },
				{ id: 'active', label: 'Active', onclick: () => handleItemClick('Active') },
				{ id: 'archived', label: 'Archived', onclick: () => handleItemClick('Archived') }
			]
		},
		{ id: 'team', label: 'Team' },
		{
			id: 'settings-menu',
			label: 'Settings',
			submenu: [
				{ id: 'profile', label: 'Profile', onclick: () => handleItemClick('Profile') },
				{ id: 'account', label: 'Account', onclick: () => handleItemClick('Account') },
				{ id: 'privacy', label: 'Privacy', onclick: () => handleItemClick('Privacy') }
			]
		}
	];

	const sections: MenuTitle[] = [
		{
			id: 'section1',
			title: 'General',
			items: [
				{ id: 's1-item1', label: 'Dashboard', active: true },
				{ id: 's1-item2', label: 'Inbox' }
			]
		},
		{
			id: 'section2',
			title: 'Actions',
			items: [
				{ id: 's2-item1', label: 'Create New' },
				{ id: 's2-item2', label: 'Import' },
				{ id: 's2-item3', label: 'Export' }
			]
		}
	];

	const statesItems: MenuItem[] = [
		{ id: 'normal', label: 'Normal Item' },
		{ id: 'active-item', label: 'Active Item', active: true },
		{ id: 'disabled-item', label: 'Disabled Item', disabled: true }
	];
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-3xl font-bold">Menu</h1>

	<div class="prose mb-6">
		<p>
			Vertical or horizontal menu component with support for nested submenus, titles, icons, and
			various states. Built with DaisyUI styling.
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
			<span>Clicked: {clickedItem}</span>
		</div>
	{/if}

	<!-- Basic Menu -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Basic Menu</h2>
			<p class="text-base-content/70 mb-4 text-sm">Simple vertical menu with clickable items</p>
			<Menu items={basicItems} />
		</div>
	</div>

	<!-- With Icons -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">With Icons</h2>
			<p class="text-base-content/70 mb-4 text-sm">Menu items with icon snippets</p>
			<Menu items={withIconsItems} />
		</div>
	</div>

	<!-- Nested Submenu -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Nested Submenus</h2>
			<p class="text-base-content/70 mb-4 text-sm">Collapsible nested menu items</p>
			<Menu items={nestedItems} />
		</div>
	</div>

	<!-- With Sections/Titles -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">With Section Titles</h2>
			<p class="text-base-content/70 mb-4 text-sm">Organized menu with section headers</p>
			<Menu sections={sections} />
		</div>
	</div>

	<!-- Sizes -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Sizes</h2>
			<p class="text-base-content/70 mb-4 text-sm">Different size variants</p>
			<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Extra Small</span>
					<Menu items={basicItems} size={MenuSize.XS} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Small</span>
					<Menu items={basicItems} size={MenuSize.SM} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Medium</span>
					<Menu items={basicItems} size={MenuSize.MD} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Large</span>
					<Menu items={basicItems} size={MenuSize.LG} />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Extra Large</span>
					<Menu items={basicItems} size={MenuSize.XL} />
				</div>
			</div>
		</div>
	</div>

	<!-- Horizontal -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Horizontal Orientation</h2>
			<p class="text-base-content/70 mb-4 text-sm">Menu displayed horizontally</p>
			<Menu items={withIconsItems} orientation="horizontal" width="w-full" />
		</div>
	</div>

	<!-- States -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Item States</h2>
			<p class="text-base-content/70 mb-4 text-sm">Active and disabled menu items</p>
			<Menu items={statesItems} />
		</div>
	</div>

	<!-- Customization -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Customization</h2>
			<p class="text-base-content/70 mb-4 text-sm">Custom styling options</p>
			<div class="grid gap-4 md:grid-cols-2">
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">No Background</span>
					<Menu items={basicItems} background="bg-transparent" rounded={false} width="w-full" />
				</div>
				<div>
					<span class="mb-2 block text-xs font-semibold uppercase opacity-70">Base-300</span>
					<Menu items={basicItems} background="bg-base-300" width="w-full" />
				</div>
			</div>
		</div>
	</div>

	<!-- Real-world Example -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Real-world Example: Sidebar Navigation</h2>
			<div class="bg-base-100 mt-4 grid gap-4 rounded-lg p-6 md:grid-cols-[250px_1fr]">
				<Menu
					items={[
						{
							id: 'overview',
							label: 'Overview',
							active: true,
							icon: () => {
								return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>` as any;
							}
						},
						{
							id: 'analytics',
							label: 'Analytics',
							icon: () => {
								return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>` as any;
							}
						},
						{
							id: 'users',
							label: 'Users',
							submenuOpen: false,
							submenu: [
								{ id: 'all-users', label: 'All Users' },
								{ id: 'add-user', label: 'Add User' }
							]
						},
						{ id: 'settings-sidebar', label: 'Settings' }
					]}
					width="w-full"
				/>
				<div>
					<h3 class="mb-4 text-xl font-bold">Overview Dashboard</h3>
					<div class="grid gap-4 md:grid-cols-2">
						<div class="card bg-base-200 shadow">
							<div class="card-body p-4">
								<h4 class="font-semibold">Total Users</h4>
								<p class="text-2xl font-bold">1,234</p>
							</div>
						</div>
						<div class="card bg-base-200 shadow">
							<div class="card-body p-4">
								<h4 class="font-semibold">Active Sessions</h4>
								<p class="text-2xl font-bold">456</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Menu Props</h2>

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
							<td><code>MenuItem[]</code></td>
							<td><code>[]</code></td>
							<td>Array of menu items to display</td>
						</tr>
						<tr>
							<td><code>sections</code></td>
							<td><code>MenuTitle[]</code></td>
							<td><code>[]</code></td>
							<td>Array of menu sections with titles</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>MenuSize</code></td>
							<td><code>MenuSize.MD</code></td>
							<td>Size variant (XS, SM, MD, LG, XL)</td>
						</tr>
						<tr>
							<td><code>orientation</code></td>
							<td><code>'vertical' | 'horizontal'</code></td>
							<td><code>'vertical'</code></td>
							<td>Layout orientation</td>
						</tr>
						<tr>
							<td><code>background</code></td>
							<td><code>string</code></td>
							<td><code>'bg-base-200'</code></td>
							<td>Background CSS class</td>
						</tr>
						<tr>
							<td><code>rounded</code></td>
							<td><code>boolean</code></td>
							<td><code>true</code></td>
							<td>Apply rounded corners</td>
						</tr>
						<tr>
							<td><code>width</code></td>
							<td><code>string</code></td>
							<td><code>'w-56'</code></td>
							<td>Width CSS class</td>
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
			<h2 class="card-title">MenuItem Interface</h2>

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
							<td>Unique identifier for the menu item</td>
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
							<td>Optional icon snippet</td>
						</tr>
						<tr>
							<td><code>active</code></td>
							<td><code>boolean (optional)</code></td>
							<td>Mark item as active</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean (optional)</code></td>
							<td>Mark item as disabled</td>
						</tr>
						<tr>
							<td><code>submenu</code></td>
							<td><code>MenuItem[] (optional)</code></td>
							<td>Nested submenu items</td>
						</tr>
						<tr>
							<td><code>submenuOpen</code></td>
							<td><code>boolean (optional)</code></td>
							<td>Whether submenu is open by default</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">MenuTitle Interface</h2>

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
							<td>Unique identifier for the title</td>
						</tr>
						<tr>
							<td><code>title</code></td>
							<td><code>string</code></td>
							<td>Title text to display</td>
						</tr>
						<tr>
							<td><code>items</code></td>
							<td><code>MenuItem[] (optional)</code></td>
							<td>Optional menu items under this title</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
