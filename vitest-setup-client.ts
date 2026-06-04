import '@testing-library/jest-dom/vitest';
import { vi, beforeAll } from 'vitest';

// required for svelte5 + jsdom as jsdom does not support matchMedia
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	enumerable: true,
	value: vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn()
	}))
});

// add more mocks here if you need them
beforeAll(() => {
	// ResizeObserver polyfill for jsdom — Vitest 4 can break vi.fn()-based mock constructors
	if (typeof globalThis.ResizeObserver === 'undefined') {
		class ResizeObserverPolyfill {
			observe() {}
			unobserve() {}
			disconnect() {}
		}
		(globalThis as { ResizeObserver: unknown }).ResizeObserver = ResizeObserverPolyfill;
	}
});

Element.prototype.animate = vi.fn().mockImplementation(() => ({
	cancel: vi.fn(),
	finished: vi.fn()
}));
