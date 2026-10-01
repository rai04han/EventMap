/**
 * App.jsx – Root component
 *
 * Owner: A (only A edits this file)
 *
 * Responsibilities:
 * - Tab state management (no router)
 * - 30-second tick for live status refresh
 * - navigate(tab, venueId?) passed to pages as onNavigate
 * - Loads events + saved state from storage
 */

import React, { useState, useEffect, useCallback } from 'react';
import TopNav from './components/TopNav';
import Feed from './pages/Feed';
import Venues from './pages/Venues';
import Organizer from './pages/Organizer';
import Saved from './pages/Saved';
import { getEvents, getSaved, toggleSaved } from './lib/storage';
import { getStatus } from './lib/time';

export default function App() {
  // ── Tab state ───────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('feed');

  // ── Clock tick (30 s) for status refresh ────────────────
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  // ── Data state ──────────────────────────────────────────
  const [events, setEvents] = useState(() => getEvents());
  const [savedIds, setSavedIds] = useState(() => getSaved());

  // Refresh from storage (called after organizer posts or resets)
  const refreshEvents = useCallback(() => {
    setEvents(getEvents());
    setSavedIds(getSaved());
  }, []);

  const handleToggleSave = useCallback(
    (id) => {
      const updated = toggleSaved(id);
      setSavedIds([...updated]);
    },
    []
  );

  // ── Navigation ──────────────────────────────────────────
  const navigate = useCallback((tab, venueId) => {
    setActiveTab(tab);
    // venueId is passed through but handled by the Feed page internally
  }, []);

  // ── Live count for nav dot ──────────────────────────────
  const liveCount = events.filter((e) => getStatus(e, now) === 'live').length;

  // ── Render active page ──────────────────────────────────
  const renderPage = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <Feed
            events={events}
            now={now}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onNavigate={navigate}
          />
        );
      case 'venues':
        return <Venues />;
      case 'organizer':
        return <Organizer onEventAdded={refreshEvents} />;
      case 'saved':
        return (
          <Saved
            events={events}
            now={now}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onNavigate={navigate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <TopNav activeTab={activeTab} onNavigate={navigate} liveCount={liveCount} />
      <div className="page">{renderPage()}</div>
    </>
  );
}
