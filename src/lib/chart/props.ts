import type { HTMLCanvasAttributes } from 'svelte/elements';
import type { ChartData, ChartOptions, ChartTypeRegistry, Point } from 'chart.js';

/**
 * Props interface for Chart.js-based chart components.
 * @template T - The chart type (line, bar, polarArea, etc.)
 */
export interface ChartProps<T extends keyof ChartTypeRegistry> extends HTMLCanvasAttributes {
	/** Chart data configuration (datasets, labels, etc.) */
	data: ChartData<T, (number | [number, number] | Point)[], unknown>;
	/** Chart configuration options (scales, plugins, etc.) */
	options: ChartOptions<T>;
}
