import '@testing-library/jest-dom';

// Mock window and document for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock document.hidden and document.visibilityState
// These will be overridden in individual tests
if (typeof document !== 'undefined') {
  Object.defineProperty(document, 'hidden', {
    writable: true,
    configurable: true,
    value: false,
  });

  Object.defineProperty(document, 'visibilityState', {
    writable: true,
    configurable: true,
    value: 'visible',
  });
}

// Helper to simulate visibility changes
export const mockVisibilityChange = (
  hidden: boolean,
  visibilityState: DocumentVisibilityState | 'prerender' = hidden
    ? 'hidden'
    : 'visible'
) => {
  if (typeof document === 'undefined') {
    return;
  }

  Object.defineProperty(document, 'hidden', {
    writable: true,
    configurable: true,
    value: hidden,
  });
  Object.defineProperty(document, 'visibilityState', {
    writable: true,
    configurable: true,
    value: visibilityState,
  });

  // Dispatch visibilitychange event
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
};

// Reset visibility to visible
export const resetVisibility = () => {
  if (typeof document !== 'undefined') {
    mockVisibilityChange(false, 'visible');
  }
};
