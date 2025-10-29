<script lang="ts">
	import BottomNavigation from '$lib/components/navigation/BottomNavigation.svelte';
	import type { BottomNavItem } from '$lib/types/types.js';
	import HomeIcon from './icons/HomeIcon.svelte';
	import SearchIcon from './icons/SearchIcon.svelte';
	import UserIcon from './icons/UserIcon.svelte';

	let activeId = $state('home');

	const demoNavItems: BottomNavItem[] = [
		{
			id: 'home',
			label: 'Home',
			icon: HomeIcon
		},
		{
			id: 'discover',
			label: 'Discover',
			icon: SearchIcon
		},
		{
			id: 'profile',
			label: 'Profile',
			icon: UserIcon
		}
	];
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-2 text-3xl font-bold">AppShell Component</h1>
	<p class="mb-4 text-sm opacity-70">
		Mobile app layout structure with bottom navigation and SvelteKit routing integration
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
		<span>Click the navigation items below to see the active state change</span>
	</div>

	<div>
		<h2 class="mb-2 text-xl font-bold">Preview</h2>
		<div class="mockup-phone border-primary">
			<div class="mockup-phone-camera"></div>
			<div class="mockup-phone-display bg-base-200">
				<div class="h-fit w-fit">
					<div class="p-4">
						<h3 class="text-xl font-bold">Active: {activeId}</h3>
						<p class="mt-2 text-sm opacity-70">
							This is the content area. It scrolls independently of the bottom navigation.
						</p>
					</div>
					<BottomNavigation items={demoNavItems} {activeId} />
				</div>
			</div>
		</div>
	</div>

	<div class="bg-base-200 mt-4 rounded-lg p-4">
		<h3 class="mb-4 text-xl font-bold">Setup Instructions</h3>

		<div class="space-y-6 text-sm">
			<div>
				<h4 class="mb-2 font-bold">Option 1: Using AppShell Component (Recommended)</h4>
				<p class="mb-3 opacity-70">
					Best for most apps. Provides layout structure and handles scroll behavior automatically.
				</p>

				<div class="space-y-3">
					<div>
						<p class="mb-2 font-semibold">1. Create a route group for your app</p>
						<pre class="bg-base-300 rounded p-3"><code
								>src/routes/
