/**
 * Feed.jsx – Main event feed with sidebar filters and venue panel
 *
 * Owner: A
 * Mounts FilterChips (left sidebar), EventCard grid, VenuePanel (right slide-out).
 */

import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard';
import FilterChips from '../components/FilterChips';
import VenuePanel from '../components/VenuePanel';
import { getStatus, statusPriority } from '../lib/time';
import { getVenueById } from '../lib/storage';

export default function Feed({ events, now, savedIds, onToggleSave, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  // Sort: live → today → upcoming → ended, then by start time within group
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const sa = statusPriority(getStatus(a, now));
      const sb = statusPriority(getStatus(b, now));
      if (sa !== sb) return sa - sb;
      return a.start - b.start;
    });
  }, [events, now]);

  // Filter by category
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return sortedEvents;
    return sortedEvents.filter((e) => e.category === activeFilter);
  }, [sortedEvents, activeFilter]);

  // Category counts (for non-ended events)
  const counts = useMemo(() => {
    const c = { _total: 0 };
    for (const e of events) {
      if (getStatus(e, now) !== 'ended') {
        c._total += 1;
        c[e.category] = (c[e.category] || 0) + 1;
      }
    }
    return c;
  }, [events, now]);

  const selectedVenue = selectedVenueId ? getVenueById(selectedVenueId) : null;
  const liveCount = events.filter((e) => getStatus(e, now) === 'live').length;

  return (
    <div className="feed-layout">
      {/* Left sidebar: filters */}
      <aside className="feed-sidebar">
        <FilterChips active={activeFilter} onChange={setActiveFilter} counts={counts} />
        <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            {liveCount} live · {counts._total} active
          </div>
        </div>
      </aside>

      {/* Main feed area */}
      <main className="feed-main">
        <div className="feed-main__header">
          <h1>What's Happening</h1>
          <p>
            {liveCount > 0
              ? `🔴 ${liveCount} event${liveCount > 1 ? 's' : ''} happening right now`
              : 'No live events — check out what\'s coming up!'}
          </p>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="saved-page__empty">
            <div className="saved-page__empty-icon">🔍</div>
            <p>No events in this category</p>
          </div>
        ) : (
          <div className="event-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                now={now}
                isSaved={savedIds.includes(event.id)}
                onToggleSave={onToggleSave}
                onReach={(venueId) => setSelectedVenueId(venueId)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Right venue panel */}
      <VenuePanel venue={selectedVenue} onClose={() => setSelectedVenueId(null)} />
    </div>
  );
}
