/**
 * Saved.jsx – "My Events" page showing saved/bookmarked events
 *
 * Owner: C
 */

import React from 'react';
import EventCard from '../components/EventCard';

export default function Saved({ events, now, savedIds, onToggleSave, onNavigate }) {
  const savedEvents = events.filter((e) => savedIds.includes(e.id));

  return (
    <div className="saved-page">
      <h1>My Events</h1>

      {savedEvents.length === 0 ? (
        <div className="saved-page__empty">
          <div className="saved-page__empty-icon">⭐</div>
          <p>No saved events yet</p>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Tap the star on any event card to save it here
          </span>
        </div>
      ) : (
        <div className="event-grid">
          {savedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              now={now}
              isSaved={true}
              onToggleSave={onToggleSave}
              onReach={(venueId) => onNavigate('feed', venueId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
