import { render, screen, fireEvent } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import { createRawSnippet } from 'svelte';
import ValidatedInput from './ValidatedInput.svelte';

describe('ValidatedInput', () => {
	test('renders with label', () => {
		render(ValidatedInput, {
			value: '',
			label: 'Email',
			children: createRawSnippet(() => ({
				render: () => `<span>Please enter email</span>`
			}))
		});

		expect(screen.getByText('Email')).toBeInTheDocument();
	});

	test('renders validator-hint span for validation messages', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email',
			children: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).toBeInTheDocument();
	});

	test('renders with email type', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email Address',
			type: 'email',
			children: createRawSnippet(() => ({
				render: () => `<span>Invalid email</span>`
			}))
		});

		const input = container.querySelector('input[type="email"]');
		expect(input).toBeInTheDocument();
	});

	test('renders with required attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Username',
			required: true,
			children: createRawSnippet(() => ({
				render: () => `<span>Required field</span>`
			}))
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('required');
	});

	test('renders with minlength attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Password',
			minlength: 8,
			children: createRawSnippet(() => ({
				render: () => `<span>Minimum 8 characters</span>`
			}))
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('minlength', '8');
	});

	test('renders with pattern attribute', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Phone',
			pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
			children: createRawSnippet(() => ({
				render: () => `<span>Format: XXX-XXX-XXXX</span>`
			}))
		});

		const input = container.querySelector('input');
		expect(input).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}');
	});

	test('renders with unit', () => {
		render(ValidatedInput, {
			value: '',
			label: 'Weight',
			unit: 'kg',
			children: createRawSnippet(() => ({
				render: () => `<span>Enter weight</span>`
			}))
		});

		expect(screen.getByText('kg')).toBeInTheDocument();
	});

	test('applies custom class', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Custom Input',
			class: 'input-bordered',
			children: createRawSnippet(() => ({
				render: () => `<span>Help text</span>`
			}))
		});

		const input = container.querySelector('input');
		expect(input).toHaveClass('input-bordered');
	});

	test('renders with placeholder', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Email',
			placeholder: 'your@email.com',
			children: createRawSnippet(() => ({
				render: () => `<span>Enter email</span>`
			}))
		});

		const input = container.querySelector('input') as HTMLInputElement;
		expect(input.placeholder).toBe('your@email.com');
	});

	test('updates value on input', async () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Name',
			children: createRawSnippet(() => ({
				render: () => `<span>Enter name</span>`
			}))
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
			children: createRawSnippet(() => ({
				render: () => `<span>Enter age</span>`
			}))
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
			children: createRawSnippet(() => ({
				render: () => `<span>Username is required</span>`
			}))
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).toHaveClass('inline-error');
	});

	test('does not apply inline-error class when errorInline is false', () => {
		const { container } = render(ValidatedInput, {
			value: '',
			label: 'Username',
			errorInline: false,
			children: createRawSnippet(() => ({
				render: () => `<span>Username is required</span>`
			}))
		});

		const validatorHint = container.querySelector('.validator-hint');
		expect(validatorHint).not.toHaveClass('inline-error');
	});
});
