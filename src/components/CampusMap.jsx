/**
 * CampusMap.jsx – Schematic SVG campus map with animated pin
 *
 * Owner: B
 * Props: pinX (0-100%), pinY (0-100%), venueName
 */

import React from 'react';

export default function CampusMap({ pinX, pinY, venueName }) {
  return (
    <div className="campus-map">
      <svg
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Background */}
        <rect width="800" height="500" fill="#151b2b" rx="8" />

        {/* Grid lines */}
        {Array.from({ length: 16 }, (_, i) => (
          <line key={`vg-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#1e2535" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`hg-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#1e2535" strokeWidth="0.5" />
        ))}

        {/* Main Gate */}
        <rect x="370" y="460" width="60" height="20" rx="3" fill="#3a4256" />
        <text x="400" y="474" textAnchor="middle" fill="#8b92a5" fontSize="8" fontFamily="Inter, sans-serif">MAIN GATE</text>

        {/* Central pathway */}
        <line x1="400" y1="460" x2="400" y2="100" stroke="#2a3346" strokeWidth="4" strokeDasharray="6 4" />

        {/* Admin Block */}
        <rect x="350" y="120" width="100" height="60" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="400" y="155" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Admin Block</text>

        {/* Academic Block 1 */}
        <rect x="160" y="200" width="110" height="70" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="215" y="240" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Academic</text>
        <text x="215" y="252" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Block 1</text>

        {/* Student Centre */}
        <rect x="220" y="100" width="90" height="50" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="265" y="130" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Student Centre</text>

        {/* Tech Wing */}
        <rect x="520" y="150" width="110" height="65" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="575" y="187" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Tech Wing</text>

        {/* Central Quad / Open Air */}
        <rect x="310" y="230" width="130" height="80" rx="6" fill="transparent" stroke="#2a3650" strokeDasharray="4 3" />
        <text x="375" y="275" textAnchor="middle" fill="#4a5370" fontSize="9" fontFamily="Inter, sans-serif">Open-Air Stage</text>

        {/* Sports Ground */}
        <rect x="410" y="350" width="140" height="70" rx="6" fill="transparent" stroke="#2a3650" strokeDasharray="4 3" />
        <text x="480" y="390" textAnchor="middle" fill="#4a5370" fontSize="9" fontFamily="Inter, sans-serif">Sports Ground</text>

        {/* Hostel */}
        <rect x="420" y="280" width="80" height="45" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="460" y="307" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Hostel</text>

        {/* Library */}
        <rect x="180" y="290" width="90" height="50" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="225" y="320" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Library</text>

        {/* Canteen */}
        <rect x="270" y="360" width="80" height="40" rx="4" fill="#1e2843" stroke="#2a3650" />
        <text x="310" y="384" textAnchor="middle" fill="#6b7394" fontSize="9" fontFamily="Inter, sans-serif">Canteen</text>

        {/* Trees / greenery dots */}
        {[{x:140,y:160},{x:650,y:120},{x:700,y:300},{x:130,y:380},{x:550,y:400},{x:680,y:420}].map((t, i) => (
          <circle key={`tree-${i}`} cx={t.x} cy={t.y} r="8" fill="#1a3028" opacity="0.6" />
        ))}

        {/* Roads */}
        <line x1="160" y1="380" x2="350" y2="380" stroke="#2a3346" strokeWidth="2" />
        <line x1="270" y1="270" x2="270" y2="360" stroke="#2a3346" strokeWidth="2" />
        <line x1="500" y1="215" x2="500" y2="350" stroke="#2a3346" strokeWidth="2" />
      </svg>

      {/* Pin */}
      {pinX != null && pinY != null && (
        <>
          <div
            className="campus-map__pin-ring"
            style={{ left: `${pinX}%`, top: `${pinY}%` }}
          />
          <svg
            className="campus-map__pin"
            style={{ left: `${pinX}%`, top: `${pinY}%` }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill="#ff6b6b"
            />
            <circle cx="12" cy="9" r="3" fill="#fff" />
          </svg>
        </>
      )}
    </div>
  );
}
