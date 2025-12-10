import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useSmartInterval } from '../src/index';
import { mockVisibilityChange, resetVisibility } from './setup';

describe('useSmartInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    // Only reset visibility if document exists (jsdom environment)
    if (typeof document !== 'undefined') {
      resetVisibility();
    }
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    // Only reset visibility if document exists (jsdom environment)
    if (typeof document !== 'undefined') {
      resetVisibility();
    }
  });

  describe('Basic Functionality', () => {
    it('should execute callback at correct intervals', () => {
      const callback = jest.fn();
      const delay = 1000;

      renderHook(() => useSmartInterval(callback, delay));

      // Initially, callback should not be called
      expect(callback).not.toHaveBeenCalled();

      // Fast-forward 1 second
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Fast-forward another second
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      // Fast-forward 3 more seconds
      act(() => {
        jest.advanceTimersByTime(3000);
      });
      expect(callback).toHaveBeenCalledTimes(5);
    });

    it('should pause interval when delay is null', () => {
      const callback = jest.fn();
      type Props = { delay: number | null };
      const { rerender } = renderHook(
        ({ delay }: Props) => useSmartInterval(callback, delay),
        {
          initialProps: { delay: 1000 } as Props,
        }
      );

      // Callback should be called after 1 second
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Set delay to null
      rerender({ delay: null } as Props);

      // Fast-forward time - callback should not be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should resume interval when delay changes from null to number', () => {
      const callback = jest.fn();
      type Props = { delay: number | null };
      const { rerender } = renderHook(
        ({ delay }: Props) => useSmartInterval(callback, delay),
        {
          initialProps: { delay: null } as Props,
        }
      );

      // No callback should be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).not.toHaveBeenCalled();

      // Set delay to 1000ms
      rerender({ delay: 1000 } as Props);

      // Callback should start being called
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should update interval when delay changes', () => {
      const callback = jest.fn();
      type Props = { delay: number | null };
      const { rerender } = renderHook(
        ({ delay }: Props) => useSmartInterval(callback, delay),
        {
          initialProps: { delay: 1000 } as Props,
        }
      );

      // Callback should be called after 1 second
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Change delay to 500ms
      rerender({ delay: 500 } as Props);

      // Callback should now be called every 500ms
      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      act(() => {
        jest.advanceTimersByTime(500);
      });
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('Visibility API', () => {
    it('should pause interval when tab becomes hidden', () => {
      const callback = jest.fn();
      renderHook(() => useSmartInterval(callback, 1000));

      // Callback should be called initially
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Hide the tab
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });

      // Fast-forward time - callback should not be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should resume interval when tab becomes visible', () => {
      const callback = jest.fn();
      renderHook(() => useSmartInterval(callback, 1000));

      // Hide the tab first
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });

      // Fast-forward time - no callbacks
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).not.toHaveBeenCalled();

      // Show the tab
      act(() => {
        mockVisibilityChange(false, 'visible');
      });

      // Callback should start being called
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should handle multiple visibility toggles', () => {
      const callback = jest.fn();
      renderHook(() => useSmartInterval(callback, 1000));

      // Start visible - callback should be called
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Hide
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Show
      act(() => {
        mockVisibilityChange(false, 'visible');
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      // Hide again
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      // Show again
      act(() => {
        mockVisibilityChange(false, 'visible');
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(3);
    });

    it('should continue correctly after resume', () => {
      const callback = jest.fn();
      renderHook(() => useSmartInterval(callback, 1000));

      // Initial call
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Hide
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });
      act(() => {
        jest.advanceTimersByTime(3000);
      });

      // Show - should resume with fresh interval
      act(() => {
        mockVisibilityChange(false, 'visible');
      });
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(2);

      // Should continue normally
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(3);
    });
  });

  describe('Component Lifecycle', () => {
    it('should clear interval on component unmount', () => {
      const callback = jest.fn();
      const { unmount } = renderHook(() => useSmartInterval(callback, 1000));

      // Callback should be called initially
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Unmount component
      unmount();

      // Fast-forward time - callback should not be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not have memory leaks when component unmounts while hidden', () => {
      const callback = jest.fn();
      const { unmount } = renderHook(() => useSmartInterval(callback, 1000));

      // Hide the tab
      act(() => {
        mockVisibilityChange(true, 'hidden');
      });

      // Unmount while hidden
      unmount();

      // Show the tab (should not cause issues)
      act(() => {
        mockVisibilityChange(false, 'visible');
      });

      // Fast-forward time - callback should not be called
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(callback).not.toHaveBeenCalled();
    });

    it('should use latest callback when callback changes', () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      type Props = { callback: () => void };
      const { rerender } = renderHook(
        ({ callback }: Props) => useSmartInterval(callback, 1000),
        {
          initialProps: { callback: callback1 } as Props,
        }
      );

      // First callback should be called
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).not.toHaveBeenCalled();

      // Change callback
      rerender({ callback: callback2 } as Props);

      // New callback should be called
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

});
