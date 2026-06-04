import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest';
import { createRawSnippet } from 'svelte';
import InlineNumberWheel from './InlineNumberWheel.svelte';

describe('InlineNumberWheel', () => {
	test('renders with numbers', () => {
		const { container } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 10
			}
		});

		expect(container.querySelectorAll('.wheel-item').length).toBe(5);
		expect(screen.getByText('1')).toBeInTheDocument();
		expect(screen.getByText('10')).toBeInTheDocument();
	});

	test('selects initial value', () => {
		const { container } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 10
			}
		});

		const selectedItem = container.querySelector('.wheel-item.selected');
		expect(selectedItem).toBeInTheDocument();
		expect(selectedItem?.textContent).toBe('10');
	});

	test('wheel items do not respond to clicks (scroll-only interaction)', async () => {
		const handleChange = vi.fn();
		const { container } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 10,
				onchange: handleChange
			}
		});

		const item50 = screen.getByText('100');
		await fireEvent.click(item50);

		// Wheel items should not respond to clicks - interaction is scroll-only
		expect(handleChange).not.toHaveBeenCalled();
	});

	test('scrolls selected value into view when clientHeight is available', async () => {
		// This test simulates the scenario where the component is mounted
		// but the layout hasn't been calculated yet (clientHeight = 0)
		const { container } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 10
			}
		});

		const wheelElement = container.querySelector('.inline-number-wheel') as HTMLElement;

		// The selected item (10) should be scrolled into view
		const selectedIndex = 2; // 10 is at index 2
		const expectedScrollTop = selectedIndex * 32; // ITEM_HEIGHT = 32

		// Wait a bit for any ResizeObserver callbacks to fire
		await new Promise((resolve) => setTimeout(resolve, 50));

		// Check that the scroll position is correct
		const actualScrollTop = wheelElement.scrollTop;
		expect(actualScrollTop).toBe(expectedScrollTop);
	});

	test('scrolls to selected value when value changes', async () => {
		const { container, rerender } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 1
			}
		});

		const wheelElement = container.querySelector('.inline-number-wheel') as HTMLElement;

		// Change the value to 100 (index 3)
		await rerender({
			numbers: [1, 5, 10, 100, 250],
			value: 100
		});

		// Wait for the scroll to happen
		await new Promise((resolve) => setTimeout(resolve, 50));

		// The scroll position should be at index 3
		const expectedScrollTop = 3 * 32; // ITEM_HEIGHT = 32
		const actualScrollTop = wheelElement.scrollTop;
		expect(actualScrollTop).toBe(expectedScrollTop);
	});

	test('handles value changes with ResizeObserver fallback', async () => {
		// This test verifies that the ResizeObserver fallback works
		// when clientHeight is 0 (simulating the dialog scenario)
		const { container } = render(InlineNumberWheel, {
			props: {
				numbers: [1, 5, 10, 100, 250],
				value: 10
			}
		});

		const wheelElement = container.querySelector('.inline-number-wheel') as HTMLElement;

		// The component should have scrolled to the selected value (10 at index 2)
		const selectedIndex = 2;
		const expectedScrollTop = selectedIndex * 32;

		// Wait for any ResizeObserver callbacks to complete
		await new Promise((resolve) => setTimeout(resolve, 100));

		const actualScrollTop = wheelElement.scrollTop;
		expect(actualScrollTop).toBe(expectedScrollTop);
	});
});
