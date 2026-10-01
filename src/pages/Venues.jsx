/**
 * Venues.jsx – Browse all campus venues
 *
 * Owner: B
 */

import React, { useState } from 'react';
import VenueCard from '../components/VenueCard';
import VenuePanel from '../components/VenuePanel';
import { getVenues } from '../lib/storage';

export default function Venues() {
  const venues = getVenues();
  const [selectedVenue, setSelectedVenue] = useState(null);

  return (
    <div className="venues-page">
      <h1>Campus Venues</h1>
      <div className="venues-grid">
        {venues.map((v) => (
          <VenueCard key={v.id} venue={v} onClick={() => setSelectedVenue(v)} />
        ))}
      </div>

      <VenuePanel venue={selectedVenue} onClose={() => setSelectedVenue(null)} />
    </div>
  );
}
