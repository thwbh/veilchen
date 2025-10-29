import { AlertType } from '$lib/enum/enum.js';

export interface ToastMessage {
	id: string;
	message: string;
	type: AlertType;
	duration?: number;
	dismissible?: boolean;
}

interface ToastOptions {
	type?: AlertType;
	duration?: number;
	dismissible?: boolean;
}

class ToastStore {
	private toasts = $state<ToastMessage[]>([]);
	private idCounter = 0;

	get all(): ToastMessage[] {
		return this.toasts;
	}

	add(message: string, options: ToastOptions = {}): string {
		const id = `toast-${Date.now()}-${this.idCounter++}`;
		const duration = options.duration ?? 4000;
		const toast: ToastMessage = {
			id,
			message,
			type: options.type ?? AlertType.Info,
			duration,
			dismissible: options.dismissible ?? true
		};

		this.toasts = [...this.toasts, toast];

		if (duration > 0) {
			setTimeout(() => {
				this.remove(id);
			}, duration);
		}

		return id;
	}

	remove(id: string): void {
		this.toasts = this.toasts.filter((t) => t.id !== id);
	}

	clear(): void {
		this.toasts = [];
	}

	// Convenience methods
	success(message: string, duration?: number): string {
		return this.add(message, { type: AlertType.Success, duration });
	}

	error(message: string, duration?: number): string {
		return this.add(message, { type: AlertType.Error, duration });
	}

	warning(message: string, duration?: number): string {
		return this.add(message, { type: AlertType.Warning, duration });
	}

	info(message: string, duration?: number): string {
		return this.add(message, { type: AlertType.Info, duration });
	}
}

export const toast = new ToastStore();
