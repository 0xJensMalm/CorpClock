import { useState, useEffect } from 'react';

const YearWidget = ({ currentTime }) => {
  const [yearProgress, setYearProgress] = useState(0);
  
  useEffect(() => {
    // Calculate progress of the year (0-100%)
    const now = new Date(currentTime);
    const start = new Date(now.getFullYear(), 0, 1); // January 1st of current year
    const end = new Date(now.getFullYear() + 1, 0, 1); // January 1st of next year
    
    const totalMillisInYear = end - start;
    const millisElapsed = now - start;
    
    const progress = (millisElapsed / totalMillisInYear) * 100;
    setYearProgress(progress);
  }, [currentTime]);

  return (
    <div className="widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="2"/>
          <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 9H21" stroke="currentColor" strokeWidth="2"/>
          <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Year
      </h3>
      <div className="widget-content">
        <div className="date-display">{currentTime.getFullYear()}</div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${yearProgress}%` }}
          ></div>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {yearProgress.toFixed(1)}% of year complete
        </div>
      </div>
    </div>
  );
};

export default YearWidget;
