import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import ListPicker from './ListPicker.svelte';
import type { ListPickerData } from '$lib/types/types.js';

describe('ListPicker', () => {
	const mockData: ListPickerData<string>[] = [
		{
			value: 'option1',
			header: 'Option 1',
			description: 'First option'
		},
		{
			value: 'option2',
			header: 'Option 2',
			description: 'Second option'
		},
		{
			value: 'option3',
			header: 'Option 3',
			description: 'Third option'
		}
	];

	test('renders all list items', () => {
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData
		});

		expect(container.textContent).toContain('Option 1');
		expect(container.textContent).toContain('Option 2');
		expect(container.textContent).toContain('Option 3');
	});

	test('renders item descriptions', () => {
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData
		});

		expect(container.textContent).toContain('First option');
		expect(container.textContent).toContain('Second option');
		expect(container.textContent).toContain('Third option');
	});

	test('marks selected item with background', () => {
		const { container } = render(ListPicker, {
			value: 'option2',
			data: mockData
		});

		const buttons = container.querySelectorAll('.list-row');
		expect(buttons[1]).toHaveClass('bg-base-300');
	});

	test('sets aria-pressed on selected item', () => {
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData
		});

		const buttons = container.querySelectorAll('.list-row');
		expect(buttons[0]).toHaveAttribute('aria-pressed', 'true');
		expect(buttons[1]).toHaveAttribute('aria-pressed', 'false');
	});

	test('calls onchange when item is clicked', async () => {
		const onchange = vi.fn();
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData,
			onchange
		});

		const buttons = container.querySelectorAll('.list-row');
		await fireEvent.click(buttons[1]);

		expect(onchange).toHaveBeenCalledWith('option2');
	});

	test('renders label badge when provided', () => {
		const dataWithLabel: ListPickerData<string>[] = [
			{
				value: 'premium',
				header: 'Premium Plan',
				description: 'Premium features',
				label: {
					text: 'Popular',
					className: 'badge-primary'
				}
			}
		];

		const { container } = render(ListPicker, {
			value: 'premium',
			data: dataWithLabel
		});

		expect(container.textContent).toContain('Popular');
		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('badge-primary');
	});

	test('uses activeClassName for selected item label', () => {
		const dataWithActiveLabel: ListPickerData<string>[] = [
			{
				value: 'option1',
				header: 'Option 1',
				description: 'First option',
				label: {
					text: 'New',
					className: 'badge-info',
					activeClassName: 'badge-success'
				}
			}
		];

		const { container } = render(ListPicker, {
			value: 'option1',
			data: dataWithActiveLabel
		});

		const badge = container.querySelector('.badge');
		expect(badge).toHaveClass('badge-success');
	});

	test('works with numeric values', () => {
		const numericData: ListPickerData<number>[] = [
			{
				value: 1,
				header: 'First',
				description: 'Number one'
			},
			{
				value: 2,
				header: 'Second',
				description: 'Number two'
			}
		];

		const onchange = vi.fn();
		const { container } = render(ListPicker, {
			value: 1,
			data: numericData,
			onchange
		});

		const buttons = container.querySelectorAll('.list-row');
		fireEvent.click(buttons[1]);

		expect(onchange).toHaveBeenCalledWith(2);
	});

	test('has proper list structure', () => {
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData
		});

		const list = container.querySelector('ul.list');
		expect(list).toBeInTheDocument();
		expect(list).toHaveClass('bg-base-100');
		expect(list).toHaveClass('rounded-box');
	});

	test('renders all items as buttons', () => {
		const { container } = render(ListPicker, {
			value: 'option1',
			data: mockData
		});

		const buttons = container.querySelectorAll('button.list-row');
		expect(buttons.length).toBe(mockData.length);
	});
});
