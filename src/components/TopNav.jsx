import React from 'react';

const TABS = [
  { id: 'feed', label: 'Feed', hasLiveDot: true },
  { id: 'venues', label: 'Venues' },
  { id: 'organizer', label: 'Organizer' },
  { id: 'saved', label: 'My Events' },
];

export default function TopNav({ activeTab, onNavigate, liveCount }) {
  return (
    <nav className="topnav" id="topnav">
      <div className="topnav__brand">
        <div className="topnav__brand-icon">⚡</div>
        <span>CampusPulse</span>
      </div>
      <div className="topnav__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`topnav__tab${activeTab === tab.id ? ' topnav__tab--active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            {tab.label}
            {tab.hasLiveDot && liveCount > 0 && (
              <span className="topnav__live-dot" title={`${liveCount} live now`} />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
