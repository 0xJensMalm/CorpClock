import { useState, useEffect } from 'react';

const DayWidget = ({ currentTime }) => {
  const [dayProgress, setDayProgress] = useState(0);

  useEffect(() => {
    // Calculate progress of the day (0-100%)
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const dayTotalSeconds = 24 * 3600;
    const progress = (totalSeconds / dayTotalSeconds) * 100;
    
    setDayProgress(progress);
  }, [currentTime]);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  return (
    <div className="widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Day
      </h3>
      <div className="widget-content">
        <div className="time-display">{formatTime(currentTime)}</div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${dayProgress}%` }}
          ></div>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {dayProgress.toFixed(1)}% of day complete
        </div>
      </div>
    </div>
  );
};

export default DayWidget;
