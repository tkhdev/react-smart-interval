import { useState } from 'react'
import { useSmartInterval } from 'react-smart-interval'

export default function MultipleIntervalsExample() {
  const [fastCount, setFastCount] = useState(0)
  const [slowCount, setSlowCount] = useState(0)

  // Fast interval for UI updates (every 100ms)
  useSmartInterval(() => {
    setFastCount((prev) => prev + 1)
  }, 100)

  // Slow interval for data sync (every 5 seconds)
  useSmartInterval(() => {
    setSlowCount((prev) => prev + 1)
  }, 5000)

  return (
    <div>
      <p>
        <strong>Fast counter (100ms):</strong> {fastCount}
      </p>
      <p>
        <strong>Slow counter (5s):</strong> {slowCount}
      </p>
      <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
        Both intervals pause when you switch tabs and resume when you come back.
      </p>
    </div>
  )
}

