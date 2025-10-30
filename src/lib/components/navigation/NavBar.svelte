<script lang="ts">
	import type { NavBarConfig, NavBarItem } from '$lib/types/types.js';

	/**
	 * A responsive navigation bar component for app headers.
	 * Provides three sections (start, center, end) for flexible layout.
	 */
	interface Props {
		/** Configuration object for the navbar */
		config: NavBarConfig;
	}

	let { config }: Props = $props();

	function handleClick(item: NavBarItem) {
		if (item.disabled) return;
		if (item.onclick) {
			item.onclick();
		}
	}

	function renderItem(item: NavBarItem, isDropdown = false) {
		const baseClasses = isDropdown ? '' : 'btn btn-ghost';
		const disabledClass = item.disabled ? 'btn-disabled' : '';
		const activeClass = item.active ? 'btn-active' : '';

		return {
			classes: `${baseClasses} ${disabledClass} ${activeClass}`.trim()
		};
	}
</script>

<div class="navbar {config.bgClass || 'bg-base-100'} {config.textClass || ''} {config.class || ''}">
	<!-- Start Section -->
	<div class="navbar-start">
		{#if config.brand || config.brandIcon}
			{#if config.brandHref}
				<a href={config.brandHref} class="btn btn-ghost text-xl">
					{#if config.brandIcon}
						{@const BrandIcon = config.brandIcon}
						{#if config.brandIconProps}
							<BrandIcon {...config.brandIconProps} />
						{:else}
							<BrandIcon />
						{/if}
					{/if}
					{#if config.brand}
						{config.brand}
					{/if}
				</a>
			{:else}
				<div class="btn btn-ghost text-xl">
					{#if config.brandIcon}
						{@const BrandIcon = config.brandIcon}
						{#if config.brandIconProps}
							<BrandIcon {...config.brandIconProps} />
						{:else}
							<BrandIcon />
						{/if}
					{/if}
					{#if config.brand}
						{config.brand}
					{/if}
				</div>
			{/if}
		{/if}

		{#if config.start}
			{#each config.start as item}
				{#if item.type === 'dropdown' && item.submenu}
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn btn-ghost">
							{#if item.icon}
								{@const IconComponent = item.icon}
								{#if item.iconProps}
									<IconComponent {...item.iconProps} />
								{:else}
									<IconComponent />
								{/if}
							{/if}
							{#if item.label}
								{item.label}
							{/if}
						</div>
						<ul
							tabindex="0"
							class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{#each item.submenu as subitem}
								<li>
									{#if subitem.href}
										<a
											href={subitem.href}
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</a>
									{:else}
										<button
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</button>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{:else if item.content}
					{@render item.content()}
				{:else if item.href}
					<a
						href={item.href}
						class={renderItem(item).classes}
						class:disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</a>
				{:else}
					<button
						class={renderItem(item).classes}
						disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</button>
				{/if}
			{/each}
		{/if}
	</div>

	<!-- Center Section -->
	{#if config.center}
		<div class="navbar-center">
			{#each config.center as item}
				{#if item.type === 'dropdown' && item.submenu}
					<div class="dropdown">
						<div tabindex="0" role="button" class="btn btn-ghost">
							{#if item.icon}
								{@const IconComponent = item.icon}
								{#if item.iconProps}
									<IconComponent {...item.iconProps} />
								{:else}
									<IconComponent />
								{/if}
							{/if}
							{#if item.label}
								{item.label}
							{/if}
						</div>
						<ul
							tabindex="0"
							class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{#each item.submenu as subitem}
								<li>
									{#if subitem.href}
										<a
											href={subitem.href}
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</a>
									{:else}
										<button
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</button>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{:else if item.content}
					{@render item.content()}
				{:else if item.href}
					<a
						href={item.href}
						class={renderItem(item).classes}
						class:disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</a>
				{:else}
					<button
						class={renderItem(item).classes}
						disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	{/if}

	<!-- End Section -->
	{#if config.end}
		<div class="navbar-end">
			{#each config.end as item}
				{#if item.type === 'dropdown' && item.submenu}
					<div class="dropdown dropdown-end">
						<div tabindex="0" role="button" class="btn btn-ghost">
							{#if item.icon}
								{@const IconComponent = item.icon}
								{#if item.iconProps}
									<IconComponent {...item.iconProps} />
								{:else}
									<IconComponent />
								{/if}
							{/if}
							{#if item.label}
								{item.label}
							{/if}
						</div>
						<ul
							tabindex="0"
							class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
						>
							{#each item.submenu as subitem}
								<li>
									{#if subitem.href}
										<a
											href={subitem.href}
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</a>
									{:else}
										<button
											class:disabled={subitem.disabled}
											class:active={subitem.active}
											onclick={() => handleClick(subitem)}
										>
											{#if subitem.icon}
												{@const SubIcon = subitem.icon}
												{#if subitem.iconProps}
													<SubIcon {...subitem.iconProps} />
												{:else}
													<SubIcon />
												{/if}
											{/if}
											{subitem.label}
										</button>
									{/if}
								</li>
							{/each}
						</ul>
					</div>
				{:else if item.content}
					{@render item.content()}
				{:else if item.href}
					<a
						href={item.href}
						class={renderItem(item).classes}
						class:disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</a>
				{:else}
					<button
						class={renderItem(item).classes}
						disabled={item.disabled}
						onclick={() => handleClick(item)}
					>
						{#if item.icon}
							{@const IconComponent = item.icon}
							{#if item.iconProps}
								<IconComponent {...item.iconProps} />
							{:else}
								<IconComponent />
							{/if}
						{/if}
						{#if item.label}
							{item.label}
						{/if}
					</button>
				{/if}
			{/each}
		</div>
	{/if}
</div>
