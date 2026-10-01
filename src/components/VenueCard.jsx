/**
 * VenueCard.jsx – Card shown on the Venues page
 *
 * Owner: B
 * Props: venue, onClick
 */

import React from 'react';

export default function VenueCard({ venue, onClick }) {
  return (
    <article className="venue-card fade-in" onClick={onClick} id={`venue-card-${venue.id}`}>
      <h3 className="venue-card__name">📍 {venue.name}</h3>
      <span className="venue-card__building">{venue.building}</span>
      <div className="venue-card__meta">
        <span>🏢 {venue.floor}</span>
        <span>🧭 {venue.landmark}</span>
      </div>
    </article>
  );
}
