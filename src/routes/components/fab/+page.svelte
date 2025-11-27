<script lang="ts">
	import FAB from '$lib/components/fab/FAB.svelte';
	import type { FABAction } from '$lib/types/types.js';

	// Example actions for vertical speed dial
	const verticalActions: FABAction[] = [
		{
			id: 'edit',
			label: 'Edit',
			onclick: () => console.log('Edit clicked')
		},
		{
			id: 'share',
			label: 'Share',
			onclick: () => console.log('Share clicked')
		},
		{
			id: 'delete',
			label: 'Delete',
			onclick: () => console.log('Delete clicked'),
			color: 'error'
		}
	];

	// Example actions with main action
	const actionsWithMain: FABAction[] = [
		{
			id: 'send',
			label: 'Send',
			onclick: () => console.log('Send clicked'),
			color: 'success',
			isMainAction: true
		},
		{
			id: 'draft',
			label: 'Save Draft',
			onclick: () => console.log('Draft clicked')
		},
		{
			id: 'attach',
			label: 'Attach File',
			onclick: () => console.log('Attach clicked')
		}
	];

	// Example actions for flower layout
	const flowerActions: FABAction[] = [
		{
			id: 'camera',
			label: 'Camera',
			onclick: () => console.log('Camera clicked'),
			color: 'primary'
		},
		{
			id: 'gallery',
			label: 'Gallery',
			onclick: () => console.log('Gallery clicked'),
			color: 'secondary'
		},
		{
			id: 'document',
			label: 'Document',
			onclick: () => console.log('Document clicked'),
			color: 'accent'
		}
	];
</script>

<div class="flex flex-col gap-6 p-4 pb-32">
	<div>
		<h1 class="mb-4 text-3xl font-bold">FAB (Floating Action Button)</h1>
		<p class="mb-6 text-sm opacity-70">
			FAB component with speed dial functionality. Supports vertical stack and flower (quarter
			circle) layouts.
		</p>
	</div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 1: Simple FAB</h2>
		<p class="mb-4 text-sm opacity-70">Single floating action button without speed dial</p>

		<div class="mockup-phone">
			<div class="mockup-phone-camera"></div>
			<div class="mockup-phone-display">
				<div class="bg-base-100 relative h-full w-full">
					<div class="flex h-full items-center justify-center">
						<p class="text-center text-sm opacity-60">Click the FAB in the corner</p>
					</div>

					<FAB color="primary" position="bottom-right" />
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 2: Vertical Speed Dial</h2>
		<p class="mb-4 text-sm opacity-70">FAB with actions that appear vertically when clicked</p>

		<div class="mockup-phone">
			<div class="mockup-phone-camera"></div>
			<div class="mockup-phone-display">
				<div class="bg-base-100 relative h-full w-full">
					<div class="flex h-full items-center justify-center">
						<p class="text-center text-sm opacity-60">Click the FAB to see actions</p>
					</div>

					<FAB actions={verticalActions} color="primary" variant="vertical" showLabels={true} />
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 3: With Main Action</h2>
		<p class="mb-4 text-sm opacity-70">
			FAB with a main action that replaces the trigger when open
		</p>

		<div class="mockup-phone">
			<div class="mockup-phone-camera"></div>
			<div class="mockup-phone-display">
				<div class="bg-base-100 relative h-full w-full">
					<div class="flex h-full items-center justify-center">
						<p class="text-center text-sm opacity-60">Main action appears on top</p>
					</div>

					<FAB actions={actionsWithMain} color="primary" variant="vertical" showLabels={true} />
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 4: Flower Speed Dial</h2>
		<p class="mb-4 text-sm opacity-70">
			Actions arranged in a quarter circle (flower) pattern with tooltips
		</p>

		<div class="mockup-phone">
			<div class="mockup-phone-camera"></div>
			<div class="mockup-phone-display">
				<div class="bg-base-100 relative h-full w-full">
					<div class="flex h-full items-center justify-center">
						<p class="text-center text-sm opacity-60">Flower pattern with tooltips</p>
					</div>

					<FAB actions={flowerActions} color="secondary" variant="flower" />
				</div>
			</div>
		</div>
	</div>

	<div class="divider"></div>

	<div>
		<h2 class="mb-2 text-2xl font-bold">Example 5: Different Sizes</h2>
		<p class="mb-4 text-sm opacity-70">FAB supports small, medium, and large sizes</p>

		<div class="flex gap-4">
			<div class="mockup-phone scale-75">
				<div class="mockup-phone-camera"></div>
				<div class="mockup-phone-display">
					<div class="bg-base-100 relative h-full w-full">
						<div class="flex h-full items-center justify-center">
							<p class="text-center text-xs opacity-60">Small</p>
						</div>
						<FAB color="primary" size="sm" />
					</div>
				</div>
			</div>

			<div class="mockup-phone scale-75">
				<div class="mockup-phone-camera"></div>
				<div class="mockup-phone-display">
					<div class="bg-base-100 relative h-full w-full">
						<div class="flex h-full items-center justify-center">
							<p class="text-center text-xs opacity-60">Medium</p>
						</div>
						<FAB color="secondary" size="md" />
					</div>
				</div>
			</div>

			<div class="mockup-phone scale-75">
				<div class="mockup-phone-camera"></div>
				<div class="mockup-phone-display">
					<div class="bg-base-100 relative h-full w-full">
						<div class="flex h-full items-center justify-center">
							<p class="text-center text-xs opacity-60">Large</p>
						</div>
						<FAB color="accent" size="lg" />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
