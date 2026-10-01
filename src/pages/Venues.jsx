/**
 * Venues.jsx – Browse all campus venues
 *
 * Owner: B
 */

import React, { useState } from 'react';
import VenueCard from '../components/VenueCard';
import VenuePanel from '../components/VenuePanel';
import CampusMap from '../components/CampusMap';
import { getVenues } from '../lib/storage';

export default function Venues() {
  const venues = getVenues();
  const [selectedVenue, setSelectedVenue] = useState(null);

  return (
    <div className="venues-page">
      <div className="venues-page__header">
        <h1>Campus Venues</h1>
        <p className="venues-page__subtitle">
          📍 {venues.length} venues across campus · Click any venue to see its location on the map
        </p>
      </div>

      {/* Full-width map overview */}
      <div className="venues-page__map-overview">
        <CampusMap
          pinX={selectedVenue ? selectedVenue.mapX : null}
          pinY={selectedVenue ? selectedVenue.mapY : null}
          venueName={selectedVenue ? selectedVenue.name : null}
        />
      </div>

      {/* Venue cards grid */}
      <div className="venues-grid">
        {venues.map((v, i) => (
          <VenueCard
            key={v.id}
            venue={v}
            onClick={() => setSelectedVenue(v)}
          />
        ))}
      </div>

      {/* Side panel for detailed view */}
      <VenuePanel venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </div>
  );
}
