import { CountdownTimer } from '../components/CountdownTimer'

const raceDistances = [
  { name: 'SWIM', distance: '1.9 km', icon: '🏊' },
  { name: 'BIKE', distance: '90 km', icon: '🚴' },
  { name: 'RUN', distance: '21.1 km', icon: '🏃' },
]

export const HomePage: React.FC = () => {
  return (
    <div className="page home-page">
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
    </div>
  )
}
