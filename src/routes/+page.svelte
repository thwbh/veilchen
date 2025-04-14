<script lang="ts">
	const components = [
		{ name: 'Alert', path: '/components/alert' },
		{ name: 'Button', path: '/components/button' },
		{ name: 'Chart', path: '/components/chart' },
		{ name: 'List Picker', path: '/components/list' },
		{ name: 'Input Components', path: '/components/input' },
		{ name: 'Stepper', path: '/components/stepper' },
		{ name: 'Stack', path: '/components/stack' }
	];
</script>

<div class="p-4">
	<h1 class="mb-4 text-2xl font-bold">Component Showcase</h1>
	<ul class="menu bg-base-200 rounded-box w-56 p-2">
		{#each components as component}
			<li>
				<a href={component.path}>{component.name}</a>
			</li>
		{/each}
	</ul>
</div>
