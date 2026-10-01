import React from 'react';
import { getStatus, countdown } from '../lib/time';

const CAT_STYLES = {
  Tech:     { '--cat-bg': 'rgba(108,92,231,0.12)',  '--cat-color': '#6c5ce7' },
  Cultural: { '--cat-bg': 'rgba(232,67,147,0.12)',  '--cat-color': '#e84393' },
  Sports:   { '--cat-bg': 'rgba(0,184,148,0.12)',   '--cat-color': '#00b894' },
  Workshop: { '--cat-bg': 'rgba(253,203,110,0.15)', '--cat-color': '#f39c12' },
  Seminar:  { '--cat-bg': 'rgba(9,132,227,0.12)',   '--cat-color': '#0984e3' },
  Other:    { '--cat-bg': 'rgba(99,110,114,0.12)',   '--cat-color': '#636e72' },
};

export default function EventCard({ event, now, isSaved, onToggleSave, onReach, venueName }) {
  const status = getStatus(event, now);
  const countdownText = countdown(event, now);
  const catStyle = CAT_STYLES[event.category] || CAT_STYLES.Other;

  const cardClass = [
    'event-card',
    'fade-in',
    status === 'live' && 'event-card--live',
    status === 'ended' && 'event-card--ended',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClass} id={`event-${event.id}`}>
      {/* Top row: category + save */}
      <div className="event-card__top-row">
        <span className="event-card__category" style={catStyle}>
          {event.category}
        </span>
        <button
          className={`event-card__save-btn${isSaved ? ' event-card__save-btn--saved' : ''}`}
          onClick={() => onToggleSave(event.id)}
          title={isSaved ? 'Unsave' : 'Save'}
          id={`save-${event.id}`}
        >
          {isSaved ? '★' : '☆'}
        </button>
      </div>

      {/* Title & organizer */}
      <h3 className="event-card__title">{event.title}</h3>
      <span className="event-card__organizer">by {event.organizer}</span>

      {/* Description */}
      {event.description && (
        <p className="event-card__desc">{event.description}</p>
      )}

      {/* Footer: status + countdown + reach */}
      <div className="event-card__footer">
        <div className="event-card__status-row">
          <StatusBadge status={status} />
          <span className="event-card__countdown">{countdownText}</span>
        </div>
        {status !== 'ended' && (
          <button
            className="btn-reach"
            onClick={() => onReach(event.venueId)}
            id={`reach-${event.id}`}
          >
            📍 How to reach
          </button>
        )}
      </div>
    </article>
  );
}

function StatusBadge({ status }) {
  const labels = {
    live: 'Live Now',
    today: 'Today',
    upcoming: 'Upcoming',
    ended: 'Ended',
  };

  return (
    <span className={`status-badge status-badge--${status}`}>
      {status === 'live' && <span className="status-badge__dot" />}
      {labels[status]}
    </span>
  );
}
