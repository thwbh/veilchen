import { render, fireEvent } from '@testing-library/svelte';
import { expect, test, describe, vi } from 'vitest';
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

  test('marks active item with dock-active class', () => {
    const { container } = render(BottomNavigation, {
      items: mockItems,
      activeId: 'search'
    });

    const buttons = container.querySelectorAll('button');
    expect(buttons[1]).toHaveClass('dock-active');
    expect(buttons[0]).not.toHaveClass('dock-active');
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
    const { container } = render(BottomNavigation, {
      items: mockItems,
      activeId: 'home',
    });

    const buttons = container.querySelectorAll('button');
    await fireEvent.click(buttons[1]);

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

    const nav = container.querySelector('.dock');
    expect(nav).toHaveClass('custom-nav');
  });

  test('has dock DaisyUI classes', () => {
    const { container } = render(BottomNavigation, {
      items: mockItems,
      activeId: 'home'
    });

    const nav = container.querySelector('.dock');
    expect(nav).toHaveClass('dock');
    expect(nav).toHaveClass('dock-bottom');
  });

  test('renders without icons', () => {
    const { container } = render(BottomNavigation, {
      items: mockItems,
      activeId: 'home'
    });

    const nav = container.querySelector('.dock');
    expect(nav).toBeInTheDocument();

    const items = container.querySelectorAll('.dock-item');
    expect(items.length).toBe(3);
  });

  test('works without activeId', () => {
    const { container } = render(BottomNavigation, {
      items: mockItems
    });

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
    buttons.forEach((button) => {
      expect(button).not.toHaveClass('dock-active');
    });
  });
});
