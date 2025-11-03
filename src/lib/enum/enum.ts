export enum AlertType {
	Info = 'alert-info',
	Error = 'alert-error',
	Warning = 'alert-warning',
	Success = 'alert-success'
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
