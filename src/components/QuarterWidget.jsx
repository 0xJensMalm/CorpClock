import { useState, useEffect } from 'react';

const QuarterWidget = ({ currentTime }) => {
  const [quarterProgress, setQuarterProgress] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState(1);
  
  useEffect(() => {
    // Get current month (0-11)
    const month = currentTime.getMonth();
    
    // Determine current quarter (1-4)
    const quarter = Math.floor(month / 3) + 1;
    setCurrentQuarter(quarter);
    
    // Calculate days in the quarter
    const year = currentTime.getFullYear();
    const quarterStartMonth = (quarter - 1) * 3;
    const quarterEndMonth = quarterStartMonth + 3;
    
    // Calculate start and end dates of the quarter
    const quarterStart = new Date(year, quarterStartMonth, 1);
    const quarterEnd = new Date(year, quarterEndMonth, 0);
    
    // Calculate total milliseconds in the quarter
    const totalMillisInQuarter = quarterEnd - quarterStart;
    
    // Calculate milliseconds elapsed in the quarter
    const millisElapsed = currentTime - quarterStart;
    
    // Calculate progress percentage
    const progress = (millisElapsed / totalMillisInQuarter) * 100;
    setQuarterProgress(progress);
  }, [currentTime]);

  return (
    <div className="widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Quarter
      </h3>
      <div className="widget-content">
        <div className="date-display">Q{currentQuarter} {currentTime.getFullYear()}</div>
        
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${quarterProgress}%` }}
          ></div>
        </div>
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {quarterProgress.toFixed(1)}% of quarter complete
        </div>
      </div>
    </div>
  );
};

export default QuarterWidget;
