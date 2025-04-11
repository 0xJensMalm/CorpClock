import { useState, useEffect } from 'react';

const MonthWidget = ({ currentTime }) => {
  const [monthProgress, setMonthProgress] = useState(0);
  
  useEffect(() => {
    // Get current day of month and total days in month
    const date = currentTime.getDate();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Calculate progress within the current day
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    const dayTotalSeconds = 24 * 3600;
    const dayProgress = totalSeconds / dayTotalSeconds;
    
    // Calculate overall month progress (0-100%)
    const monthProgress = ((date - 1 + dayProgress) / totalDaysInMonth) * 100;
    setMonthProgress(monthProgress);
  }, [currentTime]);

  // Format date as "Month Day" (e.g., "April 11")
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="6" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M3 10H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 3V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 14H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 14H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Month
      </h3>
      <div className="widget-content">
        <div className="date-display">{formatDate(currentTime)}</div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${monthProgress}%` }}
          ></div>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {monthProgress.toFixed(1)}% of month complete
        </div>
      </div>
    </div>
  );
};

export default MonthWidget;
