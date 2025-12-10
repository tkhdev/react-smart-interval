import { useState } from 'react'
import { useSmartInterval } from 'react-smart-interval'

export default function BasicExample() {
  const [syncCount, setSyncCount] = useState(0)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  useSmartInterval(() => {
    setSyncCount((prev) => prev + 1)
    setLastSync(new Date())
    console.log('Data synced!', new Date().toLocaleTimeString())
  }, 5000)

  return (
    <div>
      <p>
        <strong>Sync count:</strong> {syncCount}
      </p>
      {lastSync && (
        <p>
          <strong>Last sync:</strong> {lastSync.toLocaleTimeString()}
        </p>
      )}
      <p style={{ marginTop: '10px', fontSize: '0.9em', color: '#666' }}>
        💡 Switch to another tab and come back - the interval pauses
        automatically!
      </p>
    </div>
  )
}

