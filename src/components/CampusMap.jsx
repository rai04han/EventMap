/**
 * CampusMap.jsx – Schematic SVG campus map with animated pin
 *
 * Owner: B
 * Props: pinX (0-100%), pinY (0-100%), venueName
 */

import React from 'react';

export default function CampusMap({ pinX, pinY, venueName }) {
  return (
    <div className="campus-map" id="campus-map">
      <svg
        viewBox="0 0 800 500"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          {/* Building gradient */}
          <linearGradient id="bldg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#222c42" />
            <stop offset="100%" stopColor="#1a2237" />
          </linearGradient>
          {/* Open-area gradient */}
          <linearGradient id="open-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(29,209,161,0.06)" />
            <stop offset="100%" stopColor="rgba(29,209,161,0.02)" />
          </linearGradient>
          {/* Pin glow */}
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="rgba(255,107,107,0.4)" />
            <stop offset="100%" stopColor="rgba(255,107,107,0)" />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="800" height="500" fill="#111827" rx="8" />

        {/* Subtle grid */}
        {Array.from({ length: 17 }, (_, i) => (
          <line key={`vg-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" stroke="#1a2030" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <line key={`hg-${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} stroke="#1a2030" strokeWidth="0.5" />
        ))}

        {/* ── Main Gate ── */}
        <rect x="365" y="458" width="70" height="22" rx="4" fill="#2d3854" stroke="#3a4766" strokeWidth="1" />
        <text x="400" y="473" textAnchor="middle" fill="#8b9cc0" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">MAIN GATE</text>

        {/* ── Central pathway (dashed) ── */}
        <line x1="400" y1="456" x2="400" y2="90" stroke="#2a3650" strokeWidth="3" strokeDasharray="8 5" opacity="0.8" />

        {/* ── Branching roads ── */}
        <line x1="270" y1="270" x2="270" y2="370" stroke="#232d42" strokeWidth="2.5" />
        <line x1="160" y1="370" x2="400" y2="370" stroke="#232d42" strokeWidth="2.5" />
        <line x1="500" y1="215" x2="500" y2="350" stroke="#232d42" strokeWidth="2.5" />
        <line x1="400" y1="200" x2="520" y2="200" stroke="#232d42" strokeWidth="2" />
        <line x1="270" y1="270" x2="400" y2="270" stroke="#232d42" strokeWidth="2" />
        <line x1="400" y1="370" x2="550" y2="370" stroke="#232d42" strokeWidth="2" />

        {/* ── Admin Block ── */}
        <rect x="350" y="110" width="100" height="60" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="400" y="142" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Admin Block</text>
        <text x="400" y="155" textAnchor="middle" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Office · Reception</text>

        {/* ── Academic Block 1 ── */}
        <rect x="155" y="195" width="115" height="75" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="212" y="232" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Academic</text>
        <text x="212" y="245" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Block 1</text>
        <text x="212" y="258" textAnchor="middle" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Seminar Halls</text>

        {/* ── Student Centre ── */}
        <rect x="215" y="95" width="95" height="55" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="262" y="122" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Student</text>
        <text x="262" y="135" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Centre</text>

        {/* ── Tech Wing ── */}
        <rect x="515" y="145" width="115" height="70" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="572" y="180" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Tech Wing</text>
        <text x="572" y="193" textAnchor="middle" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Labs · Workshops</text>

        {/* ── Open-Air Stage (dashed outline) ── */}
        <rect x="305" y="225" width="135" height="85" rx="8" fill="url(#open-grad)" stroke="#2e4a48" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="372" y="267" textAnchor="middle" fill="#3d8b7a" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Open-Air</text>
        <text x="372" y="280" textAnchor="middle" fill="#3d8b7a" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Stage</text>
        <circle cx="372" cy="295" r="3" fill="#1dd1a1" opacity="0.3" />

        {/* ── Sports Ground ── */}
        <rect x="405" y="345" width="145" height="75" rx="8" fill="url(#open-grad)" stroke="#2e4a48" strokeWidth="1.2" strokeDasharray="5 3" />
        <text x="477" y="383" textAnchor="middle" fill="#3d8b7a" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Sports</text>
        <text x="477" y="396" textAnchor="middle" fill="#3d8b7a" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Ground</text>
        {/* Track markings */}
        <ellipse cx="477" cy="388" rx="55" ry="25" fill="none" stroke="#2e4a48" strokeWidth="0.5" opacity="0.5" />

        {/* ── Hostel ── */}
        <rect x="415" y="275" width="85" height="50" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="457" y="302" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Hostel</text>

        {/* ── Library ── */}
        <rect x="155" y="290" width="95" height="55" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="202" y="320" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Library</text>
        <text x="202" y="333" textAnchor="middle" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">📚</text>

        {/* ── Canteen ── */}
        <rect x="265" y="355" width="85" height="45" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="307" y="380" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Canteen</text>
        <text x="307" y="392" textAnchor="middle" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">🍴</text>

        {/* ── Parking ── */}
        <rect x="600" y="380" width="80" height="40" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="0.8" opacity="0.6" />
        <text x="640" y="404" textAnchor="middle" fill="#505b78" fontSize="8" fontFamily="Inter, sans-serif">Parking</text>

        {/* ── Trees / greenery ── */}
        {[
          { x: 140, y: 155 }, { x: 650, y: 130 }, { x: 700, y: 300 },
          { x: 130, y: 380 }, { x: 555, y: 430 }, { x: 680, y: 430 },
          { x: 750, y: 200 }, { x: 100, y: 250 }, { x: 340, y: 440 },
          { x: 600, y: 280 }, { x: 475, y: 250 }, { x: 140, y: 120 },
        ].map((t, i) => (
          <g key={`tree-${i}`}>
            <circle cx={t.x} cy={t.y} r="10" fill="#0f2a1e" opacity="0.5" />
            <circle cx={t.x} cy={t.y} r="6" fill="#163828" opacity="0.6" />
          </g>
        ))}

        {/* ── Compass ── */}
        <g transform="translate(740, 60)">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#2e3a55" strokeWidth="1" />
          <text x="0" y="-8" textAnchor="middle" fill="#6b7aa0" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">N</text>
          <line x1="0" y1="-5" x2="0" y2="5" stroke="#4a5678" strokeWidth="1.5" />
          <polygon points="0,-14 -3,-8 3,-8" fill="#6c5ce7" opacity="0.8" />
          <polygon points="0,14 -3,8 3,8" fill="#4a5678" opacity="0.5" />
        </g>

        {/* ── Legend border ── */}
        <rect x="15" y="440" width="160" height="45" rx="6" fill="rgba(17,24,39,0.8)" stroke="#2e3a55" strokeWidth="0.8" />
        <rect x="25" y="453" width="8" height="8" rx="2" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="0.6" />
        <text x="38" y="461" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Building</text>
        <rect x="85" y="453" width="8" height="8" rx="2" fill="url(#open-grad)" stroke="#2e4a48" strokeWidth="0.6" strokeDasharray="2 1" />
        <text x="98" y="461" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Open area</text>
        <circle cx="29" cy="475" r="4" fill="#163828" opacity="0.6" />
        <text x="38" y="478" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Greenery</text>
        <line x1="85" y1="475" x2="98" y2="475" stroke="#232d42" strokeWidth="2" />
        <text x="103" y="478" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Path</text>
      </svg>

      {/* ── Animated Pin ── */}
      {pinX != null && pinY != null && (
        <>
          {/* Pulsing ring */}
          <div
            className="campus-map__pin-ring"
            style={{ left: `${pinX}%`, top: `${pinY}%` }}
          />
          {/* Pin icon */}
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
          {/* Venue label */}
          {venueName && (
            <div
              className="campus-map__pin-label"
              style={{ left: `${pinX}%`, top: `${pinY}%` }}
            >
              {venueName}
            </div>
          )}
        </>
      )}
    </div>
  );
}
