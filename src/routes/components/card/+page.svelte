<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';
</script>

<div class="flex flex-col gap-6 p-4">
	<h1 class="mb-4 text-3xl font-bold">Card Examples</h1>
	<p class="mb-2 text-sm opacity-70">
		DaisyUI-based card component for mobile applications
	</p>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic Card</h2>
		<p class="mb-4 text-sm opacity-70">Simple card with title and content</p>

		<Card>
			{#snippet title()}
				Card Title
			{/snippet}
			<p>This is a basic card with a title and some content. Perfect for displaying information.</p>
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Card with Image</h2>
		<p class="mb-4 text-sm opacity-70">Card with an image at the top</p>

		<Card>
			{#snippet image()}
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Shoes"
					class="rounded-xl"
				/>
			{/snippet}
			{#snippet title()}
				Shoes!
			{/snippet}
			<p>If a dog chews shoes whose shoes does he choose?</p>
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: Card with Actions</h2>
		<p class="mb-4 text-sm opacity-70">Card with action buttons</p>

		<Card>
			{#snippet title()}
				Card with Actions
			{/snippet}
			<p>This card includes action buttons at the bottom.</p>
			{#snippet actions()}
				<button class="btn btn-primary">Buy Now</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Compact Card</h2>
		<p class="mb-4 text-sm opacity-70">More compact padding</p>

		<Card variant="compact">
			{#snippet title()}
				Compact Card
			{/snippet}
			<p>This card uses the compact variant for tighter spacing.</p>
			{#snippet actions()}
				<button class="btn btn-sm btn-primary">Action</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Glass Card</h2>
		<p class="mb-4 text-sm opacity-70">Glassmorphism effect</p>

		<div class="hero min-h-[300px] bg-base-200 rounded-box">
			<div class="hero-content">
				<Card variant="glass" class="w-96">
					{#snippet title()}
						Glass Card
					{/snippet}
					<p>This card has a glass/frosted effect when placed over content.</p>
					{#snippet actions()}
						<button class="btn btn-primary">Action</button>
					{/snippet}
				</Card>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Bordered Card</h2>
		<p class="mb-4 text-sm opacity-70">Card with a border</p>

		<Card variant="bordered">
			{#snippet title()}
				Bordered Card
			{/snippet}
			<p>This card has a visible border around it.</p>
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 7: Image Full Width</h2>
		<p class="mb-4 text-sm opacity-70">Image covers the full card width</p>

		<Card imageFull>
			{#snippet image()}
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Shoes"
				/>
			{/snippet}
			{#snippet title()}
				Full Width Image
			{/snippet}
			<p>The image extends to the edges of the card.</p>
			{#snippet actions()}
				<button class="btn btn-primary">Buy Now</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 8: Card Side (Horizontal)</h2>
		<p class="mb-4 text-sm opacity-70">Image and content side by side</p>

		<Card variant="side">
			{#snippet image()}
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Movie"
					class="max-w-[120px] rounded-xl"
				/>
			{/snippet}
			{#snippet title()}
				New Movie
			{/snippet}
			<p>This card displays content horizontally with the image on the side.</p>
			{#snippet actions()}
				<button class="btn btn-primary">Watch</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 9: Card with Badge</h2>
		<p class="mb-4 text-sm opacity-70">Card title with badge</p>

		<Card>
			{#snippet title()}
				<span>Shoes!</span>
				<div class="badge badge-secondary">NEW</div>
			{/snippet}
			<p>If a dog chews shoes whose shoes does he choose?</p>
			{#snippet actions()}
				<button class="btn btn-primary">Buy Now</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 10: Centered Actions</h2>
		<p class="mb-4 text-sm opacity-70">Multiple action buttons</p>

		<Card>
			{#snippet title()}
				Select Your Plan
			{/snippet}
			<p class="text-center">Choose the plan that fits your needs.</p>
			{#snippet actions()}
				<button class="btn btn-ghost">Cancel</button>
				<button class="btn btn-primary">Subscribe</button>
			{/snippet}
		</Card>
	</div>

	<div class="divider"></div>

	<div class="bg-info/20 rounded-box p-4">
		<h3 class="mb-2 text-lg font-bold">Features:</h3>
		<ul class="list-inside list-disc space-y-1 text-sm opacity-80">
			<li>Based on DaisyUI card styling</li>
			<li>Multiple variants: normal, compact, side, glass, bordered</li>
			<li>Optional title, image, and actions sections using snippets</li>
			<li>Flexible image positioning (padded or full-width)</li>
			<li>Customizable with additional CSS classes</li>
			<li>Mobile-optimized for small screens</li>
		</ul>
	</div>
</div>
