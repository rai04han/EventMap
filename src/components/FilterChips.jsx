import React from 'react';

const CATEGORIES = ['All', 'Tech', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Other'];

const DOT_COLORS = {
  All: '#111111',
  Tech: '#3DB8FF',       // Sky Cyan
  Cultural: '#F24FBE',   // Acid Pink
  Sports: '#FF9A3C',     // Tangerine
  Workshop: '#FFE033',   // Sunbeam
  Seminar: '#B07CFF',    // Electric Violet
  Other: '#7D7760',      // Neutral
};

export default function FilterChips({ active, onChange, counts }) {
  return (
    <div className="filter-chips-bar" id="filter-chips-bar">
      <span className="filter-chips-bar__label">Filter by:</span>
      <div className="filter-chips-scroll">
        {CATEGORIES.map((cat) => {
          const count = cat === 'All' ? counts._total : (counts[cat] || 0);
          const isActive = active === cat;
          return (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              className={`filter-chip${isActive ? ' filter-chip--active' : ''}`}
              onClick={() => onChange(cat)}
              type="button"
            >
              <span
                className="filter-chip__dot"
                style={{ background: isActive ? '#FFFFFF' : DOT_COLORS[cat] }}
              />
              <span className="filter-chip__title">{cat}</span>
              <span className="filter-chip__count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
