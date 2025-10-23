<script lang="ts">
	import BottomNavigation from '$lib/components/navigation/BottomNavigation.svelte';

	// Example 1: Basic Bottom Navigation
	let activeTab1 = $state('home');

	const items1 = [
		{
			id: 'home',
			label: 'Home',
			icon: () => '🏠'
		},
		{
			id: 'search',
			label: 'Search',
			icon: () => '🔍'
		},
		{
			id: 'profile',
			label: 'Profile',
			icon: () => '👤'
		}
	];

	// Example 2: Four Items
	let activeTab2 = $state('feed');

	const items2 = [
		{
			id: 'feed',
			label: 'Feed',
			icon: () => '📰'
		},
		{
			id: 'explore',
			label: 'Explore',
			icon: () => '🧭'
		},
		{
			id: 'notifications',
			label: 'Alerts',
			icon: () => '🔔'
		},
		{
			id: 'settings',
			label: 'Settings',
			icon: () => '⚙️'
		}
	];

	// Example 3: With Change Handler
	let activeTab3 = $state('dashboard');
	let lastAction = $state('');

	const items3 = [
		{
			id: 'dashboard',
			label: 'Dashboard',
			icon: () => '📊'
		},
		{
			id: 'analytics',
			label: 'Analytics',
			icon: () => '📈'
		},
		{
			id: 'reports',
			label: 'Reports',
			icon: () => '📋'
		}
	];

	function handleTabChange(id: string) {
		activeTab3 = id;
		lastAction = `Navigated to ${id} at ${new Date().toLocaleTimeString()}`;
		console.log('Tab changed to:', id);
	}
</script>

<div class="flex flex-col gap-6 p-4 pb-32">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Bottom Navigation</h2>
		<p class="mb-4 text-sm opacity-70">Three-item navigation with icons</p>

		<div class="mockup-phone">
			<div class="camera"></div>
			<div class="display">
				<div class="artboard artboard-demo phone-1 relative">
					<div class="flex h-full items-center justify-center">
						<div class="text-center">
							<p class="mb-4 text-6xl">
								{items1.find((item) => item.id === activeTab1)?.icon?.() || ''}
							</p>
							<p class="text-lg font-semibold">
								{items1.find((item) => item.id === activeTab1)?.label || ''}
							</p>
							<p class="text-sm opacity-60">Current View</p>
						</div>
					</div>

					<BottomNavigation
						items={items1}
						activeId={activeTab1}
						onitemclick={(id) => (activeTab1 = id)}
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Four Items Navigation</h2>
		<p class="mb-4 text-sm opacity-70">Navigation with four tabs</p>

		<div class="mockup-phone">
			<div class="camera"></div>
			<div class="display">
				<div class="artboard artboard-demo phone-1 relative">
					<div class="flex h-full items-center justify-center">
						<div class="text-center">
							<p class="mb-4 text-6xl">
								{items2.find((item) => item.id === activeTab2)?.icon?.() || ''}
							</p>
							<p class="text-lg font-semibold">
								{items2.find((item) => item.id === activeTab2)?.label || ''}
							</p>
							<p class="text-sm opacity-60">Active Tab</p>
						</div>
					</div>

					<BottomNavigation
						items={items2}
						activeId={activeTab2}
						onitemclick={(id) => (activeTab2 = id)}
					/>
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: With Change Handler</h2>
		<p class="mb-4 text-sm opacity-70">Fires callback on tab change (check console)</p>

		<div class="mockup-phone">
			<div class="camera"></div>
			<div class="display">
				<div class="artboard artboard-demo phone-1 relative">
					<div class="flex h-full flex-col items-center justify-center gap-4 p-4">
						<div class="text-center">
							<p class="mb-4 text-6xl">
								{items3.find((item) => item.id === activeTab3)?.icon?.() || ''}
							</p>
							<p class="text-lg font-semibold">
								{items3.find((item) => item.id === activeTab3)?.label || ''}
							</p>
						</div>

						{#if lastAction}
							<div class="alert alert-info max-w-xs">
								<span class="text-xs">{lastAction}</span>
							</div>
						{/if}
					</div>

					<BottomNavigation items={items3} activeId={activeTab3} onitemclick={handleTabChange} />
				</div>
			</div>
		</div>
	</div>
</div>
