import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import EmptyState from './EmptyState.svelte';

describe('EmptyState', () => {
	it('should render with title only', () => {
		const { getByText } = render(EmptyState, {
			props: {
				title: 'No Data'
			}
		});

		expect(getByText('No Data')).toBeTruthy();
	});

	it('should render with title and description', () => {
		const { getByText } = render(EmptyState, {
			props: {
				title: 'No Messages',
				description: 'You have no messages yet'
			}
		});

		expect(getByText('No Messages')).toBeTruthy();
		expect(getByText('You have no messages yet')).toBeTruthy();
	});

	it('should render with string icon', () => {
		const { getByText } = render(EmptyState, {
			props: {
				icon: '📭',
				title: 'No Mail'
			}
		});

		expect(getByText('📭')).toBeTruthy();
	});

	it('should render with custom icon snippet', () => {
		const { container } = render(EmptyState, {
			props: {
				icon: createRawSnippet(() => ({
					render: () => `<svg>Custom Icon</svg>`
				})),
				title: 'Custom'
			}
		});

		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('should render children content', () => {
		const { getByText } = render(EmptyState, {
			props: {
				title: 'Empty',
				children: createRawSnippet(() => ({
					render: () => `<button>Create</button>`
				}))
			}
		});

		expect(getByText('Create')).toBeTruthy();
	});

	it('should accept custom class', () => {
		const { container } = render(EmptyState, {
			props: {
				class: 'custom-empty',
				title: 'Test'
			}
		});

		expect(container.querySelector('.custom-empty')).toBeTruthy();
	});

	it('should have proper text alignment and centering', () => {
		const { container } = render(EmptyState, {
			props: {
				title: 'Centered',
				description: 'This should be centered'
			}
		});

		const div = container.querySelector('div');
		expect(div?.classList.contains('text-center')).toBe(true);
		expect(div?.classList.contains('items-center')).toBe(true);
		expect(div?.classList.contains('justify-center')).toBe(true);
	});
});
