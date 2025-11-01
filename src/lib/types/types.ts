import type { Snippet, Component } from 'svelte';

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
  /** Optional href for navigation (uses <a> tag instead of <button>) */
  href?: string;
  /** Optional icon component for rendering custom icons */
  icon?: Component;
  /** Optional props to pass to the icon component */
  iconProps?: Record<string, any>;
  /** Optional click handler for this specific item */
  onclick?: () => void;
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

/**
 * Data structure for Breadcrumbs component items.
 */
export interface BreadcrumbItem {
  /** Unique identifier for the breadcrumb */
  id: string;
  /** Label text to display */
  label?: string;
  /** Optional href for navigation */
  href?: string;
  /** Optional click handler */
  onclick?: () => void;
  /** Optional icon component for rendering custom icons */
  icon?: Component;
  /** Optional props to pass to the icon component */
  iconProps?: Record<string, any>;
}

/**
 * Data structure for Menu component items.
 */
export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Label text to display */
  label: string;
  /** Optional href for navigation */
  href?: string;
  /** Optional click handler */
  onclick?: () => void;
  /** Optional icon component for rendering custom icons */
  icon?: Component;
  /** Optional props to pass to the icon component */
  iconProps?: Record<string, any>;
  /** Mark this item as active */
  active?: boolean;
  /** Mark this item as disabled */
  disabled?: boolean;
  /** Optional nested submenu items */
  submenu?: MenuItem[];
  /** For submenu parents - whether to show submenu by default */
  submenuOpen?: boolean;
}

/**
 * Data structure for Menu component section titles.
 */
export interface MenuTitle {
  /** Unique identifier for the title */
  id: string;
  /** Title text to display */
  title: string;
  /** Optional menu items under this title */
  items?: MenuItem[];
}

/**
 * Data structure for NavBar component items.
 */
export interface NavBarItem {
  /** Unique identifier for the navbar item */
  id: string;
  /** Label text to display */
  label?: string;
  /** Optional href for navigation */
  href?: string;
  /** Optional click handler */
  onclick?: () => void;
  /** Optional icon component for rendering custom icons */
  icon?: Component;
  /** Optional props to pass to the icon component */
  iconProps?: Record<string, any>;
  /** Mark this item as active */
  active?: boolean;
  /** Mark this item as disabled */
  disabled?: boolean;
  /** Type of navbar item: 'button', 'link', 'dropdown', or 'custom' */
  type?: 'button' | 'link' | 'dropdown' | 'custom';
  /** For dropdown items - submenu items */
  submenu?: NavBarItem[];
  /** Custom content snippet for advanced use cases */
  content?: Snippet;
}

/**
 * Configuration for NavBar component.
 */
export interface NavBarConfig {
  /** Items to display in the start section (left side) */
  start?: NavBarItem[];
  /** Items to display in the center section */
  center?: NavBarItem[];
  /** Items to display in the end section (right side) */
  end?: NavBarItem[];
  /** Optional brand/logo text */
  brand?: string;
  /** Optional brand href */
  brandHref?: string;
  /** Optional brand icon */
  brandIcon?: Component;
  /** Optional brand icon props */
  brandIconProps?: Record<string, any>;
  /** Background color class (e.g., 'bg-base-100', 'bg-neutral') */
  bgClass?: string;
  /** Text color class (e.g., 'text-neutral-content') */
  textClass?: string;
  /** Additional CSS classes */
  class?: string;
}
