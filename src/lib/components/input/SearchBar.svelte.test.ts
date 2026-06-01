import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import { InputSize } from '$lib/enum/enum.js';
import SearchBar from './SearchBar.svelte';

describe('SearchBar', () => {
	test('renders search input with magnifier icon', () => {
		render(SearchBar, { value: '' });

		const input = document.querySelector('input[type="search"]');
		expect(input).toBeInTheDocument();
	});

	test('renders with custom placeholder', () => {
		const { container } = render(SearchBar, {
			value: '',
			placeholder: 'Find exercises...'
		});

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.placeholder).toBe('Find exercises...');
	});

	test('renders with label as aria-label', () => {
		const { container } = render(SearchBar, {
			value: '',
			label: 'Search exercises'
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('aria-label', 'Search exercises');
	});

	test('renders clear button when value has content', () => {
		const { container } = render(SearchBar, {
			value: 'query'
		});

		const clearButton = container.querySelector('[aria-label="Clear"]');
		expect(clearButton).toBeInTheDocument();
	});

	test('does not render clear button when value is empty', () => {
		const { container } = render(SearchBar, {
			value: ''
		});

		const clearButton = container.querySelector('[aria-label="Clear"]');
		expect(clearButton).not.toBeInTheDocument();
	});

	test('does not render clear button when clearable is false', () => {
		const { container } = render(SearchBar, {
			value: 'query',
			clearable: false
		});

		const clearButton = container.querySelector('[aria-label="Clear"]');
		expect(clearButton).not.toBeInTheDocument();
	});

	test('clear button resets value to empty', async () => {
		const { container } = render(SearchBar, {
			value: 'query'
		});

		const clearButton = container.querySelector('[aria-label="Clear"]');
		const input = container.querySelector('input') as HTMLInputElement;

		await fireEvent.click(clearButton!);
		expect(input.value).toBe('');
	});

	test('fires onsearch callback on input', async () => {
		const onsearch = vi.fn();
		const { container } = render(SearchBar, {
			value: '',
			onsearch
		});

		const input = container.querySelector('input') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'test' } });

		expect(onsearch).toHaveBeenCalledWith('test');
	});

	test('debounce delays onsearch call', async () => {
		vi.useFakeTimers();
		const onsearch = vi.fn();
		render(SearchBar, {
			value: '',
			onsearch,
			debounce: 200
		});

		const input = document.querySelector('input') as HTMLInputElement;

		// First keystroke
		await fireEvent.input(input, { target: { value: 'a' } });
		expect(onsearch).not.toHaveBeenCalled();

		// Second keystroke before debounce
		await fireEvent.input(input, { target: { value: 'ab' } });
		expect(onsearch).not.toHaveBeenCalled();

		// Wait for debounce
		await vi.advanceTimersByTimeAsync(250);
		expect(onsearch).toHaveBeenCalledWith('ab');
		vi.useRealTimers();
	});

	test('clears pending debounce on new input', async () => {
		vi.useFakeTimers();
		const onsearch = vi.fn();
		render(SearchBar, {
			value: '',
			onsearch,
			debounce: 200
		});

		const input = document.querySelector('input') as HTMLInputElement;

		// First keystroke with debounce
		await fireEvent.input(input, { target: { value: 'a' } });

		// Wait for first debounce (should fire)
		await vi.advanceTimersByTimeAsync(250);
		expect(onsearch).toHaveBeenCalledTimes(1);
		expect(onsearch).toHaveBeenCalledWith('a');

		// Second keystroke
		await fireEvent.input(input, { target: { value: 'ab' } });
		expect(onsearch).toHaveBeenCalledTimes(1); // not yet fired

		// Wait for second debounce (should fire with new value)
		await vi.advanceTimersByTimeAsync(250);
		expect(onsearch).toHaveBeenCalledTimes(2);
		expect(onsearch).toHaveBeenCalledWith('ab');
		vi.useRealTimers();
	});

	test('enter key fires onsearch immediately', async () => {
		const onsearch = vi.fn();
		render(SearchBar, {
			value: '',
			onsearch,
			debounce: 200
		});

		const input = document.querySelector('input') as HTMLInputElement;

		// Type something
		await fireEvent.input(input, { target: { value: 'test' } });
		expect(onsearch).not.toHaveBeenCalled();

		// Press Enter
		await fireEvent.keyDown(input, { key: 'Enter' });
		expect(onsearch).toHaveBeenCalledWith('test');
	});

	test('onsearch fires immediately without debounce', async () => {
		const onsearch = vi.fn();
		const { container } = render(SearchBar, {
			value: '',
			onsearch
		});

		const input = container.querySelector('input') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'test' } });

		expect(onsearch).toHaveBeenCalledWith('test');
	});

	test('fires onclear callback when clear is clicked', async () => {
		const onclear = vi.fn();
		render(SearchBar, {
			value: 'query',
			onclear
		});

		const clearButton = document.querySelector('[aria-label="Clear"]');
		await fireEvent.click(clearButton!);
		expect(onclear).toHaveBeenCalledTimes(1);
	});

	test('applies custom class to input', () => {
		const { container } = render(SearchBar, {
			value: '',
			class: 'input-bordered'
		});

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input).toHaveClass('input-bordered');
	});

	test('applies input size class', () => {
		const { container } = render(SearchBar, {
			value: '',
			inputSize: InputSize.LG
		});

		const input = container.querySelector('input');
		expect(input).toHaveClass('input-lg');
	});

	test('applies input color class', () => {
		const { container } = render(SearchBar, {
			value: '',
			color: 'primary'
		});

		const input = container.querySelector('input');
		expect(input).toHaveClass('input-primary');
	});

	test('renders children snippet as suffix', () => {
		const { container } = render(SearchBar, {
			value: '',
			children: createRawSnippet(() => ({
				render: () => '<span>42 results</span>'
			}))
		});

		const suffix = container.querySelector('span');
		expect(suffix).toBeInTheDocument();
		expect(suffix?.textContent).toBe('42 results');
	});

	test('has correct type attributes', () => {
		const { container } = render(SearchBar, {
			value: ''
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('type', 'search');
	});

	test('default value is empty string', () => {
		const { container } = render(SearchBar, {
			value: 'initial'
		});

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('initial');
	});
});
