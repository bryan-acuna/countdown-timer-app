import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { HomePage } from './pages/HomePage'
import { TrainingPage } from './pages/TrainingPage'
import { ChecklistPage } from './pages/ChecklistPage'
import { QuotesPage } from './pages/QuotesPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/quotes" element={<QuotesPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="iron-footer">
          <p>POWERED BY BRYAN ACUNA</p>
          <div className="footer-line"></div>
        </footer>
      </div>
    </Router>
  )
}

export default App
