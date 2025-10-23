<script lang="ts">
	import StatCard from '$lib/components/stat/StatCard.svelte';
	import CircularProgress from '$lib/components/progress/CircularProgress.svelte';

	// Example data
	let totalUsers = $state(12459);
	let revenue = $state(89400);
	let growthRate = $state(12.5);
	let activeNow = $state(342);
</script>

<div class="flex flex-col gap-6 p-4">
	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Basic StatCard</h2>
		<p class="mb-4 text-sm opacity-70">Simple statistics display</p>

		<div class="stats shadow">
			<StatCard
				title="Total Users"
				value={totalUsers.toLocaleString()}
				description="↗︎ 400 (22%)"
				descClass="text-success"
			/>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: With Figure/Icon</h2>
		<p class="mb-4 text-sm opacity-70">StatCard with emoji or icon figure</p>

		<div class="stats shadow">
			<StatCard title="Revenue" value="${revenue.toLocaleString()}" description="Jan 1st - Feb 1st">
				{#snippet figure()}
					<div class="avatar">
						<div class="bg-success/20 flex w-16 items-center justify-center rounded-full">
							<span class="text-3xl">💰</span>
						</div>
					</div>
				{/snippet}
			</StatCard>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: With Circular Progress</h2>
		<p class="mb-4 text-sm opacity-70">Combining StatCard with CircularProgress</p>

		<div class="stats shadow">
			<StatCard
				title="Task Completion"
				value="78/100"
				description="22 tasks remaining"
				descClass="text-warning"
			>
				{#snippet figure()}
					<CircularProgress value={78} size="4rem" color="text-primary">
						<span class="text-sm font-bold">78%</span>
					</CircularProgress>
				{/snippet}
			</StatCard>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Multiple Stats in Grid</h2>
		<p class="mb-4 text-sm opacity-70">Dashboard-style stat display</p>

		<div class="stats stats-vertical lg:stats-horizontal shadow">
			<StatCard
				title="Downloads"
				value="31K"
				description="↗︎ 21% increase"
				descClass="text-success"
			>
				{#snippet figure()}
					<span class="text-4xl">📥</span>
				{/snippet}
			</StatCard>

			<StatCard
				title="Active Now"
				value={activeNow}
				description="↘︎ 90 (18%)"
				descClass="text-error"
			>
				{#snippet figure()}
					<span class="text-4xl">👥</span>
				{/snippet}
			</StatCard>

			<StatCard
				title="Growth Rate"
				value="{growthRate}%"
				description="This month"
				valueClass="text-secondary"
			>
				{#snippet figure()}
					<span class="text-4xl">📈</span>
				{/snippet}
			</StatCard>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: With Actions</h2>
		<p class="mb-4 text-sm opacity-70">StatCard with action buttons</p>

		<div class="stats shadow">
			<StatCard
				title="Storage Used"
				value="25.6 GB"
				description="62% of 50 GB capacity"
				descClass="text-warning"
			>
				{#snippet figure()}
					<CircularProgress value={62} size="5rem" color="text-warning">
						<span class="text-sm font-bold">62%</span>
					</CircularProgress>
				{/snippet}
				{#snippet actions()}
					<button class="btn btn-sm btn-primary">Upgrade</button>
					<button class="btn btn-sm btn-ghost">Manage</button>
				{/snippet}
			</StatCard>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 6: Custom Styling</h2>
		<p class="mb-4 text-sm opacity-70">Using custom classes for styling</p>

		<div class="stats from-primary to-secondary text-primary-content bg-gradient-to-br shadow">
			<StatCard
				title="Premium Members"
				value="1,428"
				description="Active subscriptions"
				titleClass="text-primary-content/70"
				valueClass="text-4xl"
				descClass="text-primary-content/80"
			>
				{#snippet figure()}
					<div class="bg-base-100/20 flex h-16 w-16 items-center justify-center rounded-full">
						<span class="text-3xl">⭐</span>
					</div>
				{/snippet}
			</StatCard>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 7: Compact Stats Row</h2>
		<p class="mb-4 text-sm opacity-70">Horizontal stat cards</p>

		<div class="stats stats-horizontal w-full shadow">
			<StatCard title="Page Views" value="89.4k" description="↗︎ 13%" descClass="text-success" />
			<StatCard title="Bounce Rate" value="24%" description="↘︎ 5%" descClass="text-success" />
			<StatCard title="Avg. Duration" value="3m 24s" description="↗︎ 18s" descClass="text-info" />
		</div>
	</div>
</div>
