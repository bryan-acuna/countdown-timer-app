import { useState } from 'react'
import { CountdownTimer } from './components/CountdownTimer'
import './App.css'

const motivationalQuotes = [
  "I am Iron Man.",
  "Sometimes you gotta run before you can walk.",
  "Heroes are made by the path they choose.",
  "The suit and I are one.",
  "Part of the journey is the end.",
  "Genius, billionaire, playboy, philanthropist... triathlete.",
]

const raceDistances = [
  { name: 'SWIM', distance: '1.9 km', icon: '🏊' },
  { name: 'BIKE', distance: '90 km', icon: '🚴' },
  { name: 'RUN', distance: '21.1 km', icon: '🏃' },
]

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

function App() {
  const [completedItems, setCompletedItems] = useState<number[]>([])
  const [currentQuote, setCurrentQuote] = useState(0)
  const [activeTab, setActiveTab] = useState('All')

  const toggleItem = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const nextQuote = () => {
    setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
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
    <div className="app">
      {/* Arc Reactor Background Effect */}
      <div className="arc-reactor-bg"></div>

      {/* Header with Iron Man styling */}
      <header className="iron-header">
        <div className="arc-reactor-icon">
          <div className="reactor-core"></div>
          <div className="reactor-ring"></div>
          <div className="reactor-ring ring-2"></div>
        </div>
        <h1>IRONMAN 70.3</h1>
        <h2 className="location">Cap Cana, Dominican Republic</h2>
      </header>

      {/* Main Countdown */}
      <CountdownTimer />

      {/* Race Distance Cards */}
      <section className="distance-section">
        <h3 className="section-title">RACE BREAKDOWN</h3>
        <div className="distance-cards">
          {raceDistances.map((item, index) => (
            <div key={index} className="distance-card">
              <span className="distance-icon">{item.icon}</span>
              <span className="distance-name">{item.name}</span>
              <span className="distance-value">{item.distance}</span>
            </div>
          ))}
        </div>
        <div className="total-distance">
          <span>TOTAL: 113 KM (70.3 MILES)</span>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="quote-section">
        <div className="quote-container" onClick={nextQuote}>
          <div className="quote-marks">"</div>
          <p className="quote-text">{motivationalQuotes[currentQuote]}</p>
          <span className="quote-hint">Click for next quote</span>
        </div>
      </section>

      {/* Preparation Checklist */}
      <section className="checklist-section">
        <h3 className="section-title">MISSION CHECKLIST</h3>

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

      {/* Footer */}
      <footer className="iron-footer">
        <p>POWERED BY BRYAN ACUNA</p>
        <div className="footer-line"></div>
      </footer>
    </div>
  )
}

export default App
