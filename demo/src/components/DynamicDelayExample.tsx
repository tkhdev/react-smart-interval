import { useState } from 'react'
import { useSmartInterval } from 'react-smart-interval'

export default function DynamicDelayExample() {
  const [delay, setDelay] = useState(1000)
  const [tickCount, setTickCount] = useState(0)

  useSmartInterval(() => {
    setTickCount((prev) => prev + 1)
  }, delay)

  return (
    <div>
      <p>
        <strong>Tick count:</strong> {tickCount}
      </p>
      <div style={{ marginTop: '15px' }}>
        <label className="label">
          Delay (ms):
          <input
            className="input"
            type="number"
            value={delay}
            onChange={(e) => {
              const newDelay = Number(e.target.value)
              if (newDelay > 0) {
                setDelay(newDelay)
              }
            }}
            min="100"
            step="100"
          />
        </label>
      </div>
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
        Current delay: <strong>{delay}ms</strong> - Try changing it to see the
        interval update in real-time!
      </p>
    </div>
  )
}

