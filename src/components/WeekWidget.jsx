import { useState, useEffect } from 'react';

const WeekWidget = ({ currentTime }) => {
  const [weekProgress, setWeekProgress] = useState(0);
  const [currentDay, setCurrentDay] = useState(0);
  const [weekNumber, setWeekNumber] = useState(1);
  
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    // Get current day of week (0-6, where 0 is Sunday)
    const dayOfWeek = currentTime.getDay();
    setCurrentDay(dayOfWeek);
    
    // Calculate progress within the current day
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const dayTotalSeconds = 24 * 3600;
    const dayProgress = totalSeconds / dayTotalSeconds;
    
    // Calculate overall week progress (0-100%)
    const weekProgress = ((dayOfWeek + dayProgress) / 7) * 100;
    setWeekProgress(weekProgress);
    
    // Calculate week number (ISO week number)
    const date = new Date(currentTime);
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    const week1 = new Date(date.getFullYear(), 0, 4);
    const weekNum = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    setWeekNumber(weekNum);
  }, [currentTime]);

  return (
    <div className="widget">
      <div className="widget-header">
        <h3 className="widget-title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Week
        </h3>
        <div className="week-number-badge">Week {weekNumber}</div>
      </div>
      <div className="widget-content">
        <div className="current-day">{weekdays[currentDay]}</div>
        
        <div className="week-dots">
          {weekdays.map((day, index) => (
            <div 
              key={day} 
              className={`week-dot ${index < currentDay ? 'active' : ''} ${index === currentDay ? 'current' : ''}`}
              title={day}
            ></div>
          ))}
        </div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${weekProgress}%` }}
          ></div>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {weekProgress.toFixed(1)}% of week complete
        </div>
      </div>
    </div>
  );
};

export default WeekWidget;
