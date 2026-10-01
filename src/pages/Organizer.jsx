/**
 * Organizer.jsx – PIN-gated event creation page
 *
 * Owner: C
 * Hardcoded PIN: 1234
 * Hidden "Reset demo data" button at the bottom.
 */

import React, { useState } from 'react';
import EventForm from '../components/EventForm';
import { getVenues, addEvent, resetDemo } from '../lib/storage';

export default function Organizer({ onEventAdded }) {
  const [pin, setPin] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  const venues = getVenues();

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setUnlocked(true);
      setError('');
    } else {
      setError('Wrong PIN. Try again.');
      setPin('');
    }
  };

  const handleSubmit = (eventData) => {
    addEvent(eventData);
    onEventAdded();
    setToast('Event posted! Switch to Feed to see it.');
    setTimeout(() => setToast(null), 3000);
  };

  const handleReset = () => {
    resetDemo();
    onEventAdded(); // refresh parent state
    setToast('Demo data reset!');
    setTimeout(() => setToast(null), 3000);
  };

  if (!unlocked) {
    return (
      <div className="organizer-page">
        <form className="pin-gate" onSubmit={handlePinSubmit}>
          <div className="pin-gate__icon">🔒</div>
          <h2>Organizer Access</h2>
          <p>Enter the organizer PIN to post events</p>
          <input
            className="pin-gate__input"
            id="pin-input"
            type="password"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            autoFocus
          />
          {error && <span className="pin-gate__error">{error}</span>}
          <button type="submit" className="btn btn--primary" id="pin-submit">
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="organizer-page">
      <h1>Post an Event</h1>
      <EventForm venues={venues} onSubmit={handleSubmit} />

      <div className="reset-btn-area">
        <button className="btn btn--danger btn--small" onClick={handleReset} id="reset-demo-btn">
          🔄 Reset Demo Data
        </button>
      </div>

      {toast && (
        <div className="toast" id="organizer-toast">
          <span className="toast__icon">✅</span>
          {toast}
        </div>
      )}
    </div>
  );
}
