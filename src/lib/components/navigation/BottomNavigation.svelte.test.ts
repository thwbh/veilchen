import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
import { createRawSnippet } from 'svelte';
import BottomNavigation from './BottomNavigation.svelte';

describe('BottomNavigation', () => {
	const mockItems = [
		{ id: 'home', label: 'Home' },
		{ id: 'search', label: 'Search' },
		{ id: 'profile', label: 'Profile' }
	];

	test('renders all navigation items', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home'
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons.length).toBe(3);
	});

	test('renders item labels', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home'
		});

		expect(container.textContent).toContain('Home');
		expect(container.textContent).toContain('Search');
		expect(container.textContent).toContain('Profile');
	});

	test('marks active item with active class', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'search'
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons[1]).toHaveClass('active');
		expect(buttons[0]).not.toHaveClass('active');
	});

	test('sets aria-current on active item', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home'
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons[0]).toHaveAttribute('aria-current', 'page');
		expect(buttons[1]).not.toHaveAttribute('aria-current');
	});

	test('calls onitemclick when item is clicked', async () => {
		const onitemclick = vi.fn();
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home',
			onitemclick
		});

		const buttons = container.querySelectorAll('button');
		await fireEvent.click(buttons[1]);

		expect(onitemclick).toHaveBeenCalledWith('search');
	});

	test('has proper ARIA labels', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home'
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons[0]).toHaveAttribute('aria-label', 'Home');
		expect(buttons[1]).toHaveAttribute('aria-label', 'Search');
		expect(buttons[2]).toHaveAttribute('aria-label', 'Profile');
	});

	test('applies custom class', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home',
			class: 'custom-nav'
		});

		const nav = container.querySelector('.btm-nav');
		expect(nav).toHaveClass('custom-nav');
	});

	test('has btm-nav DaisyUI classes', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems,
			activeId: 'home'
		});

		const nav = container.querySelector('.btm-nav');
		expect(nav).toHaveClass('btm-nav');
		expect(nav).toHaveClass('btm-nav-md');
	});

	test('renders with icons', () => {
		const itemsWithIcons = [
			{
				id: 'home',
				label: 'Home',
				icon: () => '🏠'
			},
			{
				id: 'search',
				label: 'Search',
				icon: () => '🔍'
			}
		];

		const { container } = render(BottomNavigation, {
			items: itemsWithIcons,
			activeId: 'home'
		});

		// Icons are rendered via snippets
		const nav = container.querySelector('.btm-nav');
		expect(nav).toBeInTheDocument();
	});

	test('works without activeId', () => {
		const { container } = render(BottomNavigation, {
			items: mockItems
		});

		const buttons = container.querySelectorAll('button');
		expect(buttons.length).toBe(3);
		buttons.forEach((button) => {
			expect(button).not.toHaveClass('active');
		});
	});
});
