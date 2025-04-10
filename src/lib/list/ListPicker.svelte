<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface ListPickerLabel {
		text: string;
		className?: string;
	}

	export interface ListPickerData {
		value: unknown;
		header: string;
		label?: ListPickerLabel;
		description: string;
	}

	interface Props {
		value: unknown;
		data: Array<ListPickerData>;
		header?: Snippet;
	}

	let { value = $bindable(), data, header = undefined }: Props = $props();
</script>

<div class="flex flex-col gap-4">
	<ul class="list bg-base-100 rounded-box shadow-md">
		<li class="p-4 pb-2 text-xs tracking-wide opacity-60">
			{@render header?.()}
		</li>

		<div class="flex flex-col">
			{#each data as dataValue}
				<li>
					<button
						class="list-row flex w-full flex-col gap-2 text-left {value === dataValue.value
							? 'bg-base-300'
							: ''}"
						onclick={() => (value = dataValue.value)}
					>
						<span class="flex w-full flex-row justify-between gap-2">
							<strong> {dataValue.header} </strong>
							<span>
								{#if dataValue.label}
									<span
										class="badge {dataValue.label?.className
											? dataValue.label.className
											: ''} badge-xs"
									>
										{dataValue.label.text}
									</span>
								{/if}
							</span>
						</span>

						<span>
							{dataValue.description}
						</span>
					</button>
				</li>
			{/each}
		</div>
	</ul>
</div>
