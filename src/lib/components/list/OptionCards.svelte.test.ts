import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import OptionCards from './OptionCards.svelte';
import type { OptionCardData } from '$lib/types/types.js';

describe('OptionCards', () => {
	const mockData: OptionCardData<string>[] = [
		{
			value: 'basic',
			header: 'Basic Plan'
		},
		{
			value: 'pro',
			header: 'Pro Plan',
			badge: {
				text: '$29/mo',
				color: 'primary'
			}
		},
		{
			value: 'enterprise',
			header: 'Enterprise Plan',
			badge: {
				text: '$99/mo',
				color: 'secondary'
			},
			highlight: {
				text: 'Popular',
				color: 'success'
			}
		}
	];

	test('renders all option cards', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData
		});

		expect(container.textContent).toContain('Basic Plan');
		expect(container.textContent).toContain('Pro Plan');
		expect(container.textContent).toContain('Enterprise Plan');
	});

	test('marks selected card with border', () => {
		const { container } = render(OptionCards, {
			value: 'pro',
			data: mockData
		});

		const cards = container.querySelectorAll('.card');
		expect(cards[1]).toHaveClass('border-primary');
	});

	test('sets aria-pressed on selected card', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
		expect(buttons[1]).toHaveAttribute('aria-pressed', 'false');
	});

	test('shows checkmark on selected card', () => {
		const { container } = render(OptionCards, {
			value: 'pro',
			data: mockData
		});

		const checkmarks = container.querySelectorAll('.bg-primary');
		expect(checkmarks.length).toBeGreaterThan(0);
	});

	test('calls onchange when card is clicked', async () => {
		const onchange = vi.fn();
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData,
			onchange
		});

		const cards = container.querySelectorAll('button');
		await fireEvent.click(cards[1]);

		expect(onchange).toHaveBeenCalledWith('pro');
	});

	test('renders badge when provided', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData
		});

		expect(container.textContent).toContain('$29/mo');
		expect(container.textContent).toContain('$99/mo');
	});

	test('renders highlight badge when provided', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData
		});

		expect(container.textContent).toContain('Popular');
	});

	test('renders metrics when provided', () => {
		const dataWithMetrics: OptionCardData<string>[] = [
			{
				value: 'plan1',
				header: 'Plan 1',
				metrics: [
					{ label: 'Storage', value: '100 GB' },
					{ label: 'Users', value: '10' }
				]
			}
		];

		const { container } = render(OptionCards, {
			value: 'plan1',
			data: dataWithMetrics
		});

		expect(container.textContent).toContain('Storage');
		expect(container.textContent).toContain('100 GB');
		expect(container.textContent).toContain('Users');
		expect(container.textContent).toContain('10');
	});

	test('applies correct grid columns for metrics', () => {
		const dataWith2Metrics: OptionCardData<string>[] = [
			{
				value: 'plan1',
				header: 'Plan 1',
				metrics: [
					{ label: 'Metric 1', value: 'Value 1' },
					{ label: 'Metric 2', value: 'Value 2' }
				]
			}
		];

		const { container } = render(OptionCards, {
			value: 'plan1',
			data: dataWith2Metrics
		});

		const metricsGrid = container.querySelector('.grid');
		expect(metricsGrid).toHaveClass('grid-cols-2');
	});

	test('applies scrollable class when scrollable is true', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData,
			scrollable: true
		});

		const scrollContainer = container.querySelector('.overflow-y-auto');
		expect(scrollContainer).toBeInTheDocument();
	});

	test('does not apply scrollable class when scrollable is false', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData,
			scrollable: false
		});

		const scrollContainer = container.querySelector('.overflow-y-auto');
		expect(scrollContainer).not.toBeInTheDocument();
	});

	test('applies custom maxHeight', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData,
			scrollable: true,
			maxHeight: '600px'
		});

		const scrollContainer = container.querySelector('.overflow-y-auto') as HTMLElement;
		expect(scrollContainer?.style.maxHeight).toBe('600px');
	});

	test('works with numeric values', () => {
		const numericData: OptionCardData<number>[] = [
			{ value: 1, header: 'Option 1' },
			{ value: 2, header: 'Option 2' }
		];

		const onchange = vi.fn();
		const { container } = render(OptionCards, {
			value: 1,
			data: numericData,
			onchange
		});

		const cards = container.querySelectorAll('button');
		fireEvent.click(cards[1]);

		expect(onchange).toHaveBeenCalledWith(2);
	});

	test('renders all cards as buttons', () => {
		const { container } = render(OptionCards, {
			value: 'basic',
			data: mockData
		});

		const buttons = container.querySelectorAll('button.card');
		expect(buttons.length).toBe(mockData.length);
	});
});
