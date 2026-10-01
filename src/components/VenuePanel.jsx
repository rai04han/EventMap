/**
 * VenuePanel.jsx – Right-hand side panel with venue details + map + pin
 *
 * Owner: B
 * Props: venue (object or null), onClose
 */

import React from 'react';
import CampusMap from './CampusMap';

export default function VenuePanel({ venue, onClose }) {
  if (!venue) return null;

  return (
    <aside className={`venue-panel${venue ? ' venue-panel--open' : ''}`} id="venue-panel">
      <div className="venue-panel__header">
        <h2>📍 {venue.name}</h2>
        <button className="venue-panel__close" onClick={onClose} id="venue-panel-close" title="Close panel">
          ✕
        </button>
      </div>
      <div className="venue-panel__body">
        {/* Map */}
        <div className="venue-panel__map-container">
          <CampusMap pinX={venue.mapX} pinY={venue.mapY} venueName={venue.name} />
        </div>

        {/* Info grid */}
        <div className="venue-panel__info-grid">
          <div className="venue-panel__info-item">
            <span>🏢 Building</span>
            <span>{venue.building}</span>
          </div>
          <div className="venue-panel__info-item">
            <span>🏗️ Floor</span>
            <span>{venue.floor}</span>
          </div>
          <div className="venue-panel__info-item venue-panel__info-item--full">
            <span>🧭 Landmark</span>
            <span>{venue.landmark}</span>
          </div>
        </div>

        {/* Directions */}
        <div className="venue-panel__directions">
          <h3>🚶 Directions from Main Gate</h3>
          <p>{venue.directions}</p>
        </div>
      </div>
    </aside>
  );
}
