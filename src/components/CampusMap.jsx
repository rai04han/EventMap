/**
 * CampusMap.jsx – Schematic SVG campus map with route + animated pin
 *
 * Owner: B
 * Props:
 *   pinX (0-100%), pinY (0-100%) — destination pin position
 *   venueName — label for the destination
 *   venueId — used to look up the predefined route
 */

import React from 'react';
import { venues } from '../data/venues';

// Build the route polyline points string from a venue's route array
function getRoutePoints(venueId) {
  if (!venueId) return null;
  const venue = venues.find((v) => v.id === venueId);
  if (!venue || !venue.route || venue.route.length < 2) return null;
  return venue.route.map(([x, y]) => `${x},${y}`).join(' ');
}

// Main Gate SVG coords (centre of the gate rect)
const GATE_X = 400;
const GATE_Y = 469;

export default function CampusMap({ pinX, pinY, venueName, venueId }) {
  const routePoints = getRoutePoints(venueId);
  // Get the last route point for the destination marker (SVG coords)
  const venue = venueId ? venues.find((v) => v.id === venueId) : null;
  const destPoint = venue?.route?.length ? venue.route[venue.route.length - 1] : null;

  return (
    <div className="campus-map" id="campus-map">
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
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
          {/* Route glow filter */}
          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
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
        <ellipse cx="477" cy="388" rx="55" ry="25" fill="none" stroke="#2e4a48" strokeWidth="0.5" opacity="0.5" />

        {/* ── Hostel ── */}
        <rect x="415" y="275" width="85" height="50" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="457" y="302" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Hostel</text>

        {/* ── Library ── */}
        <rect x="155" y="290" width="95" height="55" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="202" y="320" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Library</text>

        {/* ── Canteen ── */}
        <rect x="265" y="355" width="85" height="45" rx="5" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="1.2" />
        <text x="307" y="380" textAnchor="middle" fill="#7a87a8" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif">Canteen</text>

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

        {/* ══════════════════════════════════════════════════
            ROUTE OVERLAY — only rendered when a venue is selected
            ══════════════════════════════════════════════════ */}
        {routePoints && (
          <g className="campus-map__route-group">
            {/* Route glow (background) */}
            <polyline
              points={routePoints}
              fill="none"
              stroke="rgba(108,92,231,0.3)"
              strokeWidth="10"
              strokeLinejoin="round"
              strokeLinecap="round"
              filter="url(#route-glow)"
            />
            {/* Route solid line */}
            <polyline
              points={routePoints}
              fill="none"
              stroke="#6c5ce7"
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Route animated dash overlay */}
            <polyline
              className="campus-map__route-dash"
              points={routePoints}
              fill="none"
              stroke="#a78bfa"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="8 12"
            />

            {/* ── START marker (Main Gate) ── */}
            <g>
              <circle cx={GATE_X} cy={GATE_Y - 10} r="8" fill="#6c5ce7" opacity="0.9" />
              <circle cx={GATE_X} cy={GATE_Y - 10} r="4" fill="#fff" />
              <rect x={GATE_X - 28} y={GATE_Y - 38} width="56" height="18" rx="4" fill="rgba(108,92,231,0.9)" />
              <text x={GATE_X} y={GATE_Y - 26} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">
                START
              </text>
            </g>

            {/* ── DESTINATION marker ── */}
            {destPoint && (
              <g>
                <circle cx={destPoint[0]} cy={destPoint[1]} r="10" fill="rgba(255,107,107,0.25)">
                  <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={destPoint[0]} cy={destPoint[1]} r="6" fill="#ff6b6b" />
                <circle cx={destPoint[0]} cy={destPoint[1]} r="2.5" fill="#fff" />
                {/* Destination label */}
                <rect
                  x={destPoint[0] - 45}
                  y={destPoint[1] - 28}
                  width="90"
                  height="16"
                  rx="4"
                  fill="rgba(255,107,107,0.9)"
                />
                <text
                  x={destPoint[0]}
                  y={destPoint[1] - 17}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="7"
                  fontWeight="700"
                  fontFamily="Inter, sans-serif"
                >
                  📍 DESTINATION
                </text>
                {/* Venue name label below dest dot */}
                <rect
                  x={destPoint[0] - 50}
                  y={destPoint[1] + 10}
                  width="100"
                  height="16"
                  rx="4"
                  fill="rgba(17,24,39,0.9)"
                  stroke="#6c5ce7"
                  strokeWidth="0.8"
                />
                <text
                  x={destPoint[0]}
                  y={destPoint[1] + 21}
                  textAnchor="middle"
                  fill="#f0f2f5"
                  fontSize="7.5"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {venueName || 'Venue'}
                </text>
              </g>
            )}
          </g>
        )}

        {/* ── Legend ── */}
        <rect x="15" y="440" width="180" height="45" rx="6" fill="rgba(17,24,39,0.85)" stroke="#2e3a55" strokeWidth="0.8" />
        <rect x="25" y="453" width="8" height="8" rx="2" fill="url(#bldg-grad)" stroke="#2e3a55" strokeWidth="0.6" />
        <text x="38" y="461" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Building</text>
        <rect x="85" y="453" width="8" height="8" rx="2" fill="url(#open-grad)" stroke="#2e4a48" strokeWidth="0.6" strokeDasharray="2 1" />
        <text x="98" y="461" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Open area</text>
        <circle cx="29" cy="475" r="4" fill="#163828" opacity="0.6" />
        <text x="38" y="478" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Greenery</text>
        {/* Route legend */}
        <line x1="85" y1="475" x2="105" y2="475" stroke="#6c5ce7" strokeWidth="3" strokeLinecap="round" />
        <text x="110" y="478" fill="#505b78" fontSize="7" fontFamily="Inter, sans-serif">Route</text>
      </svg>

      {/* ── Animated Pin (HTML overlay for when no route data is available) ── */}
      {pinX != null && pinY != null && !routePoints && (
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
