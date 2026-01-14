import { NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './NavBar.css'

const navItems = [
  { path: '/', label: 'HOME', icon: '🏠' },
  { path: '/training', label: 'TRAINING', icon: '💪' },
  { path: '/checklist', label: 'CHECKLIST', icon: '📋' },
  { path: '/quotes', label: 'QUOTES', icon: '💬' },
]

export const NavBar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <div className="nav-reactor">
          <div className="nav-reactor-core"></div>
        </div>
        <span className="nav-title">IRONMAN 70.3</span>
      </div>

      <div className="nav-links">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>

      <div className="nav-actions">
        <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="theme-label">{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
        </button>
        <div className="nav-status">
          <span className="status-indicator"></span>
          <span>ONLINE</span>
        </div>
      </div>
    </nav>
  )
}
