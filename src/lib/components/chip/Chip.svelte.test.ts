import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import Chip from './Chip.svelte';

describe('Chip', () => {
	it('should render with text content', () => {
		const { getByText } = render(Chip, {
			props: {
				children: createRawSnippet(() => ({
					render: () => `<span>Test Chip</span>`
				}))
			}
		});

		expect(getByText('Test Chip')).toBeTruthy();
	});

	it('should have default primary color', () => {
		const { container } = render(Chip, {
			props: {
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		expect(container.querySelector('.badge-primary')).toBeTruthy();
	});

	it('should accept different color variants', () => {
		const { container } = render(Chip, {
			props: {
				color: 'secondary',
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		expect(container.querySelector('.badge-secondary')).toBeTruthy();
	});

	it('should not show remove button when not removable', () => {
		const { container } = render(Chip, {
			props: {
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		expect(container.querySelector('button')).toBeFalsy();
	});

	it('should show remove button when removable', () => {
		const { container } = render(Chip, {
			props: {
				removable: true,
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		expect(container.querySelector('button')).toBeTruthy();
	});

	it('should call onremove callback when remove button is clicked', async () => {
		const removeSpy = vi.fn();
		const { container } = render(Chip, {
			props: {
				removable: true,
				onremove: removeSpy,
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		const removeButton = container.querySelector('button') as HTMLElement;
		await fireEvent.click(removeButton);

		expect(removeSpy).toHaveBeenCalled();
	});

	it('should accept custom class', () => {
		const { container } = render(Chip, {
			props: {
				class: 'custom-chip',
				children: createRawSnippet(() => ({
					render: () => `<span>Chip</span>`
				}))
			}
		});

		expect(container.querySelector('.custom-chip')).toBeTruthy();
	});
});
