const trainingPlans = {
  swim: {
    title: 'SWIM TRAINING',
    icon: '🏊',
    color: '#06b6d4',
    distance: '1.9 km',
    tips: [
      'Focus on bilateral breathing (both sides)',
      'Practice open water sighting every 6-8 strokes',
      'Train with your wetsuit to get comfortable',
      'Work on drafting skills with training partners',
      'Build up to 2.5km continuous swims',
    ],
    weeklyGoal: '3-4 sessions, 8-12 km total',
  },
  bike: {
    title: 'BIKE TRAINING',
    icon: '🚴',
    color: '#f59e0b',
    distance: '90 km',
    tips: [
      'Practice riding in aero position for extended periods',
      'Include hill repeats for strength',
      'Train your nutrition strategy on long rides',
      'Practice mounting/dismounting for transitions',
      'Build up to 100km+ long rides',
    ],
    weeklyGoal: '3-4 sessions, 150-200 km total',
  },
  run: {
    title: 'RUN TRAINING',
    icon: '🏃',
    color: '#22c55e',
    distance: '21.1 km',
    tips: [
      'Include brick workouts (bike-to-run transitions)',
      'Practice race pace intervals',
      'Train in heat to prepare for Cap Cana',
      'Focus on running form when fatigued',
      'Build up to 18-21km long runs',
    ],
    weeklyGoal: '3-4 sessions, 40-50 km total',
  },
}

export const TrainingPage: React.FC = () => {
  return (
    <div className="page training-page">
      <div className="arc-reactor-bg"></div>

      <header className="page-header">
        <h1 className="page-title">TRAINING HQ</h1>
        <p className="page-subtitle">Your path to becoming an IRONMAN</p>
      </header>

      <div className="training-grid">
        {Object.entries(trainingPlans).map(([key, plan]) => (
          <div key={key} className="training-card" style={{ '--accent-color': plan.color } as React.CSSProperties}>
            <div className="training-card-header">
              <span className="training-icon">{plan.icon}</span>
              <h2 className="training-title">{plan.title}</h2>
              <span className="training-distance">{plan.distance}</span>
            </div>

            <div className="training-tips">
              <h3>KEY TRAINING TIPS</h3>
              <ul>
                {plan.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="training-goal">
              <span className="goal-label">WEEKLY GOAL</span>
              <span className="goal-value">{plan.weeklyGoal}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="race-week-section">
        <h3 className="section-title">RACE WEEK PROTOCOL</h3>
        <div className="protocol-grid">
          <div className="protocol-item">
            <span className="protocol-day">7 DAYS OUT</span>
            <span className="protocol-text">Last long workout, begin taper</span>
          </div>
          <div className="protocol-item">
            <span className="protocol-day">3 DAYS OUT</span>
            <span className="protocol-text">Light swimming, bike check-in</span>
          </div>
          <div className="protocol-item">
            <span className="protocol-day">1 DAY OUT</span>
            <span className="protocol-text">Short shakeout, prep transition bags</span>
          </div>
          <div className="protocol-item">
            <span className="protocol-day">RACE DAY</span>
            <span className="protocol-text">Execute the plan, become IRONMAN!</span>
          </div>
        </div>
      </section>
    </div>
  )
}
