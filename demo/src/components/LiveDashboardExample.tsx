import { useState, useEffect } from 'react'
import { useSmartInterval } from 'react-smart-interval'

interface Metrics {
  users: number
  requests: number
  errors: number
}

export default function LiveDashboardExample() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [updateCount, setUpdateCount] = useState(0)

  // Simulate API call
  const fetchMetrics = async () => {
    setIsLoading(true)
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    // Generate random metrics
    setMetrics({
      users: Math.floor(Math.random() * 1000) + 500,
      requests: Math.floor(Math.random() * 5000) + 2000,
      errors: Math.floor(Math.random() * 10),
    })
    setLastUpdate(new Date())
    setUpdateCount((prev) => prev + 1)
    setIsLoading(false)
  }

  // Fetch metrics every 2 seconds
  // The interval automatically pauses when the tab is hidden
  useSmartInterval(() => {
    fetchMetrics()
  }, 2000)

  // Initial load
  useEffect(() => {
    fetchMetrics()
  }, [])

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {metrics && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '15px' }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f0f0f0', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {metrics.users}
            </div>
            <div style={{ fontSize: '0.9em', color: '#666' }}>Active Users</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f0f0f0', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {metrics.requests}
            </div>
            <div style={{ fontSize: '0.9em', color: '#666' }}>Requests/min</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f0f0f0', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {metrics.errors}
            </div>
            <div style={{ fontSize: '0.9em', color: '#666' }}>Errors</div>
          </div>
        </div>
      )}
      {lastUpdate && (
        <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
          Last updated: {lastUpdate.toLocaleTimeString()} (Updated {updateCount} times)
        </p>
      )}
      <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#666' }}>
        💡 Tip: Switch tabs to pause polling. The interval resumes when you come
        back!
      </p>
    </div>
  )
}

