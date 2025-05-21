import React, { useState, useEffect, useCallback } from 'react';
import './PaydayWidget.css';

const PaydayWidget = () => {
  const [payday, setPayday] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputDay, setInputDay] = useState('');

  const calculateTimeRemaining = useCallback(() => {
    if (!payday) {
      setTimeRemaining('');
      return;
    }

    const now = new Date();
    let nextPayday = new Date(now.getFullYear(), now.getMonth(), payday);

    if (now.getDate() > payday) {
      // If current day is past this month's payday, calculate for next month
      nextPayday.setMonth(nextPayday.getMonth() + 1);
    } else if (now.getDate() === payday && now.getTime() > nextPayday.getTime()) {
      // If it's payday but past the time, calculate for next month
      nextPayday.setMonth(nextPayday.getMonth() + 1);
    }
    
    // If nextPayday is in the past (e.g. Dec payday when it's Jan), set year to next year
    if (nextPayday < now && now.getMonth() > nextPayday.getMonth()){
        nextPayday.setFullYear(nextPayday.getFullYear()+1);
    }

    const difference = nextPayday - now;

    if (difference <= 0) {
      // It's payday or just passed! Check for next month's.
      // This case should ideally be handled by the logic above, but as a fallback:
      setTimeRemaining('🎉 It\'s Payday!');
      // Or set up for next month's payday immediately
      // nextPayday.setMonth(nextPayday.getMonth() + 1);
      // calculate for this new nextPayday
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  }, [payday]);

  useEffect(() => {
    const storedPayday = localStorage.getItem('paydayDate');
    if (storedPayday) {
      const day = parseInt(storedPayday, 10);
      if (!isNaN(day) && day >=1 && day <= 31) {
        setPayday(day);
        setInputDay(day.toString());
      }
    }
  }, []);

  useEffect(() => {
    if (payday) {
      calculateTimeRemaining();
      const intervalId = setInterval(calculateTimeRemaining, 1000);
      return () => clearInterval(intervalId);
    }
  }, [payday, calculateTimeRemaining]);

  const handleSetPayday = () => {
    const day = parseInt(inputDay, 10);
    if (day >= 1 && day <= 31) {
      setPayday(day);
      localStorage.setItem('paydayDate', day.toString());
      setIsInputVisible(false);
    } else {
      alert('Please enter a valid day of the month (1-31).');
    }
  };

  const openPaydayInput = () => {
    setIsInputVisible(true);
  };

  return (
    <div className="widget payday-widget">
      <div className="widget-icon" onClick={!payday ? openPaydayInput : null} title={payday ? `Payday is on the ${payday}th` : 'Set Payday Date'}>
        💰
      </div>
      <div className="widget-content">
        {isInputVisible && !payday && (
          <div className="payday-input-container">
            <input 
              type="number" 
              value={inputDay} 
              onChange={(e) => setInputDay(e.target.value)} 
              placeholder="Day of month (1-31)"
              min="1"
              max="31"
            />
            <button onClick={handleSetPayday}>Set</button>
            <button onClick={() => setIsInputVisible(false)} className="cancel-button">Cancel</button>
          </div>
        )}
        {!isInputVisible && payday && (
          <div className="payday-countdown">
            <p className="widget-label">Until Payday ({payday}th)</p>
            <p className="widget-value">{timeRemaining}</p>
            <button onClick={openPaydayInput} className="change-payday-button">Change Day</button>
          </div>
        )}
        {!isInputVisible && !payday && (
          <div className="payday-setup">
            <p className="widget-label">Payday Tracker</p>
            <button onClick={openPaydayInput}>Set Payday Date</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaydayWidget;
