# react-smart-interval

A lightweight React hook that intelligently manages intervals by automatically pausing them when the browser tab is inactive, component unmounts, or when the browser throttles background tabs.

[![npm version](https://img.shields.io/npm/v/react-smart-interval.svg)](https://www.npmjs.com/package/react-smart-interval)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-smart-interval)](https://bundlephobia.com/package/react-smart-interval)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

**[📖 View Live Demo & Documentation](https://react-smart-interval.vercel.app)** | **[📦 npm](https://www.npmjs.com/package/react-smart-interval)** | **[🐛 Report Bug](https://github.com/tkhdev/react-smart-interval/issues)** | **[💡 Request Feature](https://github.com/tkhdev/react-smart-interval/issues)**

## Features

- 🎯 **Automatic Pause/Resume**: Pauses intervals when tab becomes hidden, resumes when visible
- 🔋 **Battery Efficient**: Prevents unnecessary polling in background tabs
- 🧹 **Memory Safe**: Automatically cleans up intervals on component unmount
- 🚀 **Performance Optimized**: Uses refs to avoid unnecessary re-renders
- 📦 **Tiny Bundle**: ~1KB minified
- 🔒 **TypeScript**: Full TypeScript support with comprehensive type definitions
- ⚛️ **SSR Compatible**: Works safely in server-side rendering environments

## Installation

```bash
npm install react-smart-interval
```

or

```bash
yarn add react-smart-interval
```

or

```bash
pnpm add react-smart-interval
```

## Basic Usage

```tsx
import { useSmartInterval } from 'react-smart-interval';

function DataSyncComponent() {
  useSmartInterval(() => {
    syncData();
  }, 5000); // Sync every 5 seconds

  return <div>Data will sync automatically</div>;
}
```

## API

### `useSmartInterval(callback, delay)`

A React hook that manages an interval that automatically pauses when the tab is hidden.

#### Parameters

- **`callback`** (`() => void`): The function to call at each interval execution.
- **`delay`** (`number | null`): The delay in milliseconds between interval executions. Pass `null` to pause the interval.

#### Returns

`void` - This hook doesn't return anything.

#### Behavior

- The interval automatically pauses when:
  - The browser tab becomes hidden/inactive
  - The component unmounts
  - The browser throttles background tabs
- The interval automatically resumes when:
  - The browser tab becomes visible again
- The interval is always cleaned up when the component unmounts
- The callback is always the latest version (uses ref pattern)
- Errors in the callback are caught and logged (in development) to prevent breaking the interval

## Examples

### Conditional Interval

Control the interval based on component state:

```tsx
import { useState } from 'react';
import { useSmartInterval } from 'react-smart-interval';

function PollingComponent() {
  const [isActive, setIsActive] = useState(true);

  useSmartInterval(() => {
    fetchLatestData();
  }, isActive ? 1000 : null); // Pause when isActive is false

  return (
    <div>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Resume'} Polling
      </button>
    </div>
  );
}
```

### Dynamic Delay

Change the interval delay dynamically:

```tsx
import { useState } from 'react';
import { useSmartInterval } from 'react-smart-interval';

function ConfigurableTimer() {
  const [delay, setDelay] = useState(1000);

  useSmartInterval(() => {
    console.log('Tick!');
  }, delay);

  return (
    <div>
      <input
        type="number"
        value={delay}
        onChange={(e) => setDelay(Number(e.target.value))}
        min="100"
      />
      <span>ms delay</span>
    </div>
  );
}
```

### Multiple Intervals

Use multiple intervals in the same component:

```tsx
import { useSmartInterval } from 'react-smart-interval';

function MultiTimerComponent() {
  // Fast interval for UI updates
  useSmartInterval(() => {
    updateUI();
  }, 100);

  // Slow interval for data sync
  useSmartInterval(() => {
    syncData();
  }, 5000);

  return <div>Multiple timers running</div>;
}
```

### Real-World Example: Live Dashboard

```tsx
import { useState, useEffect } from 'react';
import { useSmartInterval } from 'react-smart-interval';

function LiveDashboard() {
  const [metrics, setMetrics] = useState({});

  // Fetch metrics every 2 seconds
  useSmartInterval(async () => {
    const data = await fetch('/api/metrics').then(r => r.json());
    setMetrics(data);
  }, 2000);

  // The interval automatically pauses when user switches tabs
  // and resumes when they come back - no wasted API calls!

  return (
    <div>
      <h1>Live Metrics</h1>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
    </div>
  );
}
```

## Why Use This Instead of `setInterval`?

### Problems with `setInterval`

1. **Memory Leaks**: Intervals continue running even after component unmounts
2. **Battery Drain**: Background tabs continue polling unnecessarily
3. **Wasted Resources**: API calls and computations run even when user can't see them
4. **Manual Cleanup**: You must remember to clear intervals manually

### Benefits of `useSmartInterval`

1. **Automatic Cleanup**: Intervals are cleared on unmount automatically
2. **Battery Efficient**: Pauses when tab is hidden, saving CPU and battery
3. **Resource Efficient**: No wasted API calls or computations in background
4. **Zero Configuration**: Works out of the box with sensible defaults
5. **React-Friendly**: Follows React patterns and best practices

### Comparison

```tsx
// ❌ Using setInterval (manual cleanup, no pause on hide)
useEffect(() => {
  const interval = setInterval(() => {
    syncData();
  }, 5000);

  return () => clearInterval(interval);
}, []);

// ✅ Using useSmartInterval (automatic cleanup, pauses on hide)
useSmartInterval(() => {
  syncData();
}, 5000);
```

## Browser Compatibility

This package uses the [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API), which is supported in:

- ✅ Chrome 13+
- ✅ Firefox 10+
- ✅ Safari 7+
- ✅ Edge 12+
- ✅ Opera 12.1+
- ✅ iOS Safari 7+
- ✅ Android Browser 4.4+

For older browsers, the hook will still work but won't pause when the tab is hidden (it will still clean up on unmount).

## Performance Considerations

- **Bundle Size**: ~1KB minified, making it perfect for production use
- **No Dependencies**: Only React as a peer dependency
- **Optimized**: Uses `useRef` to avoid unnecessary re-renders
- **Efficient**: Event listeners are properly cleaned up

## TypeScript

Full TypeScript support is included:

```tsx
import { useSmartInterval } from 'react-smart-interval';

// TypeScript will infer types correctly
useSmartInterval(() => {
  console.log('Hello');
}, 1000);

// Pass null to pause
useSmartInterval(() => {
  console.log('Paused');
}, null);
```

## Server-Side Rendering (SSR)

The hook is SSR-safe and will gracefully handle server-side rendering:

```tsx
// Works in Next.js, Remix, etc.
function SSRComponent() {
  useSmartInterval(() => {
    // This won't run on the server
    clientOnlyFunction();
  }, 1000);

  return <div>SSR Compatible</div>;
}
```

## Troubleshooting

### Interval doesn't pause when tab is hidden

- Check browser compatibility (see above)
- Ensure you're testing in a real browser (not just Jest tests)
- Verify the Page Visibility API is supported in your environment

### Interval continues after component unmounts

This shouldn't happen, but if it does:
- Make sure you're using the latest version
- Check that React is version 16.8.0 or higher
- Verify you're not using the hook conditionally (outside of component body)

### Callback not updating

The hook uses a ref pattern to always call the latest callback. If you're experiencing issues:
- Ensure the callback is stable (use `useCallback` if needed)
- Check that you're not recreating the callback on every render unnecessarily

### TypeScript errors

If you encounter TypeScript errors:
- Ensure you have `@types/react` installed
- Check that your React version is compatible (>=16.8.0)
- Verify TypeScript version is 4.0 or higher

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please make sure your code follows the existing code style and includes tests for new features.

## Live Demo

Check out the **[live demo and interactive examples](https://react-smart-interval.vercel.app)** to see `react-smart-interval` in action!

The demo includes:
- ✨ All 5 example implementations
- 📚 Complete API documentation
- 💡 Interactive examples you can try
- 🎯 See the pause/resume behavior in real-time

## License

MIT © 2025

## Acknowledgments

This package was inspired by the need for a more intelligent interval hook that respects browser lifecycle and user experience.

