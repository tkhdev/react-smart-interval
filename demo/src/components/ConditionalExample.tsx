import { useState } from 'react'
import { useSmartInterval } from 'react-smart-interval'

export default function ConditionalExample() {
  const [isActive, setIsActive] = useState(true)
  const [count, setCount] = useState(0)

  useSmartInterval(() => {
    setCount((prev) => prev + 1)
  }, isActive ? 1000 : null)

  return (
    <div>
      <p>
        <strong>Count:</strong> {count}
      </p>
      <button
        className="button"
        onClick={() => setIsActive(!isActive)}
        style={{ marginTop: '15px' }}
      >
        {isActive ? '⏸️ Pause' : '▶️ Resume'} Interval
      </button>
      <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
        {isActive
          ? '✅ Interval is running. Switch tabs to pause automatically.'
          : '⏸️ Interval is paused.'}
      </p>
    </div>
  )
}

