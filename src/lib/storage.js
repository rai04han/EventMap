/**
 * storage.js – localStorage-backed data layer
 *
 * Exports: getEvents, addEvent, getSaved, toggleSaved, resetDemo
 */

import { seedEvents } from '../data/seedEvents';
import { venues } from '../data/venues';

const EVENTS_KEY = 'campuspulse_events';
const SAVED_KEY = 'campuspulse_saved';
const SEED_TS_KEY = 'campuspulse_seed_ts';

// ── Helpers ──────────────────────────────────────────────

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ── Bootstrap ────────────────────────────────────────────

/**
 * Seeds demo data if nothing is stored, or if the stored seed is stale
 * (older than 4 hours — keeps Live / Upcoming working during a demo).
 */
function ensureSeeded() {
  const seedTs = localStorage.getItem(SEED_TS_KEY);
  const stale = !seedTs || Date.now() - Number(seedTs) > 4 * 60 * 60 * 1000;
  if (stale || !localStorage.getItem(EVENTS_KEY)) {
    writeJSON(EVENTS_KEY, seedEvents());
    writeJSON(SAVED_KEY, []);
    localStorage.setItem(SEED_TS_KEY, String(Date.now()));
  }
}

// ── Public API ───────────────────────────────────────────

export function getEvents() {
  ensureSeeded();
  return readJSON(EVENTS_KEY, []);
}

export function addEvent(event) {
  const events = getEvents();
  events.push(event);
  writeJSON(EVENTS_KEY, events);
}

export function getSaved() {
  ensureSeeded();
  return readJSON(SAVED_KEY, []);
}

export function toggleSaved(id) {
  const saved = getSaved();
  const idx = saved.indexOf(id);
  if (idx === -1) {
    saved.push(id);
  } else {
    saved.splice(idx, 1);
  }
  writeJSON(SAVED_KEY, saved);
  return saved;
}

export function resetDemo() {
  localStorage.removeItem(EVENTS_KEY);
  localStorage.removeItem(SAVED_KEY);
  localStorage.removeItem(SEED_TS_KEY);
  ensureSeeded();
}

export function getVenues() {
  return venues;
}

export function getVenueById(id) {
  return venues.find((v) => v.id === id) || null;
}
