export enum AlertType {
  Info = 'alert-info',
  Error = 'alert-error',
  Warning = 'alert-warning',
  Success = 'alert-success'
}

export enum AlertVariant {
  Box = 'alert alert-horizontal',
  Callout = 'alert alert-horizontal shadow-none border-0 border-l-4 bg-base-100 rounded-xl px-5 py-3'
}

export enum TextSize {
  XS = 'text-xs',
  SM = 'text-sm',
  MD = 'text-base',
  LG = 'text-lg',
  XL = 'text-xl'
}

export enum MenuSize {
  XS = 'menu-xs',
  SM = 'menu-sm',
  MD = 'menu-md',
  LG = 'menu-lg',
  XL = 'menu-xl'
}

export enum DockSize {
  XS = 'dock-xs',
  SM = 'dock-sm',
  MD = 'dock-md',
  LG = 'dock-lg',
  XL = 'dock-xl'
}

/**
 * Maps DockSize enum values to their actual height in rem.
 * These values account for icon + label + internal padding.
 */
export const DOCK_HEIGHT_MAP: Record<DockSize, number> = {
  [DockSize.XS]: 4.5,
  [DockSize.SM]: 5,
  [DockSize.MD]: 5.5,
  [DockSize.LG]: 6,
  [DockSize.XL]: 6.5
};

export enum InputSize {
  XS = 'input-xs',
  SM = 'input-sm',
  MD = 'input-md',
  LG = 'input-lg'
}

/**
 * Provides badge css classes
 */
export enum BadgeColor {
  Primary = 'badge-primary',
  Secondary = 'badge-secondary',
  Accent = 'badge-accent',
  Warning = 'badge-warning',
  Success = 'badge-success',
  Error = 'badge-error',
  Neutral = 'badge-neutral',
  Info = 'badge-info'
}
