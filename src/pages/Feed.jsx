/**
 * Feed.jsx – Modern Campus-Tech Event Discovery Dashboard
 *
 * Structure:
 * 1. Compact Hero with greeting, tagline, and modern search bar
 * 2. Campus Activity summary bar (Live, Today, Active Venues)
 * 3. Category Filter Chips (All, Tech, Workshop, Cultural, Sports, Seminar, Other)
 * 4. LIVE NOW Section (prominent, 2-3 column responsive grid)
 * 5. Main Content:
 *    - Left: Upcoming Events Grid + Recently Ended Section
 *    - Right: Campus Map Interactive Preview ("Find Your Way") + Popular Venues List
 * 6. Polished Empty States
 * 7. Slide-out VenuePanel with walking route from Main Gate
 */

import React, { useState, useMemo } from 'react';
import EventCard from '../components/EventCard';
import FilterChips from '../components/FilterChips';
import VenuePanel from '../components/VenuePanel';
import CampusMap from '../components/CampusMap';
import { getStatus, statusPriority } from '../lib/time';
import { getVenueById, getVenues } from '../lib/storage';

export default function Feed({ events, now, savedIds, onToggleSave, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedVenueId, setSelectedVenueId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const venues = getVenues();

  // Dynamic time-of-day greeting
  const greeting = useMemo(() => {
    const hr = new Date(now).getHours();
    if (hr < 12) return 'Good morning';
    if (hr < 17) return 'Good afternoon';
    return 'Good evening';
  }, [now]);

  // Sort: live → today → upcoming → ended, then by start time within group
  const sortedEvents = useMemo(() => {
    return [...events].sort((a, b) => {
      const sa = statusPriority(getStatus(a, now));
      const sb = statusPriority(getStatus(b, now));
      if (sa !== sb) return sa - sb;
      return a.start - b.start;
    });
  }, [events, now]);

  // Combined Category Filter + Multi-Field Search Query Filter
  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return sortedEvents.filter((event) => {
      // 1. Category filter
      if (activeFilter !== 'All' && event.category !== activeFilter) {
        return false;
      }

      // 2. Search query filter
      if (!q) return true;

      const venue = event.venueId ? getVenueById(event.venueId) : null;
      const titleMatch = Boolean(event.title && event.title.toLowerCase().includes(q));
      const venueNameMatch = Boolean(venue?.name && venue.name.toLowerCase().includes(q));
      const venueBuildingMatch = Boolean(venue?.building && venue.building.toLowerCase().includes(q));

      const cat = (event.category || '').toLowerCase();
      const categoryMatch = Boolean(
        cat && (
          cat.includes(q) ||
          (cat === 'tech' && 'technical'.includes(q)) ||
          (q === 'technical' && cat === 'tech') ||
          (q.length >= 4 && q.includes(cat))
        )
      );

      const organizerMatch = Boolean(event.organizer && event.organizer.toLowerCase().includes(q));
      const descMatch = Boolean(event.description && event.description.toLowerCase().includes(q));

      return (
        titleMatch ||
        venueNameMatch ||
        venueBuildingMatch ||
        categoryMatch ||
        organizerMatch ||
        descMatch
      );
    });
  }, [sortedEvents, activeFilter, searchQuery]);

  // Group events by status for clear separation
  const liveEvents = useMemo(() => {
    return filteredEvents.filter((e) => getStatus(e, now) === 'live');
  }, [filteredEvents, now]);

  const upcomingEvents = useMemo(() => {
    return filteredEvents.filter((e) => {
      const st = getStatus(e, now);
      return st === 'today' || st === 'upcoming';
    });
  }, [filteredEvents, now]);

  const endedEvents = useMemo(() => {
    return filteredEvents.filter((e) => getStatus(e, now) === 'ended');
  }, [filteredEvents, now]);

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

  // Active venues with event count
  const venueStats = useMemo(() => {
    const map = {};
    for (const v of venues) {
      map[v.id] = { venue: v, count: 0 };
    }
    for (const e of events) {
      if (getStatus(e, now) !== 'ended' && map[e.venueId]) {
        map[e.venueId].count += 1;
      }
    }
    return Object.values(map).sort((a, b) => b.count - a.count);
  }, [events, venues, now]);

  const activeVenuesCount = useMemo(() => {
    return venueStats.filter((v) => v.count > 0).length;
  }, [venueStats]);

  const todayCount = useMemo(() => {
    return events.filter((e) => getStatus(e, now) === 'today').length;
  }, [events, now]);

  const liveTotal = useMemo(() => {
    return events.filter((e) => getStatus(e, now) === 'live').length;
  }, [events, now]);

  const selectedVenue = selectedVenueId ? getVenueById(selectedVenueId) : null;

  const handleClearFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
  };

  return (
    <div className="feed-page" id="feed-page">
      {/* ── 1. Hero & Activity Summary Section ── */}
      <section className="feed-hero-section">
        <div className="feed-hero-card">
          <div className="feed-hero-card__badge">
            <span className="live-dot-pulse" />
            <span>CAMPUS LIVE DISCOVERY</span>
          </div>
          <h1 className="feed-hero-card__title">
            {greeting}, Student
          </h1>
          <p className="feed-hero-card__subtitle">
            Know what's happening on campus. Discover live events, upcoming workshops, and exactly where they're happening.
          </p>

          {/* Search Bar */}
          <div className="feed-search-bar" id="feed-search-bar">
            <span className="feed-search-bar__icon" aria-hidden="true">🔍</span>
            <input
              type="text"
              id="event-search-input"
              className="feed-search-bar__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder="Search events, venues, categories or organizers..."
              aria-label="Search events, venues, categories or organizers"
            />
            {searchQuery && (
              <button
                type="button"
                id="clear-search-btn"
                className="feed-search-bar__clear"
                onClick={() => setSearchQuery('')}
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {searchQuery.trim() && (
            <div className="feed-search-status" id="feed-search-status">
              <span>
                Showing <strong>{filteredEvents.length}</strong> matching {filteredEvents.length === 1 ? 'event' : 'events'} for &ldquo;<strong>{searchQuery.trim()}</strong>&rdquo;
                {activeFilter !== 'All' && <span> in <em>{activeFilter}</em></span>}
              </span>
              <button
                type="button"
                className="feed-search-status__reset"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* ── 2. Campus Activity Info Panel ── */}
        <div className="campus-activity-panel">
          <div className="campus-activity-panel__header">
            <h3>CAMPUS ACTIVITY</h3>
            <span className="campus-activity-panel__status-pill">LIVE NOW</span>
          </div>

          <div className="campus-activity-panel__list">
            <div className="activity-item">
              <span className="activity-item__dot activity-item__dot--live" />
              <div className="activity-item__content">
                <strong>{liveTotal} Live Now</strong>
                <span>Ongoing right now</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-item__dot activity-item__dot--today" />
              <div className="activity-item__content">
                <strong>{todayCount} Starting Today</strong>
                <span>Upcoming schedule</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-item__dot activity-item__dot--venues" />
              <div className="activity-item__content">
                <strong>{activeVenuesCount} Venues Active</strong>
                <span>Across campus blocks</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn--secondary btn--small btn--full-width"
            onClick={() => onNavigate('venues')}
          >
            Explore Campus Map →
          </button>
        </div>
      </section>

      {/* ── 3. Category Filter Chips Bar ── */}
      <section className="feed-filters-section">
        <FilterChips active={activeFilter} onChange={setActiveFilter} counts={counts} />
      </section>

      {/* ── 4. LIVE NOW Section ── */}
      {liveEvents.length > 0 && (
        <section className="feed-live-section" id="live-events-section">
          <div className="section-title-bar">
            <div className="section-title-bar__left">
              <span className="live-pulse-badge">
                <span className="live-pulse-badge__dot" />
                LIVE NOW
              </span>
              <h2 className="section-title-bar__heading">Happening on campus right now</h2>
            </div>
            <span className="section-title-bar__count">{liveEvents.length} active</span>
          </div>

          <div className="live-events-grid">
            {liveEvents.map((event) => (
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
        </section>
      )}

      {/* ── 5. Main Feed Split: Upcoming Events (Left) + Map Preview (Right) ── */}
      <div className="feed-main-split">
        {/* Left Column: Upcoming + Ended Events */}
        <div className="feed-events-column">
          <section className="feed-upcoming-section">
            <div className="section-title-bar">
              <div className="section-title-bar__left">
                <h2 className="section-title-bar__heading">UPCOMING EVENTS</h2>
                <span className="section-title-bar__sub">What's coming up on campus</span>
              </div>
              <span className="section-title-bar__count">{upcomingEvents.length} events</span>
            </div>

            {/* Zero results state */}
            {upcomingEvents.length === 0 && liveEvents.length === 0 && endedEvents.length === 0 ? (
              <div className="search-empty-state" id="search-empty-state">
                <div className="search-empty-state__icon">🔍</div>
                <h3>No events found</h3>
                <p>Try searching for another event, venue, category, or organizer.</p>
                <button
                  type="button"
                  className="btn btn--primary btn--small"
                  onClick={handleClearFilters}
                  id="search-empty-clear-btn"
                >
                  Clear Filters & Search
                </button>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="empty-sub-state">
                <p>No upcoming events matching filter &ldquo;{activeFilter}&rdquo;</p>
              </div>
            ) : (
              <div className="event-grid">
                {upcomingEvents.map((event) => (
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
          </section>

          {/* Ended Events Section */}
          {endedEvents.length > 0 && (
            <section className="feed-ended-section">
              <div className="section-title-bar section-title-bar--muted">
                <div className="section-title-bar__left">
                  <h2 className="section-title-bar__heading">RECENTLY ENDED</h2>
                  <span className="section-title-bar__sub">Event recaps from earlier today</span>
                </div>
                <span className="section-title-bar__count">{endedEvents.length} events</span>
              </div>

              <div className="event-grid event-grid--ended">
                {endedEvents.map((event) => (
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
            </section>
          )}
        </div>

        {/* Right Column: Campus Map Preview & Popular Venues */}
        <aside className="feed-side-column">
          {/* Map Preview Widget */}
          <div className="campus-map-preview-card">
            <div className="campus-map-preview-card__header">
              <div>
                <span className="campus-map-preview-card__tag">FIND YOUR WAY</span>
                <h3 className="campus-map-preview-card__title">Campus Map</h3>
              </div>
              <button
                type="button"
                className="btn btn--secondary btn--small"
                onClick={() => onNavigate('venues')}
              >
                Full Map →
              </button>
            </div>

            <p className="campus-map-preview-card__desc">
              Walking routes from the Main Gate to all campus venues.
            </p>

            <div
              className="campus-map-preview-card__map-wrap"
              onClick={() => onNavigate('venues')}
              title="Click to view interactive campus map"
            >
              <CampusMap pinX={50} pinY={35} venueName="Admin Block" venueId="v1" />
              <div className="campus-map-preview-card__cta-overlay">
                <span>🧭 Click to view full campus map & walking routes</span>
              </div>
            </div>
          </div>

          {/* Popular Venues Widget */}
          <div className="popular-venues-panel">
            <div className="popular-venues-panel__header">
              <h4>POPULAR VENUES</h4>
              <span>Today's active locations</span>
            </div>

            <div className="popular-venues-panel__list">
              {venueStats.slice(0, 5).map(({ venue, count }) => (
                <div
                  key={venue.id}
                  className="popular-venue-card"
                  onClick={() => setSelectedVenueId(venue.id)}
                  title={`View directions to ${venue.name}`}
                >
                  <div className="popular-venue-card__info">
                    <span className="popular-venue-card__name">📍 {venue.name}</span>
                    <span className="popular-venue-card__building">
                      {venue.building} · {venue.floor}
                    </span>
                  </div>
                  <span className="popular-venue-card__badge">
                    {count} {count === 1 ? 'event' : 'events'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* ── 6. Slide-out Venue Navigation Panel ── */}
      <VenuePanel venue={selectedVenue} onClose={() => setSelectedVenueId(null)} />
    </div>
  );
}
