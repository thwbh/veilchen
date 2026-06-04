import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import ActivityRing from './ActivityRing.svelte';

describe('ActivityRing', () => {
	it('renders the center label', () => {
		const { container } = render(ActivityRing, {
			rings: [{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' }],
			label: '500'
		});
		expect(screen.getByText('500')).toBeTruthy();
		expect(container.querySelector('svg')).toBeTruthy();
	});

	it('renders subtitle when provided', () => {
		render(ActivityRing, {
			rings: [{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' }],
			label: '500',
			subtitle: 'steps'
		});
		expect(screen.getByText('steps')).toBeTruthy();
	});

	it('renders legend for multiple rings', () => {
		render(ActivityRing, {
			rings: [
				{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' },
				{ key: 'exercise', label: 'Exercise', current: 30, goal: 60, color: 'emerald' },
				{ key: 'stand', label: 'Stand', current: 8, goal: 12, color: 'amber' }
			],
			label: '8,432'
		});
		expect(screen.getByText('Move')).toBeTruthy();
		expect(screen.getByText('Exercise')).toBeTruthy();
		expect(screen.getByText('Stand')).toBeTruthy();
	});

	it('respects size prop', () => {
		const { container } = render(ActivityRing, {
			rings: [{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' }],
			label: '500',
			size: 'lg'
		});
		expect(container.querySelector('svg')?.getAttribute('width')).toBe('196');
	});

	it('hides center when showCenter is false', () => {
		const { container } = render(ActivityRing, {
			rings: [{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' }],
			label: '500',
			showCenter: false
		});
		expect(container.querySelector('.activity-ring-center')).toBeNull();
	});

	it('renders correct number of rings', () => {
		const { container } = render(ActivityRing, {
			rings: [
				{ key: 'move', label: 'Move', current: 500, goal: 600, color: 'rose' },
				{ key: 'exercise', label: 'Exercise', current: 30, goal: 60, color: 'emerald' },
				{ key: 'stand', label: 'Stand', current: 8, goal: 12, color: 'amber' }
			],
			label: '8,432'
		});
		const progressRings = container.querySelectorAll('.activity-ring-progress');
		expect(progressRings).toHaveLength(3);
	});
});
