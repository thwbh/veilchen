import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import ButtonGroup from './ButtonGroup.svelte';
import type { KeyValuePair } from '$lib/types/types.js';

describe('ButtonGroup', () => {
	const entries: KeyValuePair<string, string>[] = [
		{ key: 'a', value: 'Option A' },
		{ key: 'b', value: 'Option B' },
		{ key: 'c', value: 'Option C' }
	];

	test('renders all entries as buttons', () => {
		render(ButtonGroup, { value: 'a', entries });

		expect(screen.getByText('Option A')).toBeInTheDocument();
		expect(screen.getByText('Option B')).toBeInTheDocument();
		expect(screen.getByText('Option C')).toBeInTheDocument();
	});

	test('renders optional label when provided', () => {
		render(ButtonGroup, { value: 'a', entries, label: 'Choose one' });

		expect(screen.getByText('Choose one')).toBeInTheDocument();
	});

	test('does not render label when not provided', () => {
		const { container } = render(ButtonGroup, { value: 'a', entries });

		const labelElement = container.querySelector('#button-group-label');
		expect(labelElement).not.toBeInTheDocument();
	});

	test('marks selected button with btn-neutral class', () => {
		render(ButtonGroup, { value: 'b', entries });

		const selectedButton = screen.getByText('Option B');
		expect(selectedButton).toHaveClass('btn-neutral');
	});

	test('marks selected button with aria-pressed="true"', () => {
		render(ButtonGroup, { value: 'b', entries });

		const selectedButton = screen.getByText('Option B');
		expect(selectedButton).toHaveAttribute('aria-pressed', 'true');

		const unselectedButton = screen.getByText('Option A');
		expect(unselectedButton).toHaveAttribute('aria-pressed', 'false');
	});

	test('calls onchange callback when button is clicked', async () => {
		let changedValue: string | number | null = null;

		const onchange = vi.fn((value: string | number) => {
			changedValue = value;
		});

		render(ButtonGroup, { value: 'a', entries, onchange });

		const buttonB = screen.getByText('Option B');
		await fireEvent.click(buttonB);

		expect(onchange).toHaveBeenCalledWith('b');
		expect(changedValue).toBe('b');
	});

	test('works with number keys', () => {
		const numericEntries: KeyValuePair<number, string>[] = [
			{ key: 1, value: '⭐' },
			{ key: 2, value: '⭐⭐' },
			{ key: 3, value: '⭐⭐⭐' }
		];

		render(ButtonGroup, { value: 2, entries: numericEntries });

		const selectedButton = screen.getByText('⭐⭐');
		expect(selectedButton).toHaveClass('btn-neutral');
		expect(selectedButton).toHaveAttribute('aria-pressed', 'true');
	});

	test('has role="group" with aria-labelledby when label is provided', () => {
		const { container } = render(ButtonGroup, { value: 'a', entries, label: 'Test Label' });

		const group = container.querySelector('[role="group"]');
		expect(group).toBeInTheDocument();
		expect(group).toHaveAttribute('aria-labelledby', 'button-group-label');
	});

	test('has role="group" without aria-labelledby when label is not provided', () => {
		const { container } = render(ButtonGroup, { value: 'a', entries });

		const group = container.querySelector('[role="group"]');
		expect(group).toBeInTheDocument();
		expect(group).not.toHaveAttribute('aria-labelledby');
	});
});
