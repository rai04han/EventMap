/**
 * EventCard.jsx – Modern Campus-Tech Event Card
 *
 * Clean white background, thin border, soft hover shadow, clear metadata:
 * - Category badge (subtle tint)
 * - Title & Organizer
 * - Live status dot & Countdown
 * - Date, Time & Venue name (building)
 * - Short clamped description
 * - Action: "How to reach →" + Save button
 */

import React from 'react';
import { getStatus, countdown } from '../lib/time';
import { getVenueById } from '../lib/storage';

const CAT_PALETTE = {
  Tech: { bg: '#3DB8FF', text: '#111111' },       // Sky Cyan
  Cultural: { bg: '#F24FBE', text: '#111111' },   // Acid Pink
  Sports: { bg: '#FF9A3C', text: '#111111' },     // Tangerine
  Workshop: { bg: '#FFE033', text: '#111111' },   // Sunbeam
  Seminar: { bg: '#B07CFF', text: '#111111' },    // Electric Violet
  Other: { bg: '#E5E2E1', text: '#111111' },      // Surface Muted
};

function formatEventTime(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const isToday = new Date().toDateString() === startDate.toDateString();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const isTomorrow = tomorrow.toDateString() === startDate.toDateString();

  let datePrefix = startDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  if (isToday) datePrefix = 'Today';
  if (isTomorrow) datePrefix = 'Tomorrow';

  const startTime = startDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const endTime = endDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

  return `${datePrefix} · ${startTime} – ${endTime}`;
}

export default function EventCard({ event, now, isSaved, onToggleSave, onReach, venueName }) {
  const status = getStatus(event, now);
  const countdownText = countdown(event, now);
  const catStyle = CAT_PALETTE[event.category] || CAT_PALETTE.Other;

  const venue = event.venueId ? getVenueById(event.venueId) : null;
  const displayVenue = venueName || (venue ? `${venue.name} (${venue.building})` : 'Campus Venue');
  const timeFormatted = formatEventTime(event.start, event.end);

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
      {/* Top Header: Category & Save Bookmark */}
      <div className="event-card__top-row">
        <span
          className="event-card__category"
          style={{
            backgroundColor: catStyle.bg,
            color: catStyle.text,
          }}
        >
          {event.category}
        </span>

        <button
          type="button"
          className={`event-card__save-btn${isSaved ? ' event-card__save-btn--saved' : ''}`}
          onClick={() => onToggleSave(event.id)}
          title={isSaved ? 'Remove from saved' : 'Save event'}
          id={`save-${event.id}`}
          aria-label={isSaved ? 'Saved event' : 'Save event'}
        >
          {isSaved ? '★' : '☆'}
        </button>
      </div>

      {/* Title & Organizer */}
      <div className="event-card__title-group">
        <h3 className="event-card__title">{event.title}</h3>
        <span className="event-card__organizer">by {event.organizer}</span>
      </div>

      {/* Status & Countdown Badge Row */}
      <div className="event-card__status-banner">
        <StatusBadge status={status} />
        <span className="event-card__countdown">{countdownText}</span>
      </div>

      {/* Metadata: Time and Venue */}
      <div className="event-card__meta-list">
        <div className="event-card__meta-item">
          <span className="event-card__meta-icon" aria-hidden="true">📅</span>
          <span>{timeFormatted}</span>
        </div>
        <div className="event-card__meta-item">
          <span className="event-card__meta-icon" aria-hidden="true">📍</span>
          <span>{displayVenue}</span>
        </div>
      </div>

      {/* Short Description */}
      {event.description && (
        <p className="event-card__desc">{event.description}</p>
      )}

      {/* Footer: How to Reach */}
      <div className="event-card__footer">
        {status !== 'ended' ? (
          <button
            type="button"
            className="btn-reach"
            onClick={() => onReach(event.venueId)}
            id={`reach-${event.id}`}
          >
            <span>📍 How to reach</span>
            <span className="btn-reach__arrow">→</span>
          </button>
        ) : (
          <span className="event-card__ended-label">Event Completed</span>
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
