import { useState } from 'react'

const quotes = [
  { text: "I am Iron Man.", source: "Tony Stark" },
  { text: "Sometimes you gotta run before you can walk.", source: "Tony Stark" },
  { text: "Heroes are made by the path they choose.", source: "Tony Stark" },
  { text: "The suit and I are one.", source: "Tony Stark" },
  { text: "Part of the journey is the end.", source: "Tony Stark" },
  { text: "Genius, billionaire, playboy, philanthropist... triathlete.", source: "You, Soon" },
  { text: "Pain is temporary, but quitting lasts forever.", source: "Triathlon Wisdom" },
  { text: "The body achieves what the mind believes.", source: "Triathlon Wisdom" },
  { text: "Suffer now and live the rest of your life as a champion.", source: "Muhammad Ali" },
  { text: "You didn't come this far to only come this far.", source: "Triathlon Wisdom" },
  { text: "The finish line is just the beginning of a whole new race.", source: "Triathlon Wisdom" },
  { text: "Anything is possible. You just have to believe.", source: "Ironman" },
]

export const QuotesPage: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextQuote = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length)
      setIsAnimating(false)
    }, 300)
  }

  const prevQuote = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuote(prev => (prev - 1 + quotes.length) % quotes.length)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <div className="page quotes-page">
      <div className="arc-reactor-bg"></div>

      <header className="page-header">
        <h1 className="page-title">MOTIVATION HUB</h1>
        <p className="page-subtitle">Fuel your iron will</p>
      </header>

      <section className="featured-quote-section">
        <div className={`featured-quote ${isAnimating ? 'fade-out' : 'fade-in'}`}>
          <div className="quote-decoration left">"</div>
          <blockquote className="quote-text-large">
            {quotes[currentQuote].text}
          </blockquote>
          <div className="quote-decoration right">"</div>
          <p className="quote-source">— {quotes[currentQuote].source}</p>
        </div>

        <div className="quote-navigation">
          <button className="quote-nav-btn" onClick={prevQuote}>
            <span>◀</span> PREV
          </button>
          <span className="quote-counter">{currentQuote + 1} / {quotes.length}</span>
          <button className="quote-nav-btn" onClick={nextQuote}>
            NEXT <span>▶</span>
          </button>
        </div>
      </section>

      <section className="quotes-grid-section">
        <h3 className="section-title">ALL QUOTES</h3>
        <div className="quotes-grid">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`quote-card ${index === currentQuote ? 'active' : ''}`}
              onClick={() => setCurrentQuote(index)}
            >
              <p className="quote-card-text">"{quote.text}"</p>
              <span className="quote-card-source">— {quote.source}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
