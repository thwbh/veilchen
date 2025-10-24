import type { Snippet } from 'svelte';

/**
 * A generic key-value pair interface for selection components.
 * @template K - The type of the key (typically string or number)
 * @template V - The type of the display value (typically string)
 */
export interface KeyValuePair<K = string | number, V = string> {
	key: K;
	value: V;
}

export interface ListPickerLabel {
	text: string;
	className?: string;
	activeClassName?: string;
}

/**
 * Data structure for ListPicker component items.
 * @template T - The type of the value
 */
export interface ListPickerData<T = unknown> {
	value: T;
	header: string;
	label?: ListPickerLabel;
	description: string;
}

export interface OptionCardBadge {
	text: string;
	color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info';
}

export interface OptionCardMetric {
	label: string;
	value: string;
}

/**
 * Data structure for OptionCards component items.
 * @template T - The type of the value
 */
export interface OptionCardData<T = unknown> {
	value: T;
	header: string;
	badge?: OptionCardBadge;
	highlight?: OptionCardBadge;
	text?: string;
	metrics?: Array<OptionCardMetric>;
}

/**
 * Data structure for BottomNavigation component items.
 */
export interface BottomNavItem {
	id: string;
	label: string;
}

/**
 * Data structure for AvatarPicker component items.
 * Supports file paths, URLs, and data URIs (including DiceBear's .toDataUri()).
 */
export interface AvatarOption {
	/** Unique identifier for this avatar option */
	id: string;
	/** Avatar image source - file path, URL, or data URI */
	src: string;
	/** Optional alt text for accessibility */
	alt?: string;
}
