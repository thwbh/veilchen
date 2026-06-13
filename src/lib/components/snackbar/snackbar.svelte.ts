export type SnackbarDismissReason = 'timeout' | 'action' | 'manual';

export interface SnackbarMessage {
	id: string;
	message: string;
	actionLabel?: string;
	onAction?: () => void;
	onDismiss?: (reason: SnackbarDismissReason) => void;
	duration?: number;
	dismissible?: boolean;
}

interface SnackbarOptions {
	actionLabel?: string;
	onAction?: () => void;
	onDismiss?: (reason: SnackbarDismissReason) => void;
	duration?: number;
	dismissible?: boolean;
}

class SnackbarStore {
	private snackbars = $state<SnackbarMessage[]>([]);
	private idCounter = 0;

	get all(): SnackbarMessage[] {
		return this.snackbars;
	}

	add(message: string, options: SnackbarOptions = {}): string {
		const id = `snackbar-${Date.now()}-${this.idCounter++}`;
		const duration = options.duration ?? 5000; // 5 seconds default for snackbar
		const snackbar: SnackbarMessage = {
			id,
			message,
			actionLabel: options.actionLabel,
			onAction: options.onAction,
			onDismiss: options.onDismiss,
			duration,
			dismissible: options.dismissible ?? true
		};

		this.snackbars = [...this.snackbars, snackbar];

		if (duration > 0) {
			setTimeout(() => {
				this.dismiss(id, 'timeout');
			}, duration);
		}

		return id;
	}

	dismiss(id: string, reason: SnackbarDismissReason): void {
		const snackbar = this.snackbars.find((s) => s.id === id);
		if (snackbar) {
			// Call onDismiss callback if provided
			if (snackbar.onDismiss) {
				snackbar.onDismiss(reason);
			}

			// Call onAction callback if action was triggered
			if (reason === 'action' && snackbar.onAction) {
				snackbar.onAction();
			}
		}

		this.snackbars = this.snackbars.filter((s) => s.id !== id);
	}

	clear(): void {
		this.snackbars = [];
	}

	// Convenience method for simple snackbars
	show(message: string, actionLabel?: string, onAction?: () => void, duration?: number): string {
		return this.add(message, { actionLabel, onAction, duration });
	}
}

export const snackbar = new SnackbarStore();
