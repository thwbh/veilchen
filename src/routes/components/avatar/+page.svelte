<script lang="ts">
	import Avatar from '$lib/components/avatar/Avatar.svelte';
	import AvatarGroup from '$lib/components/avatar/AvatarGroup.svelte';
	import AvatarPicker from '$lib/components/avatar/AvatarPicker.svelte';

	import { createAvatar } from '@dicebear/core';
	import { thumbs, bigSmile } from '@dicebear/collection';
	import type { AvatarOption } from '$lib/types/types.js';
	import AlertBox from '$lib/components/alert/AlertBox.svelte';
	import { AlertType } from '$lib/index.js';

	let clickedAvatar = $state<string | null>(null);
	let selectedAvatar = $state<string | undefined>(undefined);
	let selectedAvatarCustom = $state<string | undefined>(undefined);

	const teamAvatars = [
		{
			src: createAvatar(bigSmile, {
				seed: 'John ',
				backgroundColor: ['ece9f8']
			}).toDataUri()
		},
		{
			src: createAvatar(bigSmile, {
				seed: 'Jane ',
				backgroundColor: ['ece9f8']
			}).toDataUri()
		},
		{
			src: createAvatar(bigSmile, {
				seed: 'Bob W',
				backgroundColor: ['ece9f8']
			}).toDataUri()
		},
		{
			src: createAvatar(bigSmile, {
				seed: 'Alice J',
				backgroundColor: ['ece9f8']
			}).toDataUri()
		}
	];

	// DiceBear avatars - bigSmile style
	const bigSmileAvatars: AvatarOption[] = [
		{ id: 'felix', src: createAvatar(bigSmile, { seed: 'Felix' }).toDataUri() },
		{ id: 'aneka', src: createAvatar(bigSmile, { seed: 'Aneka' }).toDataUri() },
		{ id: 'luna', src: createAvatar(bigSmile, { seed: 'Luna' }).toDataUri() },
		{ id: 'max', src: createAvatar(bigSmile, { seed: 'Max' }).toDataUri() },
		{ id: 'bella', src: createAvatar(bigSmile, { seed: 'Bella' }).toDataUri() },
		{ id: 'charlie', src: createAvatar(bigSmile, { seed: 'Charlie' }).toDataUri() },
		{ id: 'daisy', src: createAvatar(bigSmile, { seed: 'Daisy' }).toDataUri() },
		{ id: 'oscar', src: createAvatar(bigSmile, { seed: 'Oscar' }).toDataUri() }
	];

	// DiceBear avatars - thumbs style
	const thumbsAvatars: AvatarOption[] = [
		{ id: 'avatar1', src: createAvatar(thumbs, { seed: 'Felix' }).toDataUri() },
		{ id: 'avatar2', src: createAvatar(thumbs, { seed: 'Aneka' }).toDataUri() },
		{ id: 'avatar3', src: createAvatar(thumbs, { seed: 'Luna' }).toDataUri() },
		{ id: 'avatar4', src: createAvatar(thumbs, { seed: 'Max' }).toDataUri() },
		{ id: 'avatar5', src: createAvatar(thumbs, { seed: 'Bella' }).toDataUri() },
		{ id: 'avatar6', src: createAvatar(thumbs, { seed: 'Charlie' }).toDataUri() },
		{ id: 'avatar7', src: createAvatar(thumbs, { seed: 'Daisy' }).toDataUri() },
		{ id: 'avatar8', src: createAvatar(thumbs, { seed: 'Oscar' }).toDataUri() }
	];

	function handleAvatarClick(name: string) {
		clickedAvatar = name;
		setTimeout(() => {
			clickedAvatar = null;
		}, 2000);
	}
</script>

