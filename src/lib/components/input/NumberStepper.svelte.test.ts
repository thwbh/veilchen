import { render, fireEvent } from '@testing-library/svelte';
import NumberStepper from './NumberStepper.svelte';
import { describe, it, expect, vi } from 'vitest';

describe('NumberStepper', () => {
	it('renders with label and input', () => {
		const { getByLabelText, getByRole } = render(NumberStepper, {
			label: 'Weight',
			value: 50,
			name: 'weight'
		});

		expect(getByLabelText('Weight')).toBeInTheDocument();
		expect(getByRole('spinbutton')).toHaveValue(50);
	});

	it('increments value when increment button is clicked', async () => {
		const { container, getByLabelText } = render(NumberStepper, {
			label: 'Count',
			value: 10
		});

		const incrementButton = getByLabelText('Increment by 1');
		await fireEvent.click(incrementButton);

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('11');
	});

	it('decrements value when decrement button is clicked', async () => {
		const { container, getByLabelText } = render(NumberStepper, {
			label: 'Count',
			value: 10
		});

		const decrementButton = getByLabelText('Decrement by 1');
		await fireEvent.click(decrementButton);

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('9');
	});

	it('respects min constraint when decrementing', async () => {
		const { container, getByLabelText } = render(NumberStepper, {
			label: 'Count',
			value: 5,
			min: 0
		});

		const decrementButton = getByLabelText('Decrement by 1');
		// Click multiple times to test min constraint
		for (let i = 0; i < 10; i++) {
			await fireEvent.click(decrementButton);
		}

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('0'); // Should not go below min
	});

	it('respects max constraint when incrementing', async () => {
		const { container, getByLabelText } = render(NumberStepper, {
			label: 'Count',
			value: 95,
			max: 100
		});

		const incrementButton = getByLabelText('Increment by 1');
		// Click multiple times to test max constraint
		for (let i = 0; i < 10; i++) {
			await fireEvent.click(incrementButton);
		}

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.value).toBe('100'); // Should not go above max
	});

	it('clamps typed value to min on blur', async () => {
		const { container, getByRole } = render(NumberStepper, {
			label: 'Amount',
			value: 50,
			min: 30,
			max: 100
		});

		const input = getByRole('spinbutton');

		// Type a value below min
		await fireEvent.input(input, { target: { value: '25' } });
		expect(input).toHaveValue(25); // Should allow typing below min

		// Blur the input - this should clamp to min
		await fireEvent.blur(input);
		expect(input).toHaveValue(30); // Should be clamped to min
	});

	it('clamps typed value to max on blur', async () => {
		const { container, getByRole } = render(NumberStepper, {
			label: 'Amount',
			value: 50,
			min: 30,
			max: 100
		});

		const input = getByRole('spinbutton');

		// Type a value above max
		await fireEvent.input(input, { target: { value: '150' } });
		expect(input).toHaveValue(150); // Should allow typing above max

		// Blur the input - this should clamp to max
		await fireEvent.blur(input);
		expect(input).toHaveValue(100); // Should be clamped to max
	});

	it('allows multi-digit entry without premature clamping', async () => {
		const { container, getByRole } = render(NumberStepper, {
			label: 'Amount',
			value: 50,
			min: 30,
			max: 100
		});

		const input = getByRole('spinbutton');

		// Type digits one by one to test multi-digit entry
		await fireEvent.input(input, { target: { value: '2' } });
		expect(input).toHaveValue(2); // Should not clamp prematurely

		await fireEvent.input(input, { target: { value: '25' } });
		expect(input).toHaveValue(25); // Should not clamp prematurely

		await fireEvent.input(input, { target: { value: '250' } });
		expect(input).toHaveValue(250); // Should not clamp prematurely

		// Only clamp on blur
		await fireEvent.blur(input);
		expect(input).toHaveValue(100); // Should be clamped to max on blur
	});

	it('button increment/decrement still respect min/max', async () => {
		const { container, getByLabelText, getByRole } = render(NumberStepper, {
			label: 'Amount',
			value: 30,
			min: 30,
			max: 100
		});

		const input = getByRole('spinbutton');
		const decrementButton = getByLabelText('Decrement by 1');
		const incrementButton = getByLabelText('Increment by 1');

		// Decrement should respect min
		await fireEvent.click(decrementButton);
		expect(input).toHaveValue(30); // Should not go below min

		// Increment should respect max
		await fireEvent.input(input, { target: { value: '100' } });
		await fireEvent.click(incrementButton);
		expect(input).toHaveValue(100); // Should not go above max
	});

	it('updates value when input changes', async () => {
		const { getByRole } = render(NumberStepper, {
			label: 'Amount',
			value: 25
		});

		const input = getByRole('spinbutton');
		await fireEvent.input(input, { target: { value: '42' } });

		expect(input).toHaveValue(42);
	});

	it('wheel items should not be clickable in dead space above/below input', async () => {
		const onChangeSpy = vi.fn();
		const { container } = render(NumberStepper, {
			label: 'Weight',
			value: 50,
			incrementSteps: [0.5, 1, 2, 5],
			unit: 'kg'
		});

		// Find the wheel container
		const wheelContainer = container.querySelector('.inline-number-wheel-container');
		expect(wheelContainer).toBeInTheDocument();

		// Find wheel items
		const wheelItems = container.querySelectorAll('.wheel-item');
		expect(wheelItems.length).toBeGreaterThan(0);

		// Simulate clicking on a wheel item (this should work)
		if (wheelItems.length > 0) {
			const initialValue = (container.querySelector('input') as HTMLInputElement).value;
			await fireEvent.click(wheelItems[0]);

			// The wheel item click should change the step size, not the main value
			const input = container.querySelector('input') as HTMLInputElement;
			expect(input.value).toBe(initialValue); // Main value should not change from wheel item click
		}
	});

	it('only stepper buttons should change the main value', async () => {
		const { container, getByLabelText } = render(NumberStepper, {
			label: 'Count',
			value: 10,
			incrementSteps: [1, 5, 10]
		});

		const input = container.querySelector('input') as HTMLInputElement;
		const initialValue = input.value;

		// Click increment button - this should change the main value
		const incrementButton = getByLabelText('Increment by 1');
		await fireEvent.click(incrementButton);
		expect(input.value).not.toBe(initialValue);

		// Reset to initial value
		input.value = initialValue;

		// Click on wheel items - this should NOT change the main value
		const wheelItems = container.querySelectorAll('.wheel-item');
		if (wheelItems.length > 0) {
			await fireEvent.click(wheelItems[0]);
			expect(input.value).toBe(initialValue); // Main value should remain unchanged
		}
	});
});
