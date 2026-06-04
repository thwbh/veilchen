import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import Stepper from './Stepper.svelte';

describe('Stepper', () => {
	test('renders with default first step', () => {
		const { container } = render(Stepper, {
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toBeInTheDocument();
	});

	test('renders correct number of step badges', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
		});

		const badges = container.querySelectorAll('.badge-step');
		expect(badges.length).toBe(3);
	});

	test('marks active step with activeClass', () => {
		const { container } = render(Stepper, {
			currentStep: 2,
			activeClass: 'badge-primary',
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
		});

		const badges = container.querySelectorAll('.badge-step');
		expect(badges[1]).toHaveClass('badge-primary');
	});

	test('displays custom step label', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			stepLabel: 'Phase',
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		const badge = container.querySelector('.badge-step');
		expect(badge?.textContent).toContain('Phase 1');
	});

	test('displays back and next buttons', () => {
		const { container } = render(Stepper, {
			currentStep: 1,
			backLabel: 'Go Back',
			nextLabel: 'Continue',
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		expect(container.textContent).toContain('Go Back');
		expect(container.textContent).toContain('Continue');
	});

	test('shows finish button on last step', () => {
		const { container } = render(Stepper, {
			currentStep: 2,
			finishLabel: 'Complete',
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		expect(container.textContent).toContain('Complete');
	});

	test('calls onnext when next button is clicked', async () => {
		const onnext = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onnext,
			nextLabel: 'Next Step',
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
			btn.textContent?.includes('Previous')
		) as HTMLButtonElement;
		await fireEvent.click(backButton);

		expect(onback).not.toHaveBeenCalled();
	});

	test('has proper ARIA attributes', () => {
		const { container } = render(Stepper, {
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toHaveAttribute('role', 'navigation');
		expect(navigation).toHaveAttribute('aria-label', 'Step wizard navigation');
	});

	test('is keyboard focusable', () => {
		const { container } = render(Stepper, {
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
		});

		const navigation = container.querySelector('[role="navigation"]');
		expect(navigation).toHaveAttribute('tabindex', '0');
	});

	test('handles arrow right key to go next', async () => {
		const onnext = vi.fn();
		const { container } = render(Stepper, {
			currentStep: 1,
			onnext,
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			}))
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
			step1: createRawSnippet(() => ({
				render: () => `<div>Step 1</div>`
			})),
			step2: createRawSnippet(() => ({
				render: () => `<div>Step 2</div>`
			})),
			step3: createRawSnippet(() => ({
				render: () => `<div>Step 3</div>`
			}))
		});

		const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
		await fireEvent.keyDown(navigation, { key: 'ArrowRight' });

		expect(onfinish).toHaveBeenCalled();
	});

	describe('Stepper hooks', () => {
		// onbeforenext tests
		test('onbeforenext returning false blocks forward navigation', async () => {
			const onbeforenext = vi.fn().mockReturnValue(false);
			const onnext = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 1,
				onbeforenext,
				onnext,
				nextLabel: 'Next',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const nextButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Next')
			) as HTMLButtonElement;
			await fireEvent.click(nextButton);

			expect(onbeforenext).toHaveBeenCalledWith(1, 2);
			expect(onnext).not.toHaveBeenCalled();
		});

		test('onbeforenext returning true allows forward navigation', async () => {
			const onbeforenext = vi.fn().mockReturnValue(true);
			const onnext = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 1,
				onbeforenext,
				onnext,
				nextLabel: 'Next',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const nextButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Next')
			) as HTMLButtonElement;
			await fireEvent.click(nextButton);

			expect(onbeforenext).toHaveBeenCalledWith(1, 2);
			expect(onnext).toHaveBeenCalled();
		});

		test('onbeforenext with async false blocks navigation', async () => {
			const onbeforenext = vi.fn().mockResolvedValue(false);
			const onnext = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 1,
				onbeforenext,
				onnext,
				nextLabel: 'Next',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const nextButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Next')
			) as HTMLButtonElement;
			await fireEvent.click(nextButton);

			expect(onbeforenext).toHaveBeenCalled();
			expect(onnext).not.toHaveBeenCalled();
		});

		// onbeforeback tests
		test('onbeforeback returning false blocks backward navigation', async () => {
			const onbeforeback = vi.fn().mockReturnValue(false);
			const onback = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 2,
				onbeforeback,
				onback,
				backLabel: 'Previous',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Previous')
			) as HTMLButtonElement;
			await fireEvent.click(backButton);

			expect(onbeforeback).toHaveBeenCalledWith(2, 1);
			expect(onback).not.toHaveBeenCalled();
		});

		test('onbeforeback returning true allows backward navigation', async () => {
			const onbeforeback = vi.fn().mockReturnValue(true);
			const onback = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 2,
				onbeforeback,
				onback,
				backLabel: 'Previous',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Previous')
			) as HTMLButtonElement;
			await fireEvent.click(backButton);

			expect(onbeforeback).toHaveBeenCalledWith(2, 1);
			expect(onback).toHaveBeenCalled();
		});

		test('onbeforeback with async false blocks navigation', async () => {
			const onbeforeback = vi.fn().mockResolvedValue(false);
			const onback = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 2,
				onbeforeback,
				onback,
				backLabel: 'Previous',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const backButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Previous')
			) as HTMLButtonElement;
			await fireEvent.click(backButton);

			expect(onbeforeback).toHaveBeenCalled();
			expect(onback).not.toHaveBeenCalled();
		});

		// onbeforefinish tests
		test('onbeforefinish returning false blocks finish', async () => {
			const onbeforefinish = vi.fn().mockReturnValue(false);
			const onfinish = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 3,
				onbeforefinish,
				onfinish,
				finishLabel: 'Finish',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const finishButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Finish')
			) as HTMLButtonElement;
			await fireEvent.click(finishButton);

			expect(onbeforefinish).toHaveBeenCalled();
			expect(onfinish).not.toHaveBeenCalled();
		});

		test('onbeforefinish returning true allows finish', async () => {
			const onbeforefinish = vi.fn().mockReturnValue(true);
			const onfinish = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 3,
				onbeforefinish,
				onfinish,
				finishLabel: 'Finish',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const finishButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Finish')
			) as HTMLButtonElement;
			await fireEvent.click(finishButton);

			expect(onbeforefinish).toHaveBeenCalled();
			expect(onfinish).toHaveBeenCalled();
		});

		test('onbeforefinish with async false blocks finish', async () => {
			const onbeforefinish = vi.fn().mockResolvedValue(false);
			const onfinish = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 3,
				onbeforefinish,
				onfinish,
				finishLabel: 'Finish',
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const finishButton = Array.from(container.querySelectorAll('button')).find((btn) =>
				btn.textContent?.includes('Finish')
			) as HTMLButtonElement;
			await fireEvent.click(finishButton);

			expect(onbeforefinish).toHaveBeenCalled();
			expect(onfinish).not.toHaveBeenCalled();
		});

		// Keyboard hook tests
		test('onbeforenext blocks arrow right navigation', async () => {
			const onbeforenext = vi.fn().mockReturnValue(false);
			const onnext = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 1,
				onbeforenext,
				onnext,
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
			await fireEvent.keyDown(navigation, { key: 'ArrowRight' });

			expect(onbeforenext).toHaveBeenCalled();
			expect(onnext).not.toHaveBeenCalled();
		});

		test('onbeforeback blocks arrow left navigation', async () => {
			const onbeforeback = vi.fn().mockReturnValue(false);
			const onback = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 2,
				onbeforeback,
				onback,
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
			await fireEvent.keyDown(navigation, { key: 'ArrowLeft' });

			expect(onbeforeback).toHaveBeenCalled();
			expect(onback).not.toHaveBeenCalled();
		});

		test('onbeforefinish blocks arrow down on last step', async () => {
			const onbeforefinish = vi.fn().mockReturnValue(false);
			const onfinish = vi.fn();
			const { container } = render(Stepper, {
				currentStep: 3,
				onbeforefinish,
				onfinish,
				step1: createRawSnippet(() => ({
					render: () => `<div>Step 1</div>`
				})),
				step2: createRawSnippet(() => ({
					render: () => `<div>Step 2</div>`
				})),
				step3: createRawSnippet(() => ({
					render: () => `<div>Step 3</div>`
				}))
			});

			const navigation = container.querySelector('[role="navigation"]') as HTMLElement;
			await fireEvent.keyDown(navigation, { key: 'ArrowDown' });

			expect(onbeforefinish).toHaveBeenCalled();
			expect(onfinish).not.toHaveBeenCalled();
		});
	});
});
