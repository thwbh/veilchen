import { describe, it, expect, vi, beforeEach } from 'vitest';
import { snackbar } from './snackbar.svelte.js';
import type { SnackbarDismissReason } from './snackbar.svelte.js';

describe('Snackbar Store', () => {
	beforeEach(() => {
		snackbar.clear();
	});

	it('should add a snackbar to the store', () => {
		const id = snackbar.add('Test message');
		expect(snackbar.all.length).toBe(1);
		expect(snackbar.all[0].message).toBe('Test message');
		expect(snackbar.all[0].id).toBe(id);
	});

	it('should add snackbar with action', () => {
		const onAction = vi.fn();
		const id = snackbar.add('Test with action', {
			actionLabel: 'Undo',
			onAction
		});

		expect(snackbar.all[0].actionLabel).toBe('Undo');
		expect(snackbar.all[0].onAction).toBe(onAction);
	});

	it('should call onAction when action is triggered', () => {
		const onAction = vi.fn();
		const id = snackbar.add('Test', { onAction });
		snackbar.dismiss(id, 'action');
		expect(onAction).toHaveBeenCalled();
	});

	it('should call onDismiss with correct reason', () => {
		const onDismiss = vi.fn();
		const id = snackbar.add('Test', { onDismiss });
		snackbar.dismiss(id, 'timeout');
		expect(onDismiss).toHaveBeenCalledWith('timeout');
	});

	it('should use default duration of 5000ms', () => {
		const id = snackbar.add('Test');
		expect(snackbar.all[0].duration).toBe(5000);
	});

	it('should use custom duration', () => {
		const id = snackbar.add('Test', { duration: 3000 });
		expect(snackbar.all[0].duration).toBe(3000);
	});

	it('should be dismissible by default', () => {
		const id = snackbar.add('Test');
		expect(snackbar.all[0].dismissible).toBe(true);
	});

	it('should support non-dismissible snackbars', () => {
		const id = snackbar.add('Test', { dismissible: false });
		expect(snackbar.all[0].dismissible).toBe(false);
	});

	it('should remove snackbar when dismissed', () => {
		const id = snackbar.add('Test');
		expect(snackbar.all.length).toBe(1);
		snackbar.dismiss(id, 'manual');
		expect(snackbar.all.length).toBe(0);
	});

	it('should clear all snackbars', () => {
		snackbar.add('Test 1');
		snackbar.add('Test 2');
		expect(snackbar.all.length).toBe(2);
		snackbar.clear();
		expect(snackbar.all.length).toBe(0);
	});

	it('should use show() convenience method', () => {
		const onAction = vi.fn();
		const id = snackbar.show('Convenience test', 'Action', onAction, 3000);
		expect(snackbar.all[0].message).toBe('Convenience test');
		expect(snackbar.all[0].actionLabel).toBe('Action');
		expect(snackbar.all[0].onAction).toBe(onAction);
		expect(snackbar.all[0].duration).toBe(3000);
	});

	it('should generate unique IDs', () => {
		const id1 = snackbar.add('Test 1');
		const id2 = snackbar.add('Test 2');
		expect(id1).not.toBe(id2);
		expect(id1).toMatch(/^snackbar-\d+-\d+$/);
	});
});
