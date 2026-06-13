import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import { createRawSnippet } from 'svelte';
import Accordion from './Accordion.svelte';
import AccordionItem from './AccordionItem.svelte';

describe('Accordion', () => {
	it('should render correctly', () => {
		const { container } = render(Accordion, {
			props: {
				children: createRawSnippet(() => ({
					render: () => `<span>Accordion Content</span>`
				}))
			}
		});

		expect(container).toBeTruthy();
		expect(container.querySelector('.join-vertical')).toBeTruthy();
	});

	it('should accept custom class', () => {
		const { container } = render(Accordion, {
			props: {
				class: 'custom-class',
				children: createRawSnippet(() => ({
					render: () => `<span>Content</span>`
				}))
			}
		});

		expect(container.querySelector('.custom-class')).toBeTruthy();
	});
});

describe('AccordionItem', () => {
	it('should render with title and content', () => {
		const { getByText, container } = render(AccordionItem, {
			props: {
				title: 'Test Title',
				children: createRawSnippet(() => ({
					render: () => `<span>Test Content</span>`
				}))
			}
		});

		expect(getByText('Test Title')).toBeTruthy();
		expect(getByText('Test Content')).toBeTruthy();
		expect(container.querySelector('.collapse')).toBeTruthy();
	});

	it('should be collapsed by default', () => {
		const { container } = render(AccordionItem, {
			props: {
				title: 'Test',
				children: createRawSnippet(() => ({
					render: () => `<span>Content</span>`
				}))
			}
		});

		const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
		expect(input.checked).toBe(false);
	});

	it('should be expanded when open prop is true', () => {
		const { container } = render(AccordionItem, {
			props: {
				title: 'Test',
				open: true,
				children: createRawSnippet(() => ({
					render: () => `<span>Content</span>`
				}))
			}
		});

		const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
		expect(input.checked).toBe(true);
	});

	it('should toggle when clicked', async () => {
		const { container } = render(AccordionItem, {
			props: {
				title: 'Test',
				children: createRawSnippet(() => ({
					render: () => `<span>Content</span>`
				}))
			}
		});

		const button = container.querySelector('button') as HTMLElement;
		const input = container.querySelector('input[type="checkbox"]') as HTMLInputElement;

		expect(input.checked).toBe(false);

		button.click();

		// Wait for the next tick to allow Svelte to update
		await new Promise((resolve) => setTimeout(resolve, 10));

		// Check if the state changed
		const updatedInput = container.querySelector('input[type="checkbox"]') as HTMLInputElement;
		expect(updatedInput.checked).toBe(true);
	});
});
