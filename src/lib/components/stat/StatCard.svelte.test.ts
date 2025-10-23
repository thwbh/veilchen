import { render } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import { createRawSnippet } from 'svelte';
import StatCard from './StatCard.svelte';

describe('StatCard', () => {
	test('renders with title', () => {
		const { container } = render(StatCard, {
			title: 'Total Users'
		});

		expect(container.textContent).toContain('Total Users');
		const title = container.querySelector('.stat-title');
		expect(title).toBeInTheDocument();
	});

	test('renders with value', () => {
		const { container } = render(StatCard, {
			value: '12,459'
		});

		expect(container.textContent).toContain('12,459');
		const value = container.querySelector('.stat-value');
		expect(value).toBeInTheDocument();
	});

	test('renders with numeric value', () => {
		const { container } = render(StatCard, {
			value: 1234
		});

		expect(container.textContent).toContain('1234');
	});

	test('renders with description', () => {
		const { container } = render(StatCard, {
			description: '↗︎ 400 (22%)'
		});

		expect(container.textContent).toContain('↗︎ 400 (22%)');
		const desc = container.querySelector('.stat-desc');
		expect(desc).toBeInTheDocument();
	});

	test('applies custom class to container', () => {
		const { container } = render(StatCard, {
			class: 'custom-stat'
		});

		const stat = container.querySelector('.stat');
		expect(stat).toHaveClass('custom-stat');
	});

	test('applies custom class to title', () => {
		const { container } = render(StatCard, {
			title: 'Test',
			titleClass: 'text-primary'
		});

		const title = container.querySelector('.stat-title');
		expect(title).toHaveClass('text-primary');
	});

	test('applies custom class to value', () => {
		const { container } = render(StatCard, {
			value: '100',
			valueClass: 'text-4xl'
		});

		const value = container.querySelector('.stat-value');
		expect(value).toHaveClass('text-4xl');
	});

	test('applies custom class to description', () => {
		const { container } = render(StatCard, {
			description: 'Test',
			descClass: 'text-success'
		});

		const desc = container.querySelector('.stat-desc');
		expect(desc).toHaveClass('text-success');
	});

	test('renders figure snippet', () => {
		const { container } = render(StatCard, {
			figure: createRawSnippet(() => ({
				render: () => `<span>📊</span>`
			}))
		});

		const figure = container.querySelector('.stat-figure');
		expect(figure).toBeInTheDocument();
	});

	test('renders actions snippet', () => {
		const { container } = render(StatCard, {
			actions: createRawSnippet(() => ({
				render: () => `<div></div>`
			}))
		});

		const actions = container.querySelector('.stat-actions');
		expect(actions).toBeInTheDocument();
	});

	test('renders complete stat card', () => {
		const { container } = render(StatCard, {
			title: 'Revenue',
			value: '$89,400',
			description: 'Jan 1st - Feb 1st',
			figure: createRawSnippet(() => ({
				render: () => `<span>💰</span>`
			}))
		});

		expect(container.textContent).toContain('Revenue');
		expect(container.textContent).toContain('$89,400');
		expect(container.textContent).toContain('Jan 1st - Feb 1st');

		const stat = container.querySelector('.stat');
		expect(stat).toBeInTheDocument();
	});

	test('has stat DaisyUI class', () => {
		const { container } = render(StatCard, {
			title: 'Test'
		});

		const stat = container.querySelector('.stat');
		expect(stat).toHaveClass('stat');
	});

	test('renders without optional props', () => {
		const { container } = render(StatCard, {});

		const stat = container.querySelector('.stat');
		expect(stat).toBeInTheDocument();
	});

	test('renders only title', () => {
		const { container } = render(StatCard, {
			title: 'Test Title'
		});

		const stat = container.querySelector('.stat');
		expect(stat).toBeInTheDocument();
		expect(container.querySelector('.stat-value')).not.toBeInTheDocument();
		expect(container.querySelector('.stat-desc')).not.toBeInTheDocument();
	});

	test('renders only value', () => {
		const { container } = render(StatCard, {
			value: '42'
		});

		const stat = container.querySelector('.stat');
		expect(stat).toBeInTheDocument();
		expect(container.querySelector('.stat-title')).not.toBeInTheDocument();
		expect(container.querySelector('.stat-desc')).not.toBeInTheDocument();
	});
});
