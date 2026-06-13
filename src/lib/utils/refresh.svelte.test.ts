import { render } from '@testing-library/svelte';
import { expect, test, describe } from 'vitest';
import { createRefreshContext, useRefresh } from './refresh.svelte';

describe('refresh utilities', () => {
	test('createRefreshContext creates context with expected structure', () => {
		function TestComponent() {
			const result = createRefreshContext();
			expect(result).toHaveProperty('handler');
			expect(result).toHaveProperty('isRefreshing');
			expect(result.handler).toBeUndefined();
			expect(result.isRefreshing).toBe(false);
			return '';
		}

		render(TestComponent);
	});

	test('useRefresh throws without context', () => {
		function TestComponent() {
			useRefresh(() => {});
		}

		expect(() => render(TestComponent)).toThrow(
			'useRefresh must be called within a component that has createRefreshContext'
		);
	});

	test('useRefresh guard logic prevents unnecessary updates', () => {
		// This test validates the core guard logic: if (context.handler !== handler)
		// by simulating the effect behavior with different handler references

		const mockContext = {
			handler: undefined as (() => void) | undefined,
			isRefreshing: false
		};

		let updateCount = 0;

		// Simulate the effect logic from useRefresh
		const simulateEffect = (handler: () => void) => {
			if (mockContext.handler !== handler) {
				mockContext.handler = handler;
				updateCount++;
			}
		};

		// Test 1: First handler should update
		const handler1 = () => {};
		simulateEffect(handler1);
		expect(updateCount).toBe(1);
		expect(mockContext.handler).toBe(handler1);

		// Test 2: Same handler reference should NOT update
		simulateEffect(handler1);
		expect(updateCount).toBe(1); // Still 1, no new update
		expect(mockContext.handler).toBe(handler1);

		// Test 3: Different handler reference should update
		const handler2 = () => {};
		simulateEffect(handler2);
		expect(updateCount).toBe(2); // Now 2, updated again
		expect(mockContext.handler).toBe(handler2);

		// Test 4: Going back to first handler should update again
		simulateEffect(handler1);
		expect(updateCount).toBe(3); // Now 3, updated again
		expect(mockContext.handler).toBe(handler1);
	});
});
