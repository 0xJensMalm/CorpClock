import { useState, useEffect } from 'react'
import './App.css'
import DayWidget from './components/DayWidget'
import WeekWidget from './components/WeekWidget'
import MonthWidget from './components/MonthWidget'
import QuarterWidget from './components/QuarterWidget'
import YearWidget from './components/YearWidget'
import LifeWidget from './components/LifeWidget'
import themes, { applyTheme, getRandomTheme, getNextTheme, getPrevTheme } from './themes'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentTheme, setCurrentTheme] = useState(themes[0])
  const [isThemeControlsActive, setIsThemeControlsActive] = useState(false)
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  // Load theme and mode preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('corpclock-theme-mode')
    if (savedTheme === 'light') {
      setIsDarkMode(false)
    }
    
    const savedThemeId = localStorage.getItem('corpclock-theme-id')
    if (savedThemeId) {
      const theme = themes.find(t => t.id === savedThemeId) || themes[0]
      setCurrentTheme(theme)
    }
    
    // Apply the theme
    applyTheme(savedThemeId || themes[0].id, savedTheme !== 'light')
  }, [])
  
  // Toggle dark/light mode
  const toggleTheme = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('corpclock-theme-mode', newMode ? 'dark' : 'light')
    applyTheme(currentTheme.id, newMode)
  }
  
  // Toggle theme controls visibility
  const toggleThemeControls = () => {
    setIsThemeControlsActive(!isThemeControlsActive)
  }
  
  // Change to a specific theme
  const changeTheme = (theme) => {
    setCurrentTheme(theme)
    localStorage.setItem('corpclock-theme-id', theme.id)
    applyTheme(theme.id, isDarkMode)
  }
  
  // Handle next theme
  const handleNextTheme = () => {
    const nextTheme = getNextTheme(currentTheme.id)
    changeTheme(nextTheme)
  }
  
  // Handle previous theme
  const handlePrevTheme = () => {
    const prevTheme = getPrevTheme(currentTheme.id)
    changeTheme(prevTheme)
  }
  
  // Handle random theme
  const handleRandomTheme = () => {
    const randomTheme = getRandomTheme(currentTheme.id)
    changeTheme(randomTheme)
  }

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">Corp<span>Clock</span></h1>
        <p className="subtitle">Where time meets productivity in the corporate void</p>
        
        <div className={`theme-controls ${isThemeControlsActive ? 'active' : ''}`}>
          <button 
            className="color-toggle" 
            onClick={toggleThemeControls} 
            title="Theme switcher"
          >
            <div className="theme-name-tooltip">{currentTheme.name}</div>
          </button>
          
          <div className="theme-nav-controls">
            <button 
              className="theme-nav-button" 
              onClick={handlePrevTheme}
              title="Previous theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="theme-nav-button" 
              onClick={handleRandomTheme}
              title="Random theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 20L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className="theme-nav-button" 
              onClick={handleNextTheme}
              title="Next theme"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark/light mode">
          {isDarkMode ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </header>
      
      <div className="dashboard-grid">
        <DayWidget currentTime={currentTime} />
        <WeekWidget currentTime={currentTime} />
        <MonthWidget currentTime={currentTime} />
        <QuarterWidget currentTime={currentTime} />
        <YearWidget currentTime={currentTime} />
        <LifeWidget currentTime={currentTime} />
      </div>
    </div>
  )
}

export default App
