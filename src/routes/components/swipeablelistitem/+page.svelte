<script lang="ts">
	import SwipeableListItem from '$lib/components/list/SwipeableListItem.svelte';

	interface Email {
		id: number;
		from: string;
		subject: string;
		preview: string;
		time: string;
		unread: boolean;
	}

	let emails = $state<Email[]>([
		{
			id: 1,
			from: 'John Doe',
			subject: 'Meeting Tomorrow',
			preview: 'Hey, just wanted to confirm our meeting for tomorrow at 10 AM...',
			time: '9:30 AM',
			unread: true
		},
		{
			id: 2,
			from: 'Jane Smith',
			subject: 'Project Update',
			preview: 'The latest version of the project has been deployed to staging...',
			time: '8:15 AM',
			unread: true
		},
		{
			id: 3,
			from: 'Bob Wilson',
			subject: 'Re: Budget Proposal',
			preview: 'Thanks for sending over the budget proposal. I have a few questions...',
			time: 'Yesterday',
			unread: false
		},
		{
			id: 4,
			from: 'Alice Johnson',
			subject: 'Team Lunch',
			preview: 'Who wants to grab lunch today? Thinking about that new place...',
			time: 'Yesterday',
			unread: false
		},
		{
			id: 5,
			from: 'Charlie Brown',
			subject: 'Code Review Request',
			preview: 'Could you review my PR when you get a chance? It adds the new...',
			time: '2 days ago',
			unread: false
		}
	]);

	function archiveEmail(id: number) {
		emails = emails.filter((email) => email.id !== id);
	}

	function deleteEmail(id: number) {
		emails = emails.filter((email) => email.id !== id);
	}

	function markAsRead(id: number) {
		emails = emails.map((email) => (email.id === id ? { ...email, unread: false } : email));
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-3xl font-bold">Swipeable List Item</h1>

	<div class="prose mb-6">
		<p>
			A swipeable list item component that automatically executes actions when swiped. Supports
			both touch and pointer events (mouse, pen).
		</p>
		<p class="text-base-content/70 text-sm">
			Swipe left or right past the threshold to trigger the action automatically. No button press needed!
		</p>
	</div>

	<!-- Email List Demo -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body p-0">
			<h2 class="card-title px-6 pt-6">Demo: Email Inbox</h2>
			<p class="text-base-content/70 px-6 text-sm">
				Swipe right to mark as read, swipe left to archive.
			</p>

			<div class="divide-base-300 divide-y">
				{#each emails as email (email.id)}
					<SwipeableListItem
						onleft={() => markAsRead(email.id)}
						onright={() => archiveEmail(email.id)}
					>
						{#snippet leftAction()}
							<div class="flex items-center gap-2 text-success">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span class="font-semibold">Mark as Read</span>
							</div>
						{/snippet}

						{#snippet rightAction()}
							<div class="flex items-center gap-2 text-warning">
								<span class="font-semibold">Archive</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
									/>
								</svg>
							</div>
						{/snippet}

						<div class="hover:bg-base-100 flex items-start gap-4 p-4 transition-colors">
							<div class="min-w-0 flex-1">
								<div class="mb-1 flex items-center gap-2">
									<span class="truncate font-semibold {email.unread ? 'text-primary' : ''}">
										{email.from}
									</span>
									{#if email.unread}
										<span class="badge badge-primary badge-sm">New</span>
									{/if}
									<span class="text-base-content/50 ml-auto text-sm">{email.time}</span>
								</div>
								<div class="mb-1 text-sm font-medium {email.unread ? 'text-primary' : ''}">
									{email.subject}
								</div>
								<div class="text-base-content/70 truncate text-sm">
									{email.preview}
								</div>
							</div>
						</div>
					</SwipeableListItem>
				{/each}
			</div>
		</div>
	</div>

	<!-- Simple Example -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body p-0">
			<h2 class="card-title px-6 pt-6">Simple Example</h2>
			<p class="text-base-content/70 px-6 text-sm">
				Swipe right to complete, swipe left to delete.
			</p>

			<div class="divide-base-300 divide-y">
				{#each [1, 2, 3] as item}
					<SwipeableListItem
						onleft={() => console.log(`Completed item ${item}`)}
						onright={() => console.log(`Deleted item ${item}`)}
					>
						{#snippet leftAction()}
							<div class="flex items-center gap-2 text-success">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<span class="font-semibold">Complete</span>
							</div>
						{/snippet}

						{#snippet rightAction()}
							<div class="flex items-center gap-2 text-error">
								<span class="font-semibold">Delete</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</div>
						{/snippet}

						<div class="bg-base-100 p-4">
							<h3 class="font-bold">List Item {item}</h3>
							<p class="text-base-content/70 text-sm">Swipe to trigger action automatically</p>
						</div>
					</SwipeableListItem>
				{/each}
			</div>
		</div>
	</div>

	<!-- One-sided Actions -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body p-0">
			<h2 class="card-title px-6 pt-6">One-sided Actions</h2>

			<div class="divide-base-300 divide-y">
				<SwipeableListItem onright={() => console.log('Deleted')}>
					{#snippet rightAction()}
						<div class="flex items-center gap-2 text-error">
							<span class="font-semibold">Delete</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
						</div>
					{/snippet}

					<div class="bg-base-100 p-4">
						<h3 class="font-bold">Swipe Left Only</h3>
						<p class="text-base-content/70 text-sm">This item only has a right-side action</p>
					</div>
				</SwipeableListItem>

				<SwipeableListItem onleft={() => console.log('Info shown')}>
					{#snippet leftAction()}
						<div class="flex items-center gap-2 text-info">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span class="font-semibold">Info</span>
						</div>
					{/snippet}

					<div class="bg-base-100 p-4">
						<h3 class="font-bold">Swipe Right Only</h3>
						<p class="text-base-content/70 text-sm">This item only has a left-side action</p>
					</div>
				</SwipeableListItem>
			</div>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Props</h2>

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
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Main content of the list item</td>
						</tr>
						<tr>
							<td><code>leftAction</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Left swipe action snippet (revealed when swiping right)</td>
						</tr>
						<tr>
							<td><code>rightAction</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Right swipe action snippet (revealed when swiping left)</td>
						</tr>
						<tr>
							<td><code>onleft</code></td>
							<td><code>() =&gt; void | Promise&lt;void&gt;</code></td>
							<td>-</td>
							<td>Callback fired when left action is triggered (swiped right fully)</td>
						</tr>
						<tr>
							<td><code>onright</code></td>
							<td><code>() =&gt; void | Promise&lt;void&gt;</code></td>
							<td>-</td>
							<td>Callback fired when right action is triggered (swiped left fully)</td>
						</tr>
						<tr>
							<td><code>maxSwipeDistance</code></td>
							<td><code>number</code></td>
							<td><code>80</code></td>
							<td>Maximum swipe distance in pixels</td>
						</tr>
						<tr>
							<td><code>threshold</code></td>
							<td><code>number</code></td>
							<td><code>60</code></td>
							<td>Minimum swipe distance to trigger action</td>
						</tr>
						<tr>
							<td><code>swipeTimeframe</code></td>
							<td><code>number</code></td>
							<td><code>300</code></td>
							<td>Maximum time in ms for a swipe gesture</td>
						</tr>
						<tr>
							<td><code>disabled</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Whether swipe is disabled</td>
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

			<div class="alert alert-info mt-4">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-current shrink-0 w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					></path>
				</svg>
				<span>
					<strong>Automatic execution:</strong> Actions are automatically triggered when you swipe past
					the threshold and release. No need to click buttons!
				</span>
			</div>
		</div>
	</div>
</div>
