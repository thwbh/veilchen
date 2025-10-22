import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import Stack from './Stack.svelte';

describe('Stack', () => {
	test('renders with default index 0', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			card: () => {}
		});

		const stackElement = container.querySelector('[role="region"]');
		expect(stackElement).toBeInTheDocument();
	});

	test('renders correct number of indicators', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 5,
			card: () => {}
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		expect(indicators.length).toBe(5);
	});

	test('marks active indicator', () => {
		const { container } = render(Stack, {
			index: 2,
			size: 4,
			card: () => {}
		});

		const indicators = container.querySelectorAll('.indicator-bubble');
		expect(indicators[2]).toHaveClass('active');
	});

	test('has proper ARIA attributes', () => {
		const { container } = render(Stack, {
			index: 0,
			size: 3,
			card: () => {}
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
			card: () => {}
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
			card: () => {}
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
			card: () => {}
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
			card: () => {}
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
			card: () => {}
		});

		const stackElement = container.querySelector('[role="region"]') as HTMLElement;
		await fireEvent.keyDown(stackElement, { key: 'ArrowLeft' });

		expect(onchange).toHaveBeenCalledWith(2);
	});
});
