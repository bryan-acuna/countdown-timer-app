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
  { id: 1, text: 'Complete swim training', category: 'Training' },
  { id: 2, text: 'Long bike sessions (3+ hours)', category: 'Training' },
  { id: 3, text: 'Brick workouts (bike-to-run)', category: 'Training' },
  { id: 4, text: 'Book travel & accommodation', category: 'Logistics' },
  { id: 5, text: 'Register for race', category: 'Logistics' },
  { id: 6, text: 'Wetsuit ready', category: 'Gear' },
  { id: 7, text: 'Bike serviced', category: 'Gear' },
  { id: 8, text: 'Running shoes (max 500km)', category: 'Gear' },
]

function App() {
  const [completedItems, setCompletedItems] = useState<number[]>([])
  const [currentQuote, setCurrentQuote] = useState(0)

  const toggleItem = (id: number) => {
    setCompletedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const nextQuote = () => {
    setCurrentQuote(prev => (prev + 1) % motivationalQuotes.length)
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
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress}% COMPLETE</span>
        </div>
        <div className="checklist-grid">
          {checklist.map(item => (
            <div
              key={item.id}
              className={`checklist-item ${completedItems.includes(item.id) ? 'completed' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              <div className="checkbox">
                {completedItems.includes(item.id) && <span className="checkmark">✓</span>}
              </div>
              <div className="item-content">
                <span className="item-category">{item.category}</span>
                <span className="item-text">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="iron-footer">
        <p>POWERED BY STARK INDUSTRIES</p>
        <div className="footer-line"></div>
      </footer>
    </div>
  )
}

export default App
