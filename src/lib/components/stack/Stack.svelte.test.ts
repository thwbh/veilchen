import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import Stack from './Stack.svelte';

describe('Stack', () => {
	test('renders with default index 0', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]');
		expect(stackElement).toBeInTheDocument();
	});

	test('renders correct number of indicators', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 5,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		expect(indicators.length).toBe(5);
	});

	test('marks active indicator', () => {
		const { container } = render(Stack, {
			index: 2,
			size: 4,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		expect(indicators[2]).toHaveClass('active');
	});

	test('has proper ARIA attributes', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]');
		expect(stackElement).toHaveAttribute('role', 'region');
		expect(stackElement).toHaveAttribute('aria-label', 'Swipeable content carousel');
		expect(stackElement).toHaveAttribute('aria-live', 'polite');
	});

	test('is keyboard focusable', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]');
		expect(stackElement).toHaveAttribute('tabindex', '0');
	});

	test('handles arrow right key', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;
		await fireEvent.keyDown(stackElement, { key: 'ArrowRight' });

		expect(onchange).toHaveBeenCalledWith(1);
	});

	test('handles arrow left key', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 2,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;
		await fireEvent.keyDown(stackElement, { key: 'ArrowLeft' });

		expect(onchange).toHaveBeenCalledWith(1);
	});

	test('wraps around from last to first', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 2,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;
		await fireEvent.keyDown(stackElement, { key: 'ArrowRight' });

		expect(onchange).toHaveBeenCalledWith(0);
	});

	test('wraps around from first to last', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;
		await fireEvent.keyDown(stackElement, { key: 'ArrowLeft' });

		expect(onchange).toHaveBeenCalledWith(2);
	});

	test('handles swipe left touch gesture', async () => {
		const onchange = vi.fn();
		const onswipe = vi.fn();
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			onchange,
			onswipe,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;

		// Simulate swipe left (start right, end left)
		await fireEvent.touchStart(stackElement, {
			touches: [{ clientX: 200, clientY: 100 }]
		});
		await fireEvent.touchEnd(stackElement, {
			changedTouches: [{ clientX: 100, clientY: 100 }]
		});

		expect(onswipe).toHaveBeenCalledWith('left');
		expect(onchange).toHaveBeenCalledWith(1);
	});

	test('handles swipe right touch gesture', async () => {
		const onchange = vi.fn();
		const onswipe = vi.fn();
		const { container } = render(Stack, {
			index: 1,
			size: 3,
			onchange,
			onswipe,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;

		// Simulate swipe right (start left, end right)
		await fireEvent.touchStart(stackElement, {
			touches: [{ clientX: 100, clientY: 100 }]
		});
		await fireEvent.touchEnd(stackElement, {
			changedTouches: [{ clientX: 200, clientY: 100 }]
		});

		expect(onswipe).toHaveBeenCalledWith('right');
		expect(onchange).toHaveBeenCalledWith(0);
	});

	test('ignores small swipe gestures', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;

		// Simulate small swipe (less than minSwipeDistance)
		await fireEvent.touchStart(stackElement, {
			touches: [{ clientX: 100, clientY: 100 }]
		});
		await fireEvent.touchEnd(stackElement, {
			changedTouches: [{ clientX: 130, clientY: 100 }]
		});

		expect(onchange).not.toHaveBeenCalled();
	});

	test('clicking indicator jumps to that card', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		await fireEvent.click(indicators[2]);

		expect(onchange).toHaveBeenCalledWith(2);
	});

	test('clicking active indicator does nothing', async () => {
		const onchange = vi.fn();
		const { container } = render(Stack, {
			index: 1,
			size: 3,
			onchange,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		await fireEvent.click(indicators[1]);

		expect(onchange).not.toHaveBeenCalled();
	});

	test('indicators have proper ARIA attributes', () => {
		const { container } = render(Stack, {
			index: 1,
			size: 3,
			card: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const tablist = container.querySelector('[role="tablist"]');
		expect(tablist).toHaveAttribute('aria-label', 'Card navigation');

		const indicators = container.querySelectorAll('[role="tab"]');
		expect(indicators.length).toBe(3);

		// Check active indicator
		expect(indicators[1]).toHaveAttribute('aria-selected', 'true');
		expect(indicators[1]).toHaveAttribute('aria-current', 'true');
		expect(indicators[1]).toHaveAttribute('tabindex', '0');

		// Check inactive indicators
		expect(indicators[0]).toHaveAttribute('aria-selected', 'false');
		expect(indicators[0]).not.toHaveAttribute('aria-current');
		expect(indicators[0]).toHaveAttribute('tabindex', '-1');
	});
});
