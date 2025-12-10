import { useState } from 'react'
import BasicExample from './components/BasicExample'
import ConditionalExample from './components/ConditionalExample'
import DynamicDelayExample from './components/DynamicDelayExample'
import MultipleIntervalsExample from './components/MultipleIntervalsExample'
import LiveDashboardExample from './components/LiveDashboardExample'
import './index.css'

function App() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="header">
        <h1>react-smart-interval</h1>
        <p>
          A React hook that pauses intervals automatically when tab is inactive,
          component unmounts, or browser throttles
        </p>
        <div style={{ marginTop: '20px' }}>
          <a
            href="https://github.com/tkhdev/react-smart-interval"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#667eea',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: 'bold',
              margin: '0 10px',
            }}
          >
            View on GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/react-smart-interval"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              fontWeight: 'bold',
              margin: '0 10px',
              border: '2px solid white',
            }}
          >
            npm install
          </a>
        </div>
      </header>

      <nav className="nav">
        <ul>
          <li>
            <a onClick={() => scrollToSection('features')}>Features</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('installation')}>Installation</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('api')}>API</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('examples')}>Examples</a>
          </li>
          <li>
            <a onClick={() => scrollToSection('why')}>Why Use This?</a>
          </li>
        </ul>
      </nav>

      <div className="container">
        <section id="features" className="section">
          <h2>✨ Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h4>🎯 Automatic Pause/Resume</h4>
              <p>Pauses intervals when tab becomes hidden, resumes when visible</p>
            </div>
            <div className="feature-card">
              <h4>🔋 Battery Efficient</h4>
              <p>Prevents unnecessary polling in background tabs</p>
            </div>
            <div className="feature-card">
              <h4>🧹 Memory Safe</h4>
              <p>Automatically cleans up intervals on component unmount</p>
            </div>
            <div className="feature-card">
              <h4>🚀 Performance Optimized</h4>
              <p>Uses refs to avoid unnecessary re-renders</p>
            </div>
            <div className="feature-card">
              <h4>📦 Tiny Bundle</h4>
              <p>~450 bytes minified and gzipped</p>
            </div>
            <div className="feature-card">
              <h4>🔒 TypeScript</h4>
              <p>Full TypeScript support with comprehensive types</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat">
              <div className="stat-value">451 B</div>
              <div className="stat-label">Bundle Size</div>
            </div>
            <div className="stat">
              <div className="stat-value">0</div>
              <div className="stat-label">Dependencies</div>
            </div>
            <div className="stat">
              <div className="stat-value">100%</div>
              <div className="stat-label">TypeScript</div>
            </div>
          </div>
        </section>

        <section id="installation" className="section">
          <h2>📦 Installation</h2>
          <pre>
            <code>npm install react-smart-interval</code>
          </pre>
          <p>or</p>
          <pre>
            <code>yarn add react-smart-interval</code>
          </pre>
          <p>or</p>
          <pre>
            <code>pnpm add react-smart-interval</code>
          </pre>
        </section>

        <section id="api" className="section">
          <h2>📚 API Documentation</h2>

          <h3>useSmartInterval(callback, delay)</h3>
          <p>
            A React hook that manages an interval that automatically pauses when
            the tab is hidden.
          </p>

          <h4>Parameters</h4>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>
              <strong>callback</strong> (<code>() =&gt; void</code>): The function
              to call at each interval execution.
            </li>
            <li>
              <strong>delay</strong> (<code>number | null</code>): The delay in
              milliseconds between interval executions. Pass <code>null</code> to
              pause the interval.
            </li>
          </ul>

          <h4>Returns</h4>
          <p>
            <code>void</code> - This hook doesn&apos;t return anything.
          </p>

          <h4>Behavior</h4>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>
              The interval automatically pauses when the browser tab becomes
              hidden/inactive
            </li>
            <li>
              The interval automatically resumes when the browser tab becomes
              visible again
            </li>
            <li>
              The interval is always cleaned up when the component unmounts
            </li>
            <li>
              The callback is always the latest version (uses ref pattern)
            </li>
            <li>
              Errors in the callback are caught and logged (in development) to
              prevent breaking the interval
            </li>
          </ul>
        </section>

        <section id="examples" className="section">
          <h2>💡 Live Examples</h2>
          <p style={{ marginBottom: '30px' }}>
            Try these interactive examples. Switch tabs to see the intervals pause
            automatically!
          </p>

          <div className="demo-box">
            <h4>1. Basic Usage</h4>
            <p style={{ marginBottom: '15px' }}>
              Simple interval that syncs data every 5 seconds. Check the console
              to see it in action.
            </p>
            <BasicExample />
          </div>

          <div className="demo-box">
            <h4>2. Conditional Interval</h4>
            <p style={{ marginBottom: '15px' }}>
              Control the interval based on component state. Toggle the button to
              pause/resume.
            </p>
            <ConditionalExample />
          </div>

          <div className="demo-box">
            <h4>3. Dynamic Delay</h4>
            <p style={{ marginBottom: '15px' }}>
              Change the interval delay dynamically. Watch the counter speed up or
              slow down!
            </p>
            <DynamicDelayExample />
          </div>

          <div className="demo-box">
            <h4>4. Multiple Intervals</h4>
            <p style={{ marginBottom: '15px' }}>
              Use multiple intervals in the same component. Each runs
              independently.
            </p>
            <MultipleIntervalsExample />
          </div>

          <div className="demo-box">
            <h4>5. Real-World Dashboard</h4>
            <p style={{ marginBottom: '15px' }}>
              Simulated live dashboard with API polling. Switch tabs to pause
              polling automatically.
            </p>
            <LiveDashboardExample />
          </div>
        </section>

        <section id="why" className="section">
          <h2>🤔 Why Use This Instead of setInterval?</h2>

          <h3>Problems with setInterval</h3>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>
              <strong>Memory Leaks:</strong> Intervals continue running even after
              component unmounts
            </li>
            <li>
              <strong>Battery Drain:</strong> Background tabs continue polling
              unnecessarily
            </li>
            <li>
              <strong>Wasted Resources:</strong> API calls and computations run
              even when user can&apos;t see them
            </li>
            <li>
              <strong>Manual Cleanup:</strong> You must remember to clear intervals
              manually
            </li>
          </ul>

          <h3>Benefits of useSmartInterval</h3>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>
              <strong>Automatic Cleanup:</strong> Intervals are cleared on unmount
              automatically
            </li>
            <li>
              <strong>Battery Efficient:</strong> Pauses when tab is hidden,
              saving CPU and battery
            </li>
            <li>
              <strong>Resource Efficient:</strong> No wasted API calls or
              computations in background
            </li>
            <li>
              <strong>Zero Configuration:</strong> Works out of the box with
              sensible defaults
            </li>
            <li>
              <strong>React-Friendly:</strong> Follows React patterns and best
              practices
            </li>
          </ul>

          <h3>Comparison</h3>
          <pre>
            <code>{`// ❌ Using setInterval (manual cleanup, no pause on hide)
useEffect(() => {
  const interval = setInterval(() => {
    syncData();
  }, 5000);

  return () => clearInterval(interval);
}, []);

// ✅ Using useSmartInterval (automatic cleanup, pauses on hide)
useSmartInterval(() => {
  syncData();
}, 5000);`}</code>
          </pre>
        </section>

        <section className="section">
          <h2>🌐 Browser Compatibility</h2>
          <p>
            This package uses the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API"
              target="_blank"
              rel="noopener noreferrer"
            >
              Page Visibility API
            </a>
            , which is supported in:
          </p>
          <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
            <li>✅ Chrome 13+</li>
            <li>✅ Firefox 10+</li>
            <li>✅ Safari 7+</li>
            <li>✅ Edge 12+</li>
            <li>✅ Opera 12.1+</li>
            <li>✅ iOS Safari 7+</li>
            <li>✅ Android Browser 4.4+</li>
          </ul>
          <p style={{ marginTop: '15px' }}>
            For older browsers, the hook will still work but won&apos;t pause when
            the tab is hidden (it will still clean up on unmount).
          </p>
        </section>
      </div>

      <footer className="footer">
        <p>
          Made with ❤️ for the React community |{' '}
          <a href="https://github.com/tkhdev/react-smart-interval" target="_blank" rel="noopener noreferrer">
            View Source
          </a>
        </p>
        <p style={{ marginTop: '10px', opacity: 0.8 }}>MIT License © 2025</p>
      </footer>
    </>
  )
}

export default App

