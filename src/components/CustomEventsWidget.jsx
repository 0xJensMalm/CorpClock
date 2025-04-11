import React, { useState, useEffect } from 'react';
import './CustomEventsWidget.css';

// Helper function to calculate time difference
const calculateTimeLeft = (deadline, now) => {
  const difference = new Date(deadline) - now;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  } else {
    return null; // Deadline passed
  }

  // Format the output string
  let formatted = '';
  if (timeLeft.days > 0) formatted += `${timeLeft.days}d `;
  if (timeLeft.hours > 0 || timeLeft.days > 0) formatted += `${timeLeft.hours}h `;
  if (timeLeft.minutes > 0 || timeLeft.hours > 0 || timeLeft.days > 0) formatted += `${timeLeft.minutes}m `;
  formatted += `${timeLeft.seconds}s`;

  return formatted.trim() || '0s'; // Ensure we show something if less than 1s
};

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
        {events.length === 0 && !showForm && (
          <p className="no-events-message">Click the '+' to add an event.</p>
        )}

        <ul className="event-list">
          {events.map(event => {
            const timeLeft = calculateTimeLeft(event.deadline, currentTime);
            return (
              <li key={event.id} className="event-item">
                <div className="event-details">
                  <span className="event-name">{event.name}</span>
                  <span className={`event-countdown ${!timeLeft ? 'expired' : ''}`}>
                    {timeLeft ? timeLeft : 'Expired'}
                  </span>
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
