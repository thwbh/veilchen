<script lang="ts">
	import type { MenuItem, MenuTitle } from '$lib/types/types.js';
	import { MenuSize } from '$lib/enum/enum.js';

	interface Props {
		/** Array of menu items to display */
		items?: MenuItem[];
		/** Array of menu sections with titles */
		sections?: MenuTitle[];
		/** Optional CSS class for customization */
		class?: string;
		/** Optional size variant */
		size?: MenuSize;
		/** Layout orientation */
		orientation?: 'vertical' | 'horizontal';
		/** Background styling */
		background?: string;
		/** Border radius styling */
		rounded?: boolean;
		/** Width of the menu */
		width?: string;
	}

	let {
		items = [],
		sections = [],
		class: className = '',
		size = MenuSize.MD,
		orientation = 'vertical',
		background = 'bg-base-200',
		rounded = true,
		width = 'w-56'
	}: Props = $props();

	const orientationClass = orientation === 'horizontal' ? 'menu-horizontal' : '';
	const roundedClass = rounded ? 'rounded-box' : '';

	function handleClick(item: MenuItem, event: MouseEvent) {
		if (item.disabled) {
			event.preventDefault();
			return;
		}
		if (item.onclick) {
			event.preventDefault();
			item.onclick();
		}
	}

	function renderMenuItem(item: MenuItem, level: number = 0) {
		const hasSubmenu = item.submenu && item.submenu.length > 0;
		const itemClasses = `${item.active ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`;

		return { item, hasSubmenu, itemClasses };
	}
</script>

<ul class="menu {size} {orientationClass} {background} {roundedClass} {width} {className}">
	{#if sections.length > 0}
		<!-- Render sections with titles -->
		{#each sections as section (section.id)}
			<li class="menu-title">{section.title}</li>
			{#if section.items}
				{#each section.items as item (item.id)}
					{@const { hasSubmenu, itemClasses } = renderMenuItem(item)}
					<li class={itemClasses}>
						{#if hasSubmenu}
							<!-- Collapsible submenu using details -->
							<details open={item.submenuOpen}>
								<summary>
									{#if item.icon}
										{#if item.iconProps}
											<item.icon {...item.iconProps} />
										{:else}
											<item.icon />
										{/if}
									{/if}
									{item.label}
								</summary>
								<ul>
									{#each item.submenu as subitem (subitem.id)}
										{@const subData = renderMenuItem(subitem, 1)}
										<li class={subData.itemClasses}>
											{#if subitem.href && !subitem.disabled}
												<a href={subitem.href} onclick={(e) => handleClick(subitem, e)}>
													{#if subitem.icon}
														{#if subitem.iconProps}
															<subitem.icon {...subitem.iconProps} />
														{:else}
															<subitem.icon />
														{/if}
													{/if}
													{subitem.label}
												</a>
											{:else}
												<button
													type="button"
													onclick={(e) => handleClick(subitem, e)}
													disabled={subitem.disabled}
												>
													{#if subitem.icon}
														{#if subitem.iconProps}
															<subitem.icon {...subitem.iconProps} />
														{:else}
															<subitem.icon />
														{/if}
													{/if}
													{subitem.label}
												</button>
											{/if}
										</li>
									{/each}
								</ul>
							</details>
						{:else if item.href && !item.disabled}
							<a href={item.href} onclick={(e) => handleClick(item, e)}>
								{#if item.icon}
									{#if item.iconProps}
										<item.icon {...item.iconProps} />
									{:else}
										<item.icon />
									{/if}
								{/if}
								{item.label}
							</a>
						{:else}
							<button type="button" onclick={(e) => handleClick(item, e)} disabled={item.disabled}>
								{#if item.icon}
									{#if item.iconProps}
										<item.icon {...item.iconProps} />
									{:else}
										<item.icon />
									{/if}
								{/if}
								{item.label}
							</button>
						{/if}
					</li>
				{/each}
			{/if}
		{/each}
	{:else}
		<!-- Render flat items without sections -->
		{#each items as item (item.id)}
			{@const { hasSubmenu, itemClasses } = renderMenuItem(item)}
			<li class={itemClasses}>
				{#if hasSubmenu}
					<!-- Collapsible submenu using details -->
					<details open={item.submenuOpen}>
						<summary>
							{#if item.icon}
								{#if item.iconProps}
									<item.icon {...item.iconProps} />
								{:else}
									<item.icon />
								{/if}
							{/if}
							{item.label}
						</summary>
						<ul>
							{#each item.submenu as subitem (subitem.id)}
								{@const subData = renderMenuItem(subitem, 1)}
								<li class={subData.itemClasses}>
									{#if subitem.href && !subitem.disabled}
										<a href={subitem.href} onclick={(e) => handleClick(subitem, e)}>
											{#if subitem.icon}
												{#if subitem.iconProps}
													<subitem.icon {...subitem.iconProps} />
												{:else}
													<subitem.icon />
												{/if}
											{/if}
											{subitem.label}
										</a>
									{:else}
										<button
											type="button"
											onclick={(e) => handleClick(subitem, e)}
											disabled={subitem.disabled}
										>
											{#if subitem.icon}
												{#if subitem.iconProps}
													<subitem.icon {...subitem.iconProps} />
												{:else}
													<subitem.icon />
												{/if}
											{/if}
											{subitem.label}
										</button>
									{/if}
								</li>
							{/each}
						</ul>
					</details>
				{:else if item.href && !item.disabled}
					<a href={item.href} onclick={(e) => handleClick(item, e)}>
						{#if item.icon}
							{#if item.iconProps}
								<item.icon {...item.iconProps} />
							{:else}
								<item.icon />
							{/if}
						{/if}
						{item.label}
					</a>
				{:else}
					<button type="button" onclick={(e) => handleClick(item, e)} disabled={item.disabled}>
						{#if item.icon}
							{#if item.iconProps}
								<item.icon {...item.iconProps} />
							{:else}
								<item.icon />
							{/if}
						{/if}
						{item.label}
					</button>
				{/if}
			</li>
		{/each}
	{/if}
</ul>

<style>
	.menu button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		color: inherit;
		cursor: pointer;
		text-align: left;
		width: 100%;
	}

	.menu button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
