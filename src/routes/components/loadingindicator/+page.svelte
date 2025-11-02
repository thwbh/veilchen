<script lang="ts">
	import LoadingIndicator from '$lib/components/loading/LoadingIndicator.svelte';

	let visible1 = $state(true);
	let visible2 = $state(true);
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h1 class="mb-2 text-3xl font-bold">LoadingIndicator Component</h1>
		<p class="mb-4 text-sm opacity-70">
			Displays various loading animations using DaisyUI loading styles
		</p>
	</div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: All Variants</h2>
		<p class="mb-4 text-sm opacity-70">Different loading animation styles</p>

		<div class="flex flex-wrap gap-8">
			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" />
				<span class="text-xs opacity-70">Spinner</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" />
				<span class="text-xs opacity-70">Dots</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="ring" />
				<span class="text-xs opacity-70">Ring</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="ball" />
				<span class="text-xs opacity-70">Ball</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="bars" />
				<span class="text-xs opacity-70">Bars</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="infinity" />
				<span class="text-xs opacity-70">Infinity</span>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Different Sizes</h2>
		<p class="mb-4 text-sm opacity-70">Adjust the size of the loading indicator</p>

		<div class="flex flex-wrap items-center gap-8">
			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" size="xs" />
				<span class="text-xs opacity-70">XS</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" size="sm" />
				<span class="text-xs opacity-70">SM</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" size="md" />
				<span class="text-xs opacity-70">MD (default)</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" size="lg" />
				<span class="text-xs opacity-70">LG</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="spinner" size="xl" />
				<span class="text-xs opacity-70">XL</span>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Different Colors</h2>
		<p class="mb-4 text-sm opacity-70">Customize the color using DaisyUI text color classes</p>

		<div class="flex flex-wrap gap-8">
			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-primary" size="lg" />
				<span class="text-xs opacity-70">Primary</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-secondary" size="lg" />
				<span class="text-xs opacity-70">Secondary</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-accent" size="lg" />
				<span class="text-xs opacity-70">Accent</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-success" size="lg" />
				<span class="text-xs opacity-70">Success</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-warning" size="lg" />
				<span class="text-xs opacity-70">Warning</span>
			</div>

			<div class="flex flex-col items-center gap-2">
				<LoadingIndicator variant="dots" color="text-error" size="lg" />
				<span class="text-xs opacity-70">Error</span>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: With Label</h2>
		<p class="mb-4 text-sm opacity-70">Display text below the loading indicator</p>

		<div class="flex flex-wrap gap-8">
			<LoadingIndicator variant="spinner" label="Loading..." size="lg" />
			<LoadingIndicator variant="dots" label="Please wait..." size="lg" color="text-secondary" />
			<LoadingIndicator variant="infinity" label="Processing..." size="lg" color="text-accent" />
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Visibility Control</h2>
		<p class="mb-4 text-sm opacity-70">Toggle the loading indicator on and off</p>

		<div class="space-y-4">
			<div class="flex items-center gap-4">
				<button class="btn btn-primary" onclick={() => (visible1 = !visible1)}>
					{visible1 ? 'Hide' : 'Show'} Loading
				</button>
				<LoadingIndicator variant="spinner" size="lg" visible={visible1} />
			</div>

			<div class="flex items-center gap-4">
				<button class="btn btn-secondary" onclick={() => (visible2 = !visible2)}>
					{visible2 ? 'Hide' : 'Show'} Loading
				</button>
				<LoadingIndicator
					variant="dots"
					label={visible2 ? 'Loading data...' : undefined}
					size="lg"
					visible={visible2}
				/>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Props</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-70">
			<li>
				<code>variant?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'</code> - Animation
				style (default: 'spinner')
			</li>
			<li>
				<code>size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'</code> - Size of the indicator (default: 'md')
			</li>
			<li><code>color?: string</code> - Color class (default: 'text-primary')</li>
			<li><code>label?: string</code> - Optional text to display below the indicator</li>
			<li><code>visible?: boolean</code> - Controls visibility (default: true)</li>
			<li><code>class?: string</code> - Additional CSS classes</li>
		</ul>
	</div>

	<div class="bg-base-200 rounded-lg p-4">
		<h3 class="mb-2 font-bold">Usage Example</h3>
		<pre class="bg-base-300 rounded p-3 text-xs"><code
				>&lt;script lang="ts"&gt;
  import {`{`} LoadingIndicator {`}`} from '@thwbh/veilchen';

  let isLoading = $state(false);

  async function fetchData() {`{`}
    isLoading = true;
    try {`{`}
      await fetch('/api/data');
    {`}`} finally {`{`}
      isLoading = false;
    {`}`}
  {`}`}
&lt;/script&gt;

&lt;LoadingIndicator
  variant="spinner"
  size="lg"
  visible={`{`}isLoading{`}`}
  label="Loading data..."
/&gt;</code
			></pre>
	</div>
</div>
