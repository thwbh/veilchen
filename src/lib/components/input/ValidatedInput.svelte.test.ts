import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import ValidatedInput from './ValidatedInput.svelte';

describe('ValidatedInput', () => {
	test('renders with label', () => {
		render(ValidatedInput, {
			value: '',
			label: 'Email',
			children: () => 'Please enter email'
		});

		expect(screen.getByText('Email')).toBeInTheDocument();
	});

	test('renders validator-hint span for validation messages', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email',
			children: () => {}
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).toBeInTheDocument();
	});

	test('renders with email type', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email Address',
			type: 'email',
			children: () => 'Invalid email'
		});

		const input = container.querySelector('input[type="email"]');
		expect(input).toBeInTheDocument();
	});

	test('renders with required attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Username',
			required: true,
			children: () => 'Required field'
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('required');
	});

	test('renders with minlength attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Password',
			minlength: 8,
			children: () => 'Minimum 8 characters'
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('minlength', '8');
	});

	test('renders with pattern attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Phone',
			pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
			children: () => 'Format: XXX-XXX-XXXX'
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}');
	});

	test('renders with unit', () => {
		render(ValidatedInput, {
			value: '',
			label: 'Weight',
			unit: 'kg',
			children: () => 'Enter weight'
		});

		expect(screen.getByText('kg')).toBeInTheDocument();
	});

	test('applies custom class', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Custom Input',
			class: 'input-bordered',
			children: () => 'Help text'
		});

		const input = container.querySelector('input');
		expect(input).toHaveClass('input-bordered');
	});

	test('renders with placeholder', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email',
			placeholder: 'your@email.com',
			children: () => 'Enter email'
		});

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.placeholder).toBe('your@email.com');
	});

	test('updates value on input', async () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Name',
			children: () => 'Enter name'
		});

		const input = container.querySelector('input') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'John' } });

		expect(input.value).toBe('John');
	});

	test('renders with number type', () => {
		const { container } = render(ValidatedInput, {
			value: 0,
			label: 'Age',
			type: 'number',
			min: 0,
			max: 120,
			children: () => 'Enter age'
		});

		const input = container.querySelector('input[type="number"]');
		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute('min', '0');
		expect(input).toHaveAttribute('max', '120');
	});

	test('applies inline-error class when errorInline is true', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Username',
			errorInline: true,
			children: () => 'Username is required'
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).toHaveClass('inline-error');
	});

	test('does not apply inline-error class when errorInline is false', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Username',
			errorInline: false,
			children: () => 'Username is required'
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).not.toHaveClass('inline-error');
	});
});
