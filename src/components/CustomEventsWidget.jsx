import React, { useState, useEffect } from 'react';
import './CustomEventsWidget.css';

// Helper function to calculate working days left (Mon-Fri)
const calculateWorkingDaysLeft = (deadline, now) => {
  const deadlineDate = new Date(deadline);
  // Clone 'now' and set to start of today to avoid time-of-day issues
  const currentDayStart = new Date(now);
  currentDayStart.setHours(0, 0, 0, 0);
  
  // Set deadline to end of day for inclusion
  deadlineDate.setHours(23, 59, 59, 999);

  if (deadlineDate <= currentDayStart) {
    return 0; // Deadline is today or passed
  }

  let count = 0;
  const tempDate = new Date(currentDayStart);

  // Iterate from tomorrow up to the deadline date
  while (tempDate < deadlineDate) {
      tempDate.setDate(tempDate.getDate() + 1);
      const dayOfWeek = tempDate.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
          count++;
      }
      // Safety break for infinite loops, though unlikely with date logic
      if (count > 365 * 5) break; 
  }

  return count;
};

// Helper function to calculate time difference (Keep for potential future use or remove)
/*
const calculateTimeLeft = (deadline, now) => {
{{ ... }}
  return formatted.trim() || '0s'; // Ensure we show something if less than 1s
};
*/

const CustomEventsWidget = ({ currentTime }) => {
  const MAX_EVENTS = 5;
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDeadline, setNewEventDeadline] = useState('');

  // Load events from localStorage on mount
  useEffect(() => {
    try {
      const savedEvents = localStorage.getItem('corpclock-custom-events');
      if (savedEvents) {
        setEvents(JSON.parse(savedEvents));
      }
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      // Optionally clear corrupted data
      // localStorage.removeItem('corpclock-custom-events');
    }
  }, []);

  // Save events to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('corpclock-custom-events', JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEventName || !newEventDeadline || events.length >= MAX_EVENTS) {
      // Basic validation or limit reached
      // TODO: Add user feedback (e.g., disable button, show message)
      return;
    }

    const newEvent = {
      id: Date.now(), // Simple unique ID
      name: newEventName,
      deadline: newEventDeadline,
    };

    setEvents([...events, newEvent]);
    setNewEventName('');
    setNewEventDeadline('');
    setShowForm(false);
  };

  const handleDeleteEvent = (idToDelete) => {
    setEvents(events.filter(event => event.id !== idToDelete));
  };

  const canAddMoreEvents = events.length < MAX_EVENTS;

  return (
    <div className="widget custom-events-widget">
      <h3 className="widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Custom Events
      </h3>
      {canAddMoreEvents && (
          <button
            className="add-event-button"
            onClick={() => setShowForm(true)}
            title="Add Custom Event"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
      )}
      <div className="widget-content">
        {events.length === 0 ? (
          <p className="no-events-message">No custom events added yet.</p>
        ) : (
          <ul className="event-list">
            {events.map(event => {
              const workingDaysLeft = calculateWorkingDaysLeft(event.deadline, currentTime);
              const isExpired = workingDaysLeft <= 0;

              return (
                <li key={event.id} className={`event-item ${isExpired ? 'expired' : ''}`}>
                  <div className="event-details">
                    <span className="event-name">{event.name}</span>
                    {/* Replace text countdown with dots */}
                    <div className="working-days-container">
                      {isExpired ? (
                        <span className="expired-text">Expired</span>
                      ) : (
                        // Render dots for remaining working days
                        Array.from({ length: workingDaysLeft }).map((_, index) => (
                          <div key={index} className="working-day-dot" title={`${workingDaysLeft} working day(s) left`}></div>
                        ))
                      )}
                    </div>
                  </div>
                  <button
                    className="delete-event-button"
                    onClick={() => handleDeleteEvent(event.id)}
                    title="Delete Event"
                  >
                      &times; {/* Simple 'x' character */}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {events.length > 0 && (
          <div className="working-days-legend">1 dot = 1 working day</div>
        )}
        {showForm && (
          <div className="form-overlay">
            <form onSubmit={handleAddEvent} className="add-event-form">
              <h4>Add New Event</h4>
              <div className="form-group">
                <label htmlFor="eventName">Event Name:</label>
                <input
                  type="text"
                  id="eventName"
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                  required
                  maxLength="50" // Prevent overly long names
                />
              </div>
              <div className="form-group">
                <label htmlFor="eventDeadline">Deadline:</label>
                <input
                  type="datetime-local"
                  id="eventDeadline"
                  value={newEventDeadline}
                  onChange={(e) => setNewEventDeadline(e.target.value)}
                  required
                />
              </div>
              <div className="form-actions">
                 <button type="button" onClick={() => setShowForm(false)} className="cancel-button">
                   Cancel
                 </button>
                 <button type="submit" className="confirm-button">
                   Confirm
                 </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomEventsWidget;
