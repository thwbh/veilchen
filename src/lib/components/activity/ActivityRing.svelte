<script lang="ts">
	import type { Snippet } from 'svelte';

	export interface ActivityRingEntry {
		/** Unique identifier for this ring */
		key: string;
		/** Label displayed below the ring */
		label: string;
		/** Current value (must be <= goal) */
		current: number;
		/** Target/goal value */
		goal: number;
		/** Color - accepts Tailwind/DaisyUI color names or hex values */
		color: string;
		/** Optional icon name or component for the ring label */
		icon?: string;
	}

	/**
	 * A fitness-style activity ring component for displaying
	 * concentric progress rings (like Apple Watch activity rings).
	 *
	 * Supports 1-3 rings with per-ring labels, colors, and icons.
	 * Animated fill on mount.
	 */
	export interface Props {
		/** Ring data - one to three rings */
		rings: ActivityRingEntry[];
		/** Center label (e.g. "8,432") */
		label: string;
		/** Center subtitle (e.g. "steps") */
		subtitle?: string;
		/** Size variant */
		size?: 'sm' | 'md' | 'lg' | 'xl';
		/** Animation duration in ms */
		animationDuration?: number;
		/** Stroke width in px */
		strokeWidth?: number;
		/** Show/hide the center number */
		showCenter?: boolean;
		/** CSS class to apply to the container */
		class?: string;
		/** Optional content to display below the rings */
		children?: Snippet;
	}

	let {
		rings,
		label,
		subtitle,
		size = 'md',
		animationDuration = 1000,
		strokeWidth: baseStrokeWidth,
		showCenter = true,
		class: className = '',
		children
	}: Props = $props();

	// Size mappings
	const SIZE_MAP: Record<string, { diameter: number; fontSize: string; labelFontSize: string }> = {
		sm: { diameter: 96, fontSize: '1.25rem', labelFontSize: '0.625rem' },
		md: { diameter: 140, fontSize: '2rem', labelFontSize: '0.75rem' },
		lg: { diameter: 196, fontSize: '2.75rem', labelFontSize: '0.875rem' },
		xl: { diameter: 260, fontSize: '3.5rem', labelFontSize: '1rem' }
	};

	let config = $derived(SIZE_MAP[size]);

	// Stroke width handling
	const strokeWidth = $derived(
		typeof baseStrokeWidth === 'number'
			? baseStrokeWidth
			: size === 'sm'
				? 8
				: size === 'md'
					? 12
					: size === 'lg'
						? 14
						: 16
	);

	// Color handling
	function isColorClass(c: string): boolean {
		return c.startsWith('#') || c.startsWith('rgb') || c.startsWith('hsl') || c.startsWith('oklch');
	}

	// Animation state
	// svelte-ignore state_referenced_locally
	let currentValues = $state(rings.map((r) => 0));
	let animated = $state(false);
	let animationFrame = $state<number | null>(null);

	$effect(() => {
		// Reset values when rings prop changes
		currentValues = rings.map((r) => 0);
		animated = false;
		if (animationFrame) {
			cancelAnimationFrame(animationFrame);
			animationFrame = null;
		}
	});

	$effect(() => {
		if (animated) return;

		const targetValues = rings.map((r) => Math.min(r.current, r.goal));

		const start = performance.now();
		const duration = animationDuration;

		const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

		const animate = (now: number): void => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const eased = easeOutCubic(progress);

			currentValues = rings.map((_, i) => targetValues[i] * eased);

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate);
			} else {
				currentValues = targetValues;
				animated = true;
				animationFrame = null;
			}
		};

		animationFrame = requestAnimationFrame(animate);
	});

	// SVG ring calculation
	const radius = $derived((config.diameter - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);

	function getRingProps(index: number) {
		const entry = rings[index];
		const progress = Math.min(entry.current / entry.goal, 1);
		const offset = circumference * (1 - progress);

		// Offset each ring so they don't all start at the same point
		const ringOffset = index * 4;

		return {
			offset,
			ringOffset,
			color: entry.color,
			opacity: 1 - index * 0.12
		};
	}

	// Color helper
	function resolveColor(color: string): string {
		if (isColorClass(color)) return color;
		return `var(--${color}, ${color})`;
	}

	function formatNumber(n: number): string {
		if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
		return Math.round(n).toString();
	}
</script>

<div
	class="activity-ring-container {className}"
	role="group"
	aria-label={subtitle || label || 'Activity rings'}
>
	<div
		class="activity-ring-wrapper"
		style="width: {config.diameter}px; height: {config.diameter}px;"
	>
		<svg
			class="activity-ring-svg"
			viewBox={`0 0 ${config.diameter} ${config.diameter}`}
			width={config.diameter}
			height={config.diameter}
		>
			{#each rings as ring, index}
				{@const { offset, ringOffset, color, opacity } = getRingProps(index)}

				<!-- Track (background) -->
				<circle
					cx={config.diameter / 2}
					cy={config.diameter / 2}
					r={radius}
					fill="none"
					stroke="currentColor"
					stroke-width={strokeWidth}
					opacity={0.1}
					stroke-linecap="round"
					transform={`rotate(-90 ${config.diameter / 2} ${config.diameter / 2})`}
				/>

				<!-- Progress ring -->
				<circle
					class="activity-ring-progress"
					cx={config.diameter / 2}
					cy={config.diameter / 2}
					r={radius}
					fill="none"
					stroke-width={strokeWidth}
					stroke-linecap="round"
					stroke-dasharray={circumference}
					stroke-dashoffset={offset}
					{opacity}
					transform={`rotate(-90 ${config.diameter / 2} ${config.diameter / 2})`}
					style="stroke: {resolveColor(color)}; transition: none;"
					role="progressbar"
					aria-valuenow={Math.round(ring.current)}
					aria-valuemin="0"
					aria-valuemax={ring.goal}
					aria-label={ring.label}
					data-ring-key={ring.key}
				/>
			{/each}
		</svg>

		<!-- Center content -->
		{#if showCenter}
			<div class="activity-ring-center" style="font-size: {config.fontSize};">
				<span class="activity-ring-label">{label}</span>
				{#if subtitle}
					<span class="activity-ring-subtitle">{subtitle}</span>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Per-ring labels -->
	{#if rings.length > 1}
		<div class="activity-ring-legend">
			{#each rings as ring, index}
				{@const { color } = getRingProps(index)}
				<div class="activity-ring-legend-item">
					<span class="activity-ring-legend-dot" style="background-color: {resolveColor(color)};"
					></span>
					<span class="activity-ring-legend-label" style="font-size: {config.labelFontSize};">
						{ring.label}
					</span>
					<span class="activity-ring-legend-value" style="font-size: {config.labelFontSize};">
						{formatNumber(currentValues[index])} / {formatNumber(ring.goal)}
					</span>
				</div>
			{/each}
		</div>
	{/if}

	{#if children}
		<div class="activity-ring-footer">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.activity-ring-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.activity-ring-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.activity-ring-svg {
		width: 100%;
		height: 100%;
	}

	.activity-ring-center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.125rem;
		line-height: 1;
	}

	.activity-ring-label {
		font-weight: 700;
		line-height: 1;
	}

	.activity-ring-subtitle {
		font-size: 0.75rem;
		opacity: 0.6;
		font-weight: 500;
	}

	.activity-ring-legend {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.375rem;
	}

	.activity-ring-legend-item {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.activity-ring-legend-dot {
		width: 8px;
		height: 8px;
		border-radius: 9999px;
		flex-shrink: 0;
	}

	.activity-ring-legend-label {
		opacity: 0.6;
	}

	.activity-ring-legend-value {
		font-weight: 600;
	}

	.activity-ring-footer {
		width: 100%;
	}
</style>
