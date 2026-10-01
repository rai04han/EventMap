import React from 'react';

const CATEGORIES = ['All', 'Tech', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Other'];

const DOT_COLORS = {
  All: '#6c5ce7',
  Tech: '#6c5ce7',
  Cultural: '#e84393',
  Sports: '#00b894',
  Workshop: '#f39c12',
  Seminar: '#0984e3',
  Other: '#636e72',
};

export default function FilterChips({ active, onChange, counts }) {
  return (
    <div>
      <div className="feed-sidebar__title">Categories</div>
      {CATEGORIES.map((cat) => {
        const count = cat === 'All' ? counts._total : (counts[cat] || 0);
        return (
          <button
            key={cat}
            id={`filter-${cat.toLowerCase()}`}
            className={`filter-chip${active === cat ? ' filter-chip--active' : ''}`}
            onClick={() => onChange(cat)}
          >
            <span
              className="filter-chip__dot"
              style={{ background: DOT_COLORS[cat] }}
            />
            {cat}
            <span className="filter-chip__count">{count}</span>
          </button>
        );
      })}
    </div>
  );
}
