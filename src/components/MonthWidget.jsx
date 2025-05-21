import { useState, useEffect, useCallback } from 'react';

const MonthWidget = ({ currentTime }) => {
  const [monthProgress, setMonthProgress] = useState(0);

  // Payday states
  const [paydayDate, setPaydayDate] = useState(null);
  const [paydayDaysLeft, setPaydayDaysLeft] = useState(''); // For 'X days left' display
  const [paydayFullCountdown, setPaydayFullCountdown] = useState(''); // For icon title
  const [paydayProgress, setPaydayProgress] = useState(0);
  const [isPaydayInputVisible, setIsPaydayInputVisible] = useState(false);
  const [inputPaydayDay, setInputPaydayDay] = useState('');

  useEffect(() => {
    const date = currentTime.getDate();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const totalSecondsInDay = hours * 3600 + minutes * 60 + seconds;
    const dayTotalSeconds = 24 * 3600;
    const currentDayProgress = totalSecondsInDay / dayTotalSeconds;
    const overallMonthProgress = ((date - 1 + currentDayProgress) / totalDaysInMonth) * 100;
    setMonthProgress(overallMonthProgress);
  }, [currentTime]);

  const calculatePaydayTimeRemaining = useCallback(() => {
    if (!paydayDate) {
      setPaydayDaysLeft('');
      setPaydayFullCountdown('');
      setPaydayProgress(0);
      return;
    }

    const now = new Date();
    let nextPaydayInstance = new Date(now.getFullYear(), now.getMonth(), paydayDate);

    if (now.getDate() > paydayDate || (now.getDate() === paydayDate && now.getTime() >= nextPaydayInstance.getTime())) {
      nextPaydayInstance.setMonth(nextPaydayInstance.getMonth() + 1);
    }
    if (nextPaydayInstance < now && now.getMonth() > nextPaydayInstance.getMonth()){
        nextPaydayInstance.setFullYear(now.getFullYear()+1);
    }
    
    const difference = nextPaydayInstance - now;

    if (difference <= 0) {
      setPaydayDaysLeft('🎉 Payday!'); // Or '0 days left'
      setPaydayFullCountdown('🎉 It\'s Payday!');
      setPaydayProgress(100);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setPaydayDaysLeft(`${days} day${days !== 1 ? 's' : ''} left`);
    setPaydayFullCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);

    let lastPaydayInstance = new Date(now.getFullYear(), now.getMonth(), paydayDate);
    if (now.getDate() <= paydayDate) { 
        lastPaydayInstance.setMonth(lastPaydayInstance.getMonth() -1 );
    } 
    if (lastPaydayInstance > now) {
        lastPaydayInstance.setMonth(lastPaydayInstance.getMonth() -1);
    }

    const totalTimeBetweenPaydays = nextPaydayInstance - lastPaydayInstance;
    const timeElapsedSinceLastPayday = now - lastPaydayInstance;
    
    if (totalTimeBetweenPaydays > 0) {
        const progress = Math.min(100, (timeElapsedSinceLastPayday / totalTimeBetweenPaydays) * 100);
        setPaydayProgress(progress);
    } else {
        setPaydayProgress(0);
    }

  }, [paydayDate, currentTime]);

  useEffect(() => {
    const storedPayday = localStorage.getItem('corpClockPaydayDate');
    if (storedPayday) {
      const day = parseInt(storedPayday, 10);
      if (!isNaN(day) && day >= 1 && day <= 31) {
        setPaydayDate(day);
        setInputPaydayDay(day.toString());
      }
    }
  }, []);

  useEffect(() => {
    if (paydayDate) {
      calculatePaydayTimeRemaining();
      const intervalId = setInterval(calculatePaydayTimeRemaining, 1000);
      return () => clearInterval(intervalId);
    }
  }, [paydayDate, calculatePaydayTimeRemaining]);

  const handleSetPayday = () => {
    const day = parseInt(inputPaydayDay, 10);
    if (day >= 1 && day <= 31) {
      setPaydayDate(day);
      localStorage.setItem('corpClockPaydayDate', day.toString());
      setIsPaydayInputVisible(false);
    } else {
      alert('Please enter a valid day of the month (1-31).');
    }
  };

  const togglePaydayInput = () => {
    setIsPaydayInputVisible(!isPaydayInputVisible);
    if (!isPaydayInputVisible && paydayDate) { // Recalculate on closing input if date is set
        calculatePaydayTimeRemaining();
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric'
    });
  };

  return (
    <div className="widget month-widget"> 
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
        
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '15px' }}>
          {monthProgress.toFixed(1)}% of month complete
        </div>

        {/* --- Payday Section --- */}
        <div className="payday-section">
          <div className="payday-header">
            <span 
              className="payday-icon" 
              onClick={togglePaydayInput}
              title={paydayDate ? `Payday: ${paydayDate}th. ${paydayFullCountdown}` : 'Set Payday Date'}
            >
              💰
            </span>
          </div>

          {isPaydayInputVisible && (
            <div className="payday-input-area">
              <input 
                type="number" 
                value={inputPaydayDay} 
                onChange={(e) => setInputPaydayDay(e.target.value)} 
                placeholder="Day (1-31)"
                min="1"
                max="31"
                className="payday-input"
              />
              <button onClick={handleSetPayday} className="payday-set-button">Set</button>
              <button onClick={togglePaydayInput} className="payday-cancel-button">Cancel</button>
            </div>
          )}

          {paydayDate && !isPaydayInputVisible && (
            <div className="payday-countdown-display">
              <div className="progress-container"> {/* Use generic class */}
                <div 
                  className="progress-bar"  /* Use generic class */
                  style={{ width: `${paydayProgress}%` }}
                ></div>
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                {paydayDaysLeft}
              </div>
            </div>
          )}
          {!paydayDate && !isPaydayInputVisible && (
            <p 
                className="payday-prompt-text"
                style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer', display: 'inline-block', marginLeft: '10px' }} 
                onClick={togglePaydayInput}
            >
              Set payday
            </p>
          )}
        </div>
        {/* --- End Payday Section --- */}
      </div>
    </div>
  );
};

export default MonthWidget;
