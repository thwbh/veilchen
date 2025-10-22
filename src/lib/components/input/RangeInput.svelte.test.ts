import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import RangeInput from './RangeInput.svelte';

describe('RangeInput', () => {
	test('renders with label', () => {
		render(RangeInput, { value: 50, label: 'Volume', min: 0, max: 100 });

		expect(screen.getByText('Volume')).toBeInTheDocument();
	});

	test('displays current value', () => {
		const { container } = render(RangeInput, { value: 75, min: 0, max: 100 });

		const textInput = container.querySelector('input[type="text"]') as HTMLInputElement;
		expect(textInput).toBeInTheDocument();
		expect(textInput.value).toBe('75');
	});

	test('displays unit when provided', () => {
		render(RangeInput, { value: 50, min: 0, max: 100, unit: '%' });

		expect(screen.getByText('%')).toBeInTheDocument();
	});

	test('renders range slider with correct attributes', () => {
		const { container } = render(RangeInput, { value: 50, min: 0, max: 100, step: 10 });

		const rangeInput = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(rangeInput).toBeInTheDocument();
		expect(rangeInput.min).toBe('0');
		expect(rangeInput.max).toBe('100');
		expect(rangeInput.step).toBe('10');
	});

	test('renders step indicators when step is provided', () => {
		const { container } = render(RangeInput, { value: 0, min: 0, max: 100, step: 25 });

		// Should have 5 steps: 0, 25, 50, 75, 100
		const stepIndicators = container.querySelectorAll('.text-step > span');
		expect(stepIndicators.length).toBe(5);
	});

	test('does not render step indicators when step is not provided', () => {
		const { container } = render(RangeInput, { value: 50, min: 0, max: 100 });

		const stepIndicators = container.querySelectorAll('.text-step > span');
		expect(stepIndicators.length).toBe(0);
	});

	test('calls onchange callback when slider value changes', async () => {
		const onchange = vi.fn();
		const { container } = render(RangeInput, { value: 50, min: 0, max: 100, onchange });

		const rangeInput = container.querySelector('input[type="range"]') as HTMLInputElement;
		await fireEvent.change(rangeInput, { target: { value: '75' } });

		expect(onchange).toHaveBeenCalled();
	});

	test('applies custom class to range input', () => {
		const { container } = render(RangeInput, {
			value: 50,
			min: 0,
			max: 100,
			class: 'range-primary'
		});

		const rangeInput = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(rangeInput).toHaveClass('range-primary');
	});

	test('bounds check sets value to max when exceeded', async () => {
		const { container } = render(RangeInput, { value: 50, min: 0, max: 100 });

		const textInput = container.querySelector('input[type="text"]') as HTMLInputElement;
		textInput.value = '150';
		await fireEvent.input(textInput);
		await fireEvent.focusOut(textInput);

		expect(textInput.value).toBe('100');
	});

	test('bounds check sets value to min when below minimum', async () => {
		const { container } = render(RangeInput, { value: 50, min: 0, max: 100 });

		const textInput = container.querySelector('input[type="text"]') as HTMLInputElement;
		textInput.value = '-10';
		await fireEvent.input(textInput);
		await fireEvent.focusOut(textInput);

		expect(textInput.value).toBe('0');
	});

	test('snaps to step when value is not aligned', async () => {
		const { container } = render(RangeInput, { value: 0, min: 0, max: 100, step: 25 });

		const textInput = container.querySelector('input[type="text"]') as HTMLInputElement;
		textInput.value = '37'; // Not aligned with step=25
		await fireEvent.input(textInput);
		await fireEvent.focusOut(textInput);

		// Should snap to min (0) since 37 is not a multiple of 25
		expect(textInput.value).toBe('0');
	});

	test('works with decimal steps', () => {
		const { container } = render(RangeInput, { value: 20.5, min: 15, max: 30, step: 0.5 });

		const rangeInput = container.querySelector('input[type="range"]') as HTMLInputElement;
		expect(rangeInput.value).toBe('20.5');
		expect(rangeInput.step).toBe('0.5');
	});
});
