import { useState, useEffect } from 'react';
import './LifeWidget.css';

const LifeWidget = ({ currentTime }) => {
  const [lifeProgress, setLifeProgress] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [lifeExpectancy, setLifeExpectancy] = useState(80);
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedBirthdate = localStorage.getItem('corporate-clock-birthdate');
    const savedLifeExpectancy = localStorage.getItem('corporate-clock-life-expectancy');
    
    if (savedBirthdate) {
      setBirthdate(savedBirthdate);
      setLifeExpectancy(savedLifeExpectancy ? parseInt(savedLifeExpectancy) : 80);
      setIsConfigured(true);
    }
  }, []);
  
  // Calculate life progress whenever currentTime, birthdate, or lifeExpectancy changes
  useEffect(() => {
    if (!birthdate) return;
    
    const birthDate = new Date(birthdate);
    const now = new Date(currentTime);
    
    // Calculate total milliseconds in expected lifespan
    const endDate = new Date(birthDate);
    endDate.setFullYear(birthDate.getFullYear() + parseInt(lifeExpectancy));
    
    const totalMillisInLife = endDate - birthDate;
    const millisElapsed = now - birthDate;
    
    const progress = (millisElapsed / totalMillisInLife) * 100;
    setLifeProgress(Math.max(0, Math.min(100, progress))); // Clamp between 0-100
  }, [currentTime, birthdate, lifeExpectancy]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage
    localStorage.setItem('corporate-clock-birthdate', birthdate);
    localStorage.setItem('corporate-clock-life-expectancy', lifeExpectancy.toString());
    
    setIsConfigured(true);
  };
  
  const resetConfig = () => {
    setBirthdate('');
    setLifeExpectancy(80);
    setIsConfigured(false);
    localStorage.removeItem('corporate-clock-birthdate');
    localStorage.removeItem('corporate-clock-life-expectancy');
  };

  return (
    <div className="widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.5 9H8.5L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
          <circle cx="12" cy="16" r="6" stroke="currentColor" strokeWidth="2"/>
        </svg>
        Life
      </h3>
      <div className="widget-content">
        {isConfigured ? (
          <>
            <div className="birthdate-display">
              {new Date(birthdate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
              <button 
                onClick={resetConfig}
                className="reset-button"
              >
                Reset
              </button>
            </div>
            
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${lifeProgress}%` }}
              ></div>
            </div>
            
            <div className="life-progress-text">
              {lifeProgress.toFixed(1)}% of estimated life complete
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="life-widget-form">
            <div className="form-group">
              <label htmlFor="birthdate" className="form-label">
                Your birthdate:
              </label>
              <input 
                type="date" 
                id="birthdate"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                required
                className="form-input-date"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lifeExpectancy" className="form-label">
                Life expectancy (years): {lifeExpectancy}
              </label>
              <input 
                type="range" 
                id="lifeExpectancy"
                min="50"
                max="120"
                value={lifeExpectancy}
                onChange={(e) => setLifeExpectancy(parseInt(e.target.value))}
                className="form-input-range"
              />
            </div>
            
            <button 
              type="submit"
              className="form-submit-button"
            >
              Save
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LifeWidget;
