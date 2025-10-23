import { render } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import CircularProgress from './CircularProgress.svelte';

describe('CircularProgress', () => {
	test('renders with default props', () => {
		const { container } = render(CircularProgress, {
			value: 50
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toBeInTheDocument();
	});

	test('sets correct value', () => {
		const { container } = render(CircularProgress, {
			value: 75
		});

		const progress = container.querySelector('.radial-progress') as HTMLElement;
		expect(progress?.style.getPropertyValue('--value')).toBe('75');
	});

	test('clamps value to 0-100 range', () => {
		const { container: container1 } = render(CircularProgress, {
			value: 150
		});

		const progress1 = container1.querySelector('.radial-progress') as HTMLElement;
		expect(progress1?.style.getPropertyValue('--value')).toBe('100');

		const { container: container2 } = render(CircularProgress, {
			value: -20
		});

		const progress2 = container2.querySelector('.radial-progress') as HTMLElement;
		expect(progress2?.style.getPropertyValue('--value')).toBe('0');
	});

	test('applies custom size', () => {
		const { container } = render(CircularProgress, {
			value: 50,
			size: '8rem'
		});

		const progress = container.querySelector('.radial-progress') as HTMLElement;
		expect(progress?.style.getPropertyValue('--size')).toBe('8rem');
	});

	test('applies custom thickness', () => {
		const { container } = render(CircularProgress, {
			value: 50,
			thickness: '1rem'
		});

		const progress = container.querySelector('.radial-progress') as HTMLElement;
		expect(progress?.style.getPropertyValue('--thickness')).toBe('1rem');
	});

	test('applies custom color class', () => {
		const { container } = render(CircularProgress, {
			value: 50,
			color: 'text-success'
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toHaveClass('text-success');
	});

	test('applies default color', () => {
		const { container } = render(CircularProgress, {
			value: 50
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toHaveClass('text-primary');
	});

	test('applies custom class', () => {
		const { container } = render(CircularProgress, {
			value: 50,
			class: 'custom-progress'
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toHaveClass('custom-progress');
	});

	test('has proper ARIA attributes', () => {
		const { container } = render(CircularProgress, {
			value: 60
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toHaveAttribute('role', 'progressbar');
		expect(progress).toHaveAttribute('aria-valuenow', '60');
		expect(progress).toHaveAttribute('aria-valuemin', '0');
		expect(progress).toHaveAttribute('aria-valuemax', '100');
	});

	test('renders children content', () => {
		const { container } = render(CircularProgress, {
			value: 75,
			children: () => '75%'
		});

		const progress = container.querySelector('.radial-progress');
		expect(progress).toBeInTheDocument();
	});

	test('uses default size when not specified', () => {
		const { container } = render(CircularProgress, {
			value: 50
		});

		const progress = container.querySelector('.radial-progress') as HTMLElement;
		expect(progress?.style.getPropertyValue('--size')).toBe('5rem');
	});

	test('uses default thickness when not specified', () => {
		const { container } = render(CircularProgress, {
			value: 50
		});

		const progress = container.querySelector('.radial-progress') as HTMLElement;
		expect(progress?.style.getPropertyValue('--thickness')).toBe('0.5rem');
	});
});
