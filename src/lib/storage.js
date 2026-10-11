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
const ORGANIZERS_KEY = 'campuspulse_organizers';
const SESSION_KEY = 'campuspulse_organizer_session';

// Pre-seeded demo organizer (organizer@campus.edu / password123)
const DEFAULT_ORGANIZERS = [
  {
    id: 'org-demo-1',
    name: 'Alex Chen',
    organization: 'IEEE Student Branch',
    email: 'organizer@campus.edu',
    passwordHash: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f',
    createdAt: Date.now(),
  },
];

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

/**
 * SHA-256 password hashing using standard Web Crypto API.
 */
export async function hashPassword(password) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash);
}

// ── Bootstrap ────────────────────────────────────────────

/**
 * Seeds demo data if nothing is stored, or if the stored seed is stale
 * (older than 4 hours — keeps Live / Upcoming working during a demo).
 */
function ensureSeeded() {
  const seedTs = localStorage.getItem(SEED_TS_KEY);
  const stale = !seedTs || Date.now() - Number(seedTs) > 4 * 60 * 60 * 1000;
  const existingEvents = readJSON(EVENTS_KEY, null);

  if (stale || !existingEvents || existingEvents.length < 15) {
    writeJSON(EVENTS_KEY, seedEvents());
    writeJSON(SAVED_KEY, []);
    localStorage.setItem(SEED_TS_KEY, String(Date.now()));
  }
  if (!localStorage.getItem(ORGANIZERS_KEY)) {
    writeJSON(ORGANIZERS_KEY, DEFAULT_ORGANIZERS);
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

export function deleteEvent(id) {
  const events = getEvents();
  const updated = events.filter((e) => e.id !== id);
  writeJSON(EVENTS_KEY, updated);
  return updated;
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
  localStorage.removeItem(ORGANIZERS_KEY);
  localStorage.removeItem(SESSION_KEY);
  ensureSeeded();
}

export function getVenues() {
  return venues;
}

export function getVenueById(id) {
  return venues.find((v) => v.id === id) || null;
}

// ── Organizer Auth API ───────────────────────────────────

export function getOrganizers() {
  ensureSeeded();
  return readJSON(ORGANIZERS_KEY, DEFAULT_ORGANIZERS);
}

export async function registerOrganizer({ name, organization, email, password }) {
  const organizers = getOrganizers();
  const normalizedEmail = email.trim().toLowerCase();

  // Validate duplicate email
  if (organizers.some((o) => o.email.toLowerCase() === normalizedEmail)) {
    throw new Error('An organizer with this email already exists.');
  }

  const passwordHash = await hashPassword(password);
  const newOrganizer = {
    id: `org-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: name.trim(),
    organization: organization.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: Date.now(),
  };

  organizers.push(newOrganizer);
  writeJSON(ORGANIZERS_KEY, organizers);

  // Auto-login on registration
  const session = {
    id: newOrganizer.id,
    name: newOrganizer.name,
    organization: newOrganizer.organization,
    email: newOrganizer.email,
    role: 'organizer',
  };
  setOrganizerSession(session);
  return session;
}

export async function loginOrganizer(email, password) {
  const organizers = getOrganizers();
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await hashPassword(password);

  const org = organizers.find(
    (o) => o.email.toLowerCase() === normalizedEmail && o.passwordHash === passwordHash
  );

  if (!org) {
    throw new Error('Invalid email or password.');
  }

  const session = {
    id: org.id,
    name: org.name,
    organization: org.organization,
    email: org.email,
    role: 'organizer',
  };
  setOrganizerSession(session);
  return session;
}

export function getOrganizerSession() {
  return readJSON(SESSION_KEY, null);
}

export function setOrganizerSession(session) {
  writeJSON(SESSION_KEY, session);
}

export function clearOrganizerSession() {
  localStorage.removeItem(SESSION_KEY);
}
