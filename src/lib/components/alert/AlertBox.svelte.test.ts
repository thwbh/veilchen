import { render, screen } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import AlertBox from './AlertBox.svelte';
import { AlertType } from '$lib/enum/enum.js';

describe('AlertBox', () => {
	test('renders with default info type', () => {
		const { container } = render(AlertBox, {
			children: () => 'Test alert message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toBeInTheDocument();
		expect(alert).toHaveClass('alert-info');
	});

	test('renders with success type', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Success,
			children: () => 'Success message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toHaveClass('alert-success');
	});

	test('renders with warning type', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Warning,
			children: () => 'Warning message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toHaveClass('alert-warning');
	});

	test('renders with error type', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Error,
			children: () => 'Error message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toHaveClass('alert-error');
	});

	test('renders children content', () => {
		const { container } = render(AlertBox, {
			children: () => 'Test alert message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toBeInTheDocument();
	});

	test('renders default info icon', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Info,
			children: () => 'Info message'
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('renders default error icon', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Error,
			children: () => 'Error message'
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('renders default warning icon', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Warning,
			children: () => 'Warning message'
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('renders default success icon', () => {
		const { container } = render(AlertBox, {
			type: AlertType.Success,
			children: () => 'Success message'
		});

		const svg = container.querySelector('svg');
		expect(svg).toBeInTheDocument();
	});

	test('applies custom class', () => {
		const { container } = render(AlertBox, {
			class: 'alert-soft custom-class',
			children: () => 'Custom styled alert'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toHaveClass('alert-soft');
		expect(alert).toHaveClass('custom-class');
	});

	test('has role="alert" for accessibility', () => {
		const { container } = render(AlertBox, {
			children: () => 'Alert message'
		});

		const alert = container.querySelector('[role="alert"]');
		expect(alert).toBeInTheDocument();
	});

});
