import { useState, useEffect } from 'react'

const checklist = [
  // Swimming
  { id: 1, text: 'Open water swim practice', category: 'Swim' },
  { id: 2, text: 'Sighting drills (look forward while swimming)', category: 'Swim' },
  { id: 3, text: 'Wetsuit practice sessions', category: 'Swim' },
  { id: 4, text: 'Swim 2km+ continuously', category: 'Swim' },
  { id: 5, text: 'Practice mass start simulation', category: 'Swim' },
  // Biking
  { id: 6, text: 'Long ride 80-100km', category: 'Bike' },
  { id: 7, text: 'Hill climbing training', category: 'Bike' },
  { id: 8, text: 'Aero position endurance', category: 'Bike' },
  { id: 9, text: 'Nutrition practice on bike', category: 'Bike' },
  { id: 10, text: 'Bike maintenance & tune-up', category: 'Bike' },
  { id: 11, text: 'Practice flat tire changes', category: 'Bike' },
  // Running
  { id: 12, text: 'Long run 18-21km', category: 'Run' },
  { id: 13, text: 'Brick workout (bike-to-run)', category: 'Run' },
  { id: 14, text: 'Race pace intervals', category: 'Run' },
  { id: 15, text: 'Heat training (for Cap Cana)', category: 'Run' },
  { id: 16, text: 'Run nutrition strategy', category: 'Run' },
  // Gear & Logistics
  { id: 17, text: 'Wetsuit fitted & ready', category: 'Gear' },
  { id: 18, text: 'Tri suit / race kit', category: 'Gear' },
  { id: 19, text: 'Running shoes (<500km wear)', category: 'Gear' },
  { id: 20, text: 'Race registration complete', category: 'Logistics' },
  { id: 21, text: 'Book flights & hotel', category: 'Logistics' },
  { id: 22, text: 'Bike transport arranged', category: 'Logistics' },
]

const tabs = [
  { id: 'All', label: 'ALL', icon: '📋' },
  { id: 'Swim', label: 'SWIM', icon: '🏊' },
  { id: 'Bike', label: 'BIKE', icon: '🚴' },
  { id: 'Run', label: 'RUN', icon: '🏃' },
  { id: 'Other', label: 'GEAR & LOGISTICS', icon: '⚙️' },
]

export const ChecklistPage: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<number[]>(() => {
    const saved = localStorage.getItem('ironman-checklist')
    return saved ? JSON.parse(saved) : []
  })
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    localStorage.setItem('ironman-checklist', JSON.stringify(completedItems))
  }, [completedItems])

  const toggleItem = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const filteredChecklist = checklist.filter(item => {
    if (activeTab === 'All') return true
    if (activeTab === 'Other') return item.category === 'Gear' || item.category === 'Logistics'
    return item.category === activeTab
  })

  const getTabProgress = (tabId: string) => {
    const tabItems = checklist.filter(item => {
      if (tabId === 'All') return true
      if (tabId === 'Other') return item.category === 'Gear' || item.category === 'Logistics'
      return item.category === tabId
    })
    const completed = tabItems.filter(item => completedItems.includes(item.id)).length
    return { completed, total: tabItems.length }
  }

  const progress = Math.round((completedItems.length / checklist.length) * 100)

  return (
    <div className="page checklist-page">
      <div className="arc-reactor-bg"></div>

      <header className="page-header">
        <h1 className="page-title">MISSION CHECKLIST</h1>
        <p className="page-subtitle">Track your race preparation progress</p>
      </header>

      <section className="checklist-section">
        {/* Overall Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress}% COMPLETE ({completedItems.length}/{checklist.length})</span>
        </div>

        {/* Tabs */}
        <div className="tabs-container">
          {tabs.map(tab => {
            const tabProgress = getTabProgress(tab.id)
            return (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                data-tab={tab.id}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
                <span className="tab-count">{tabProgress.completed}/{tabProgress.total}</span>
              </button>
            )
          })}
        </div>

        {/* Filtered Checklist */}
        <div className="checklist-grid">
          {filteredChecklist.map(item => (
            <div
              key={item.id}
              className={`checklist-item ${completedItems.includes(item.id) ? 'completed' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="checkbox">
                {completedItems.includes(item.id) && <span className="checkmark">✓</span>}
              </div>
              <div className="item-content">
                <span className="item-category" data-category={item.category}>{item.category}</span>
                <span className="item-text">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
