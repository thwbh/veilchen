import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import Stepper from './Stepper.svelte';

describe('Stepper', () => {
	test('renders with default first step', () => {
		const { container } = render(Stepper, {
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toBeInTheDocument();
	});

	test('renders correct number of step badges', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const badges = container.querySelectorAll('.badge-step');
		expect(badges.length).toBe(3);
	});

	test('marks active step with activeClass', () => {
		const { container } = render(Stepper, {
			currentStep: 2,
			activeClass: 'badge-primary',
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const badges = container.querySelectorAll('.badge-step');
		expect(badges[1]).toHaveClass('badge-primary');
	});

	test('displays custom step label', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			stepLabel: 'Phase',
			step1: () => {},
			step2: () => {}
		});

		const badge = container.querySelector('.badge-step');
		expect(badge?.textContent).toContain('Phase 1');
	});

	test('displays back and next buttons', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			backLabel: 'Go Back',
			nextLabel: 'Continue',
			step1: () => {},
			step2: () => {}
		});

		expect(container.textContent).toContain('Go Back');
		expect(container.textContent).toContain('Continue');
	});

	test('shows finish button on last step', () => {
		const { container } = render(Stepper, {
			currentStep: 2,
			finishLabel: 'Complete',
			step1: () => {},
			step2: () => {}
		});

		expect(container.textContent).toContain('Complete');
	});

	test('calls onnext when next button is clicked', async () => {
		const onnext = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onnext,
			nextLabel: 'Next Step',
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const nextButton = Array.from(container.querySelectorAll('button')).find((btn) =>
			btn.textContent?.includes('Next Step')
		) as HTMLButtonElement;
		await fireEvent.click(nextButton);

		expect(onnext).toHaveBeenCalled();
	});

	test('calls onback when back button is clicked from step 2', async () => {
		const onback = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 2,
			onback,
			backLabel: 'Previous',
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
			btn.textContent?.includes('Previous')
		) as HTMLButtonElement;
		await fireEvent.click(backButton);

		expect(onback).toHaveBeenCalled();
	});

	test('calls onfinish when finish button is clicked', async () => {
		const onfinish = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 3,
			onfinish,
			finishLabel: 'Finish',
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const finishButton = Array.from(container.querySelectorAll('button')).find((btn) =>
			btn.textContent?.includes('Finish')
		) as HTMLButtonElement;
		await fireEvent.click(finishButton);

		expect(onfinish).toHaveBeenCalled();
	});

	test('does not go back from first step', async () => {
		const onback = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onback,
			backLabel: 'Previous',
			step1: () => {},
			step2: () => {}
		});

		const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
			btn.textContent?.includes('Previous')
		) as HTMLButtonElement;
		await fireEvent.click(backButton);

		expect(onback).not.toHaveBeenCalled();
	});

	test('has proper ARIA attributes', () => {
		const { container } = render(Stepper, {
			step1: () => {},
			step2: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toHaveAttribute('role', 'navigation');
		expect(navigation).toHaveAttribute('aria-label', 'Step wizard navigation');
	});

	test('is keyboard focusable', () => {
		const { container } = render(Stepper, {
			step1: () => {},
			step2: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toHaveAttribute('tabindex', '0');
	});

	test('handles arrow right key to go next', async () => {
		const onnext = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onnext,
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowRight' });

		expect(onnext).toHaveBeenCalled();
	});

	test('handles arrow left key to go back', async () => {
		const onback = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 2,
			onback,
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowLeft' });

		expect(onback).toHaveBeenCalled();
	});

	test('handles arrow down key to go next', async () => {
		const onnext = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onnext,
			step1: () => {},
			step2: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowDown' });

		expect(onnext).toHaveBeenCalled();
	});

	test('handles arrow up key to go back', async () => {
		const onback = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 2,
			onback,
			step1: () => {},
			step2: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowUp' });

		expect(onback).toHaveBeenCalled();
	});

	test('calls onfinish when pressing arrow right on last step', async () => {
		const onfinish = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 3,
			onfinish,
			step1: () => {},
			step2: () => {},
			step3: () => {}
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowRight' });

		expect(onfinish).toHaveBeenCalled();
	});
});
