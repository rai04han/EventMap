/**
 * VenueCard.jsx – Card shown on the Venues page
 *
 * Owner: B
 * Props: venue, onClick
 */

import React from 'react';

const BUILDING_ICONS = {
  'Admin Block': '🏛️',
  'Academic Block 1': '📖',
  'Student Centre': '🎓',
  'Tech Wing': '💻',
  'Central Quadrangle': '🎤',
  'Outdoor Facilities': '⚽',
};

export default function VenueCard({ venue, onClick }) {
  const icon = BUILDING_ICONS[venue.building] || '📍';

  return (
    <article className="venue-card fade-in" onClick={onClick} id={`venue-card-${venue.id}`}>
      <div className="venue-card__icon-row">
        <span className="venue-card__icon">{icon}</span>
        <div className="venue-card__badge">{venue.floor}</div>
      </div>
      <h3 className="venue-card__name">{venue.name}</h3>
      <span className="venue-card__building">{venue.building}</span>
      <div className="venue-card__meta">
        <span>🏢 {venue.floor}</span>
        <span className="venue-card__meta-sep">·</span>
        <span>🧭 {venue.landmark}</span>
      </div>
      <div className="venue-card__action">
        <span>View on map →</span>
      </div>
    </article>
  );
}
