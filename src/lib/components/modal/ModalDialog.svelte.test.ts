import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import ModalDialog from './ModalDialog.svelte';

describe('ModalDialog', () => {
	test('renders dialog element', () => {
		const { container } = render(ModalDialog);

		const dialog = container.querySelector('dialog');
		expect(dialog).toBeInTheDocument();
	});

	test('renders with default title', () => {
		const { container } = render(ModalDialog);

		expect(container.textContent).toContain('Please confirm');
	});

	test('renders default confirm and cancel buttons', () => {
		const { container } = render(ModalDialog);

		const buttons = container.querySelectorAll('button');
		const buttonTexts = Array.from(buttons).map((btn) => btn.textContent);

		expect(buttonTexts).toContain('Confirm');
		expect(buttonTexts).toContain('Cancel');
	});

	test('calls onconfirm when confirm button is clicked', async () => {
		const onconfirm = vi.fn();
		const { container } = render(ModalDialog, { onconfirm });

		// Mock the dialog close method since jsdom doesn't fully support it
		const dialog = container.querySelector('dialog') as HTMLDialogElement;
		dialog.close = vi.fn();

		const confirmButton = Array.from(container.querySelectorAll('button')).find(
			(btn) => btn.textContent === 'Confirm'
		) as HTMLButtonElement;
		await fireEvent.click(confirmButton);

		expect(onconfirm).toHaveBeenCalled();
	});

	test('calls oncancel when cancel button is clicked', async () => {
		const oncancel = vi.fn();
		const { container } = render(ModalDialog, { oncancel });

		// Mock the dialog close method since jsdom doesn't fully support it
		const dialog = container.querySelector('dialog') as HTMLDialogElement;
		dialog.close = vi.fn();

		const cancelButton = Array.from(container.querySelectorAll('button')).find(
			(btn) => btn.textContent === 'Cancel'
		) as HTMLButtonElement;
		await fireEvent.click(cancelButton);

		expect(oncancel).toHaveBeenCalled();
	});

	test('has modal classes', () => {
		const { container } = render(ModalDialog);

		const dialog = container.querySelector('dialog');
		expect(dialog).toHaveClass('modal');
		expect(dialog).toHaveClass('modal-bottom');
		expect(dialog).toHaveClass('sm:modal-middle');
	});

	test('has modal-box for content area', () => {
		const { container } = render(ModalDialog);

		const modalBox = container.querySelector('.modal-box');
		expect(modalBox).toBeInTheDocument();
	});

	test('binds dialog element reference', () => {
		let dialogRef: HTMLDialogElement | undefined;
		render(ModalDialog, {
			get dialog() {
				return dialogRef;
			},
			set dialog(value) {
				dialogRef = value;
			}
		});

		expect(dialogRef).toBeInstanceOf(HTMLDialogElement);
	});
});