├── +layout.svelte           ← Root layout (minimal)
├── splash/
│   └── +page.svelte         ← Standalone page (no nav)
└── (app)/                   ← Route group (doesn't affect URLs)
    ├── +layout.svelte       ← AppShell goes here
    ├── +page.svelte         ← Home page (/)
    ├── discover/
    │   └── +page.svelte     ← /discover
    └── profile/
        └── +page.svelte     ← /profile</code
							></pre>
					</div>

					<div>
						<p class="mb-2 font-semibold">2. Set up your app layout with AppShell</p>
						<pre class="bg-base-300 rounded p-3"><code
								>&lt;!-- src/routes/(app)/+layout.svelte --&gt;
&lt;script lang="ts"&gt;
  import {`{`} page {`}`} from '$app/stores';
  import {`{`} AppShell {`}`} from '@thwbh/veilchen';
  import type {`{`} BottomNavItem {`}`} from '@thwbh/veilchen';
  // Import your icon components
  import HomeIcon from '$lib/icons/HomeIcon.svelte';
  import SearchIcon from '$lib/icons/SearchIcon.svelte';
  import UserIcon from '$lib/icons/UserIcon.svelte';

  let {`{`} children {`}`} = $props();

  const navItems: BottomNavItem[] = [
    {`{`}
      id: 'home',
      label: 'Home',
      href: '/',
      icon: HomeIcon
    {`}`},
    {`{`}
      id: 'discover',
      label: 'Discover',
      href: '/discover',
      icon: SearchIcon
    {`}`},
    {`{`}
      id: 'profile',
      label: 'Profile',
      href: '/profile',
      icon: UserIcon
    {`}`}
  ];

  // Automatically determine active item from current route
  const activeId = $derived(
    navItems.find(item =>
      $page.url.pathname === item.href ||
      ($page.url.pathname.startsWith(item.href) && item.href !== '/')
    )?.id
  );
&lt;/script&gt;

&lt;AppShell items={`{`}navItems{`}`} {`{`}activeId{`}`}&gt;
  {`{`}@render children(){`}`}
&lt;/AppShell&gt;</code
							></pre>
					</div>

					<div>
						<p class="mb-2 font-semibold">3. Create your page routes</p>
						<pre class="bg-base-300 rounded p-3"><code
								>&lt;!-- src/routes/(app)/+page.svelte --&gt;
&lt;div class="p-4"&gt;
  &lt;h1&gt;Home Page&lt;/h1&gt;
  &lt;p&gt;This page is rendered inside the AppShell.&lt;/p&gt;
&lt;/div&gt;

&lt;!-- src/routes/(app)/discover/+page.svelte --&gt;
&lt;div class="p-4"&gt;
  &lt;h1&gt;Discover Page&lt;/h1&gt;
&lt;/div&gt;</code
							></pre>
					</div>
				</div>
			</div>

			<div class="divider"></div>

			<div>
				<h4 class="mb-2 font-bold">Option 2: Using BottomNavigation Directly</h4>
				<p class="mb-3 opacity-70">More flexible. You control the layout structure yourself.</p>

				<pre class="bg-base-300 rounded p-3"><code
						>&lt;!-- src/routes/(app)/+layout.svelte --&gt;
&lt;script lang="ts"&gt;
  import {`{`} page {`}`} from '$app/stores';
  import {`{`} BottomNavigation {`}`} from '@thwbh/veilchen';
  import type {`{`} BottomNavItem {`}`} from '@thwbh/veilchen';

  const navItems: BottomNavItem[] = [
    {`{`} id: 'home', label: 'Home', href: '/' {`}`},
    {`{`} id: 'discover', label: 'Discover', href: '/discover' {`}`}
  ];

  $: activeId = navItems.find(item =>
    $page.url.pathname === item.href ||
    ($page.url.pathname.startsWith(item.href) && item.href !== '/')
  )?.id;
&lt;/script&gt;

&lt;div class="app-layout"&gt;
  &lt;main&gt;
    &lt;slot /&gt;
  &lt;/main&gt;
  &lt;BottomNavigation items={`{`}navItems{`}`} {`{`}activeId{`}`} /&gt;
&lt;/div&gt;

&lt;style&gt;
  .app-layout {`{`}
    display: flex;
    flex-direction: column;
    height: 100vh;
  {`}`}

  main {`{`}
    flex: 1;
    overflow-y: auto;
    padding-bottom: calc(4rem + env(safe-area-inset-bottom));
  {`}`}
&lt;/style&gt;</code
					></pre>
			</div>

			<div class="divider"></div>

			<div>
				<h4 class="mb-2 font-bold">Standalone Pages (No Navigation)</h4>
				<p class="mb-3 opacity-70">Pages outside the (app) route group won't have navigation.</p>

				<pre class="bg-base-300 rounded p-3"><code
						>&lt;!-- src/routes/splash/+page.svelte --&gt;
&lt;div class="splash-screen"&gt;
  &lt;h1&gt;Welcome!&lt;/h1&gt;
  &lt;!-- No navigation bar here --&gt;
&lt;/div&gt;</code
					></pre>
			</div>
		</div>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Key Features</h3>
		<ul class="list-inside list-disc space-y-1 text-sm">
			<li>Automatic active state based on current route</li>
			<li>Native SvelteKit navigation (client-side routing)</li>
			<li>Progressive enhancement (works without JS via <code>&lt;a&gt;</code> tags)</li>
			<li>iOS safe area support (notches, home indicators)</li>
			<li>Responsive layout with proper scroll handling</li>
			<li>Flexible: use AppShell or BottomNavigation directly</li>
		</ul>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Props</h3>

		<div class="text-sm">
			<p class="mb-2 font-semibold">AppShell:</p>
			<ul class="mb-4 list-inside list-disc space-y-1 opacity-70">
				<li><code>items: BottomNavItem[]</code> - Navigation items</li>
				<li><code>activeId?: string</code> - Currently active item ID</li>
				<li><code>onitemclick?: (id: string) => void</code> - Click callback</li>
				<li><code>class?: string</code> - Additional CSS classes for shell</li>
				<li><code>contentClass?: string</code> - Additional CSS classes for content area</li>
				<li><code>navClass?: string</code> - Additional CSS classes for navigation</li>
			</ul>

			<p class="mb-2 font-semibold">BottomNavItem:</p>
			<ul class="list-inside list-disc space-y-1 opacity-70">
				<li><code>id: string</code> - Unique identifier</li>
				<li><code>label: string</code> - Display text</li>
				<li>
					<code>href?: string</code> - Navigation URL (optional, uses <code>&lt;a&gt;</code> tag)
				</li>
				<li>
					<code>icon?: Component</code> - Icon component (optional, e.g. phosphor-svelte icons)
				</li>
				<li>
					<code>iconProps?: Record&lt;string, any&gt;</code> - Props to pass to icon component
				</li>
				<li>
					<code>onclick?: () => void</code> - Click handler for this specific item (optional)
				</li>
			</ul>
		</div>
	</div>
</div>