<div class="container mx-auto p-4">
	<h1 class="mb-4 text-3xl font-bold">Avatar & Avatar Group</h1>

	<div class="prose mb-6">
		<p>
			Avatar components for displaying user profile pictures with various sizes, shapes, and status
			indicators. Perfect for user profiles, comments, and team displays.
		</p>
	</div>

	{#if clickedAvatar}
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
			<span>Clicked on {clickedAvatar}'s avatar!</span>
		</div>
	{/if}

	<!-- Sizes -->
	<div class="card bg-base-200 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Sizes</h2>
			<div class="flex flex-wrap items-end gap-4">
				<div class="flex flex-col items-center gap-2">
					<Avatar size="xs" placeholder="XS" />
					<span class="text-xs">xs</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="sm" placeholder="SM" />
					<span class="text-xs">sm</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="md" placeholder="MD" />
					<span class="text-xs">md</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="LG" />
					<span class="text-xs">lg</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="xl" placeholder="XL" />
					<span class="text-xs">xl</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="2xl" placeholder="2XL" />
					<span class="text-xs">2xl</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Shapes -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Shapes</h2>
			<div class="flex items-center gap-6">
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" shape="circle" placeholder="JD" />
					<span class="text-sm">Circle</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" shape="rounded" placeholder="JD" />
					<span class="text-sm">Rounded</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" shape="square" placeholder="JD" />
					<span class="text-sm">Square</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Status Indicators -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Status Indicators</h2>
			<div class="flex flex-wrap items-center gap-6">
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="ON" status="online" />
					<span class="text-sm">Online</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="OF" status="offline" />
					<span class="text-sm">Offline</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="BS" status="busy" />
					<span class="text-sm">Busy</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="AW" status="away" />
					<span class="text-sm">Away</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Placeholders -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Placeholders</h2>
			<div class="flex flex-wrap items-center gap-6">
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="JD" />
					<span class="text-sm">Initials</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" placeholder="🎨" />
					<span class="text-sm">Emoji</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg" />
					<span class="text-sm">Default</span>
				</div>
				<div class="flex flex-col items-center gap-2">
					<Avatar size="lg">
						{#snippet placeholderContent()}
							<div class="text-warning font-bold">A1</div>
						{/snippet}
					</Avatar>
					<span class="text-sm">Custom</span>
				</div>
			</div>
		</div>
	</div>

	<!-- With Ring -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">With Ring</h2>
			<div class="flex flex-wrap items-center gap-6">
				<Avatar size="lg" placeholder="PR" ring ringColor="ring-primary" />
				<Avatar size="lg" placeholder="SC" ring ringColor="ring-secondary" status="online" />
				<Avatar size="lg" placeholder="AC" ring ringColor="ring-accent" status="busy" />
				<Avatar size="lg" placeholder="ER" ring ringColor="ring-error" status="offline" />
			</div>
		</div>
	</div>

	<!-- Interactive -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Interactive (Clickable)</h2>
			<div class="flex flex-wrap items-center gap-6">
				<Avatar
					size="lg"
					placeholder="JD"
					onclick={() => handleAvatarClick('John Doe')}
					status="online"
				/>
				<Avatar
					size="lg"
					placeholder="JS"
					onclick={() => handleAvatarClick('Jane Smith')}
					status="busy"
				/>
				<Avatar
					size="lg"
					placeholder="BW"
					onclick={() => handleAvatarClick('Bob Wilson')}
					status="away"
				/>
			</div>
			<p class="text-base-content/70 mt-2 text-sm">Click on the avatars to see the interaction</p>
		</div>
	</div>

	<!-- Avatar Group -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Avatar Group</h2>
			<p class="text-base-content/70 mb-4 text-sm">
				Display multiple avatars in an overlapping layout
			</p>

			<div class="space-y-6">
				<div>
					<h3 class="mb-3 font-semibold">Small Group</h3>
					<AvatarGroup size="md">
						{#each teamAvatars as teamAvatar}
							<Avatar size="md" src={teamAvatar.src} />
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<h3 class="mb-3 font-semibold">Large Group</h3>
					<AvatarGroup size="lg">
						{#each thumbsAvatars as thumbsAvatar}
							<Avatar size="lg" src={thumbsAvatar.src} />
						{/each}
					</AvatarGroup>
				</div>

				<div>
					<h3 class="mb-3 font-semibold">Customized</h3>
					<AvatarGroup size="md">
						<Avatar size="md" src="/avatars/avatar1.svg" />
						<Avatar size="md" placeholder="JD" />
						<Avatar size="md" src="/avatars/avatar2.svg" />
						<Avatar size="md" />
						<Avatar size="md" src={teamAvatars[0].src} />
						<Avatar size="md" placeholder="🌟" />
					</AvatarGroup>
				</div>
			</div>
		</div>
	</div>

	<!-- Real-world Example -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Real-world Example: Team List</h2>

			<div class="mt-4 space-y-4">
				<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
					<Avatar
						size="lg"
						src={teamAvatars[0].src}
						placeholder="JD"
						status="online"
						ring
						ringColor="ring-secondary"
					/>
					<div class="flex-1">
						<h3 class="font-semibold">John Doe</h3>
						<p class="text-base-content/70 text-sm">Product Manager</p>
					</div>
					<span class="badge badge-success">Online</span>
				</div>

				<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
					<Avatar
						size="lg"
						src={teamAvatars[1].src}
						placeholder="JS"
						status="busy"
						ring
						ringColor="ring-secondary"
					/>
					<div class="flex-1">
						<h3 class="font-semibold">Jane Smith</h3>
						<p class="text-base-content/70 text-sm">Lead Developer</p>
					</div>
					<span class="badge badge-error">In a meeting</span>
				</div>

				<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
					<Avatar
						size="lg"
						src={teamAvatars[2].src}
						placeholder="BW"
						status="away"
						ring
						ringColor="ring-secondary"
					/>
					<div class="flex-1">
						<h3 class="font-semibold">Bob Wilson</h3>
						<p class="text-base-content/70 text-sm">UI/UX Designer</p>
					</div>
					<span class="badge badge-warning">Away</span>
				</div>

				<div class="bg-base-100 flex items-center gap-4 rounded-lg p-4">
					<Avatar
						size="lg"
						src={teamAvatars[3].src}
						placeholder="AJ"
						status="offline"
						ring
						ringColor="ring-secondary"
					/>
					<div class="flex-1">
						<h3 class="font-semibold">Alice Johnson</h3>
						<p class="text-base-content/70 text-sm">Backend Engineer</p>
					</div>
					<span class="badge badge-ghost">Offline</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Avatar Picker -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Avatar Picker</h2>
			<p class="text-base-content/70 mb-4 text-sm">Select an avatar from predefined options</p>

			<div class="space-y-8">
				<div>
					<h3 class="mb-4 font-semibold">DiceBear Avatars (bigSmile style)</h3>
					<AvatarPicker
						bind:value={selectedAvatar}
						avatars={bigSmileAvatars}
						label="Pick your character"
					/>
					{#if selectedAvatar}
						<AlertBox type={AlertType.Info}>
							<span>
								You selected ID: {selectedAvatar}
							</span>
						</AlertBox>
					{/if}
				</div>

				<div class="flex flex-col gap-4">
					<h3 class="mb-4 font-semibold">DiceBear Avatars (thumbs style)</h3>
					<AvatarPicker
						bind:value={selectedAvatarCustom}
						avatars={thumbsAvatars}
						label="Pick from thumbs style"
						size="xl"
					/>
					{#if selectedAvatarCustom}
						<AlertBox type={AlertType.Info}>
							<span>
								You selected ID: {selectedAvatarCustom}
							</span>
						</AlertBox>
					{/if}
				</div>

				<div>
					<h3 class="mb-4 font-semibold">Different Sizes</h3>
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<AvatarPicker label="Small" size="sm" avatars={bigSmileAvatars.slice(0, 6)} />
						</div>
						<div>
							<AvatarPicker label="Medium" size="md" avatars={bigSmileAvatars.slice(0, 6)} />
						</div>
					</div>
				</div>

				<div>
					<h3 class="mb-4 font-semibold">Different Shapes</h3>
					<div class="space-y-6">
						<AvatarPicker label="Rounded" shape="rounded" avatars={thumbsAvatars.slice(0, 8)} />
						<AvatarPicker label="Square" shape="square" avatars={thumbsAvatars.slice(0, 8)} />
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- API Documentation -->
	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">Avatar Props</h2>

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
							<td><code>src</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Image source URL</td>
						</tr>
						<tr>
							<td><code>alt</code></td>
							<td><code>string</code></td>
							<td><code>'Avatar'</code></td>
							<td>Alt text for the image</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
							<td><code>'md'</code></td>
							<td>Size variant</td>
						</tr>
						<tr>
							<td><code>shape</code></td>
							<td><code>'circle' | 'square' | 'rounded'</code></td>
							<td><code>'circle'</code></td>
							<td>Shape variant</td>
						</tr>
						<tr>
							<td><code>status</code></td>
							<td><code>'online' | 'offline' | 'busy' | 'away' | null</code></td>
							<td><code>null</code></td>
							<td>Status indicator</td>
						</tr>
						<tr>
							<td><code>placeholder</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Placeholder text (initials, emoji, etc.)</td>
						</tr>
						<tr>
							<td><code>placeholderContent</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Custom placeholder content snippet</td>
						</tr>
						<tr>
							<td><code>ring</code></td>
							<td><code>boolean</code></td>
							<td><code>false</code></td>
							<td>Whether the avatar has a ring/border</td>
						</tr>
						<tr>
							<td><code>ringColor</code></td>
							<td><code>string</code></td>
							<td><code>'ring-primary'</code></td>
							<td>Ring color class</td>
						</tr>
						<tr>
							<td><code>onclick</code></td>
							<td><code>(event: MouseEvent) =&gt; void</code></td>
							<td>-</td>
							<td>Click handler (makes avatar interactive)</td>
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
			<h2 class="card-title">AvatarGroup Props</h2>

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
							<td><code>max</code></td>
							<td><code>number</code></td>
							<td>-</td>
							<td>Maximum avatars before showing "+X" counter (not yet implemented)</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
							<td><code>'md'</code></td>
							<td>Size variant for all avatars</td>
						</tr>
						<tr>
							<td><code>children</code></td>
							<td><code>Snippet</code></td>
							<td>-</td>
							<td>Avatar components to display</td>
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
					<strong>DiceBear Integration:</strong> You can easily integrate DiceBear by setting the
					<code>src</code> prop to a DiceBear API URL for procedurally generated avatars!
				</span>
			</div>
		</div>
	</div>

	<div class="card bg-base-200 mt-8 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">AvatarPicker Props</h2>

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
							<td><code>value</code></td>
							<td><code>string</code></td>
							<td>-</td>
							<td>Currently selected avatar id (bindable)</td>
						</tr>
						<tr>
							<td><code>avatars</code></td>
							<td><code>AvatarOption[]</code></td>
							<td>-</td>
							<td>
								Array of avatar options. Each option has: <code>id</code> (string), <code>src</code>
								(string - URL, file path, or data URI), <code>alt</code> (optional string)
							</td>
						</tr>
						<tr>
							<td><code>size</code></td>
							<td><code>'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</code></td>
							<td><code>'lg'</code></td>
							<td>Size of the avatar options</td>
						</tr>
						<tr>
							<td><code>shape</code></td>
							<td><code>'circle' | 'square' | 'rounded'</code></td>
							<td><code>'circle'</code></td>
							<td>Shape of the avatars</td>
						</tr>
						<tr>
							<td><code>onchange</code></td>
							<td><code>(id: string, option: AvatarOption) =&gt; void</code></td>
							<td>-</td>
							<td>Callback fired when an avatar is selected</td>
						</tr>
						<tr>
							<td><code>label</code></td>
							<td><code>string</code></td>
							<td><code>'Choose your avatar'</code></td>
							<td>Label text</td>
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
</div>
