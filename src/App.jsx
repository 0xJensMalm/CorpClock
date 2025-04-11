import { useState, useEffect } from 'react'
import './App.css'
import DayWidget from './components/DayWidget'
import WeekWidget from './components/WeekWidget'
import MonthWidget from './components/MonthWidget'
import QuarterWidget from './components/QuarterWidget'
import YearWidget from './components/YearWidget'
import LifeWidget from './components/LifeWidget'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [])
  
  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('corpclock-theme')
    if (savedTheme === 'light') {
      setIsDarkMode(false)
      document.body.classList.add('light-theme')
    }
  }, [])
  
  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.body.classList.add('light-theme')
      localStorage.setItem('corpclock-theme', 'light')
    } else {
      document.body.classList.remove('light-theme')
      localStorage.setItem('corpclock-theme', 'dark')
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1 className="app-title">Corp<span>Clock</span></h1>
        <p className="subtitle">Where time meets productivity in the corporate void</p>
        
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
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
