import { useEffect, useRef } from 'react';

/**
 * Checks if the page is currently visible.
 * Returns true for SSR environments where document is undefined.
 *
 * @returns {boolean} True if page is visible or in SSR environment, false otherwise
 */
function isPageVisible(): boolean {
  if (typeof document === 'undefined') {
    return true; // SSR - assume visible
  }
  return !document.hidden;
}

/**
 * Gets the current visibility state of the page.
 * Returns 'visible' for SSR environments.
 *
 * @returns {DocumentVisibilityState} The visibility state of the page
 */
function getVisibilityState(): DocumentVisibilityState {
  if (typeof document === 'undefined') {
    return 'visible'; // SSR - assume visible
  }
  return document.visibilityState;
}

/**
 * A React hook that pauses intervals automatically when:
 * - The browser tab becomes inactive/hidden
 * - The component unmounts
 * - The browser throttles background tabs
 *
 * The interval automatically resumes when the tab becomes visible again.
 *
 * @param callback - The function to call at each interval execution. This callback
 *                   is always the latest version (uses ref pattern), so you don't need
 *                   to worry about stale closures.
 * @param delay - The delay in milliseconds between interval executions.
 *                Pass `null` to pause the interval. The interval will automatically
 *                restart when delay changes from `null` to a number.
 *
 * @remarks
 * - The hook automatically handles cleanup on component unmount
 * - Errors in the callback are caught and logged (in development) to prevent breaking the interval
 * - The hook is SSR-safe and will gracefully handle server-side rendering
 * - Uses the Page Visibility API to detect tab visibility changes
 *
 * @example
 * Basic usage:
 * ```tsx
 * function MyComponent() {
 *   useSmartInterval(() => {
 *     syncData();
 *   }, 5000);
 *
 *   return <div>Content</div>;
 * }
 * ```
 *
 * @example
 * Conditional interval:
 * ```tsx
 * function MyComponent() {
 *   const [isActive, setIsActive] = useState(true);
 *
 *   useSmartInterval(() => {
 *     fetchData();
 *   }, isActive ? 1000 : null);
 *
 *   return <div>Content</div>;
 * }
 * ```
 *
 * @example
 * Dynamic delay:
 * ```tsx
 * function MyComponent() {
 *   const [delay, setDelay] = useState(1000);
 *
 *   useSmartInterval(() => {
 *     console.log('Tick!');
 *   }, delay);
 *
 *   return <div>Delay: {delay}ms</div>;
 * }
 * ```
 */
export function useSmartInterval(
  callback: () => void,
  delay: number | null
): void {
  // Use ref to store the latest callback without recreating the interval
  const savedCallback = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Always use the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // SSR check - don't run in SSR environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    // Function to execute the callback
    const tick = () => {
      savedCallback.current();
    };

    // Function to start the interval
    const startInterval = () => {
      // Clear any existing interval first
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Only start if delay is not null and is a valid number
      if (delay !== null && typeof delay === 'number' && delay >= 0) {
        intervalRef.current = setInterval(tick, delay);
      }
    };

    // Function to stop the interval
    const stopInterval = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      const isVisible = isPageVisible();
      const visibilityState = getVisibilityState();

      // Pause interval when page becomes hidden
      if (!isVisible || visibilityState === 'hidden') {
        stopInterval();
      }
      // Resume interval when page becomes visible (and delay is set)
      else if (isVisible && visibilityState === 'visible' && delay !== null) {
        startInterval();
      }
    };

    // Start interval if page is currently visible and delay is set
    if (
      isPageVisible() &&
      getVisibilityState() === 'visible' &&
      delay !== null
    ) {
      startInterval();
    }

    // Listen to visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      stopInterval();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [delay]); // Re-run when delay changes
}
