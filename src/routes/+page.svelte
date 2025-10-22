<script lang="ts">
	const componentGroups = [
		{
			category: 'Input Components',
			items: [
				{ name: 'ButtonGroup', path: '/components/button', description: 'Segmented control for selections' },
				{ name: 'RangeInput', path: '/components/input', description: 'Slider with value display' },
				{ name: 'ValidatedInput', path: '/components/input', description: 'Input with validation' }
			]
		},
		{
			category: 'List Components',
			items: [
				{ name: 'ListPicker', path: '/components/list', description: 'Selectable list with labels' },
				{ name: 'OptionCards', path: '/components/optioncards', description: 'Rich card-based selector' }
			]
		},
		{
			category: 'Display Components',
			items: [
				{ name: 'AlertBox', path: '/components/alert', description: 'Alert messages' },
				{ name: 'ModalDialog', path: '/components/modal', description: 'Modal dialogs' }
			]
		},
		{
			category: 'Layout Components',
			items: [
				{ name: 'Stack', path: '/components/stack', description: 'Swipeable card stack' },
				{ name: 'Stepper', path: '/components/stepper', description: 'Multi-step wizard' }
			]
		},
		{
			category: 'Chart Components',
			items: [
				{ name: 'Charts (Line/Bar/Polar)', path: '/components/chart', description: 'Chart.js integration' }
			]
		}
	];
</script>

<div class="container mx-auto max-w-4xl p-4">
	<div class="mb-8">
		<h1 class="text-4xl font-bold mb-2">veilchen</h1>
		<p class="text-lg opacity-70">Svelte 5 component library for mobile apps</p>
	</div>

	<div class="mb-6 bg-base-200 rounded-box p-4">
		<div class="flex flex-wrap gap-2">
			<span class="badge badge-primary">Svelte 5</span>
			<span class="badge badge-secondary">DaisyUI</span>
			<span class="badge badge-accent">TypeScript</span>
			<span class="badge badge-success">Mobile-First</span>
			<span class="badge badge-info">Accessible</span>
		</div>
	</div>

	<div class="space-y-6">
		{#each componentGroups as group}
			<div>
				<h2 class="text-xl font-bold mb-3">{group.category}</h2>
				<div class="grid gap-3 md:grid-cols-2">
					{#each group.items as component}
						<a
							href={component.path}
							class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
						>
							<div class="card-body p-4">
								<h3 class="card-title text-base">{component.name}</h3>
								<p class="text-sm opacity-70">{component.description}</p>
							</div>
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-8 pt-6 border-t border-base-300">
		<h2 class="text-xl font-bold mb-3">Features</h2>
		<ul class="space-y-2">
			<li class="flex items-start gap-2">
				<span class="text-success">✓</span>
				<span>Full TypeScript support with generic types</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-success">✓</span>
				<span>ARIA-compliant accessibility with keyboard navigation</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-success">✓</span>
				<span>Touch-optimized for mobile devices</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-success">✓</span>
				<span>Complete JSDoc documentation for IDE IntelliSense</span>
			</li>
			<li class="flex items-start gap-2">
				<span class="text-success">✓</span>
				<span>Styled with DaisyUI themes</span>
			</li>
		</ul>
	</div>

	<div class="mt-6 pt-6 border-t border-base-300 text-center opacity-70">
		<p class="text-sm">
			View the
			<a href="https://github.com/thwbh/veilchen" class="link link-primary">GitHub repository</a>
			for documentation and source code
		</p>
	</div>
</div>
