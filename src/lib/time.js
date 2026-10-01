/**
 * time.js – status computation and countdown formatting
 *
 * getStatus(event, now) → "live" | "today" | "upcoming" | "ended"
 * countdown(event, now)  → human-readable string like "Starts in 40 min"
 * inMinutes(offset)      → epoch ms relative to Date.now()
 */

/**
 * Returns the display status of an event.
 * - "live"     → now is between start and end
 * - "today"    → starts later today (within same calendar day)
 * - "upcoming" → starts on a future calendar day
 * - "ended"    → now is past event end
 */
export function getStatus(event, now = Date.now()) {
  if (now >= event.start && now < event.end) return 'live';
  if (now >= event.end) return 'ended';

  // starts in the future — check if same calendar day
  const startDate = new Date(event.start);
  const nowDate = new Date(now);
  const sameDay =
    startDate.getFullYear() === nowDate.getFullYear() &&
    startDate.getMonth() === nowDate.getMonth() &&
    startDate.getDate() === nowDate.getDate();

  return sameDay ? 'today' : 'upcoming';
}

/**
 * Returns a human-readable countdown string.
 * - Live events:  "Ends in 35 min"
 * - Future:       "Starts in 2 h 15 min"
 * - Ended:        "Ended 10 min ago"
 */
export function countdown(event, now = Date.now()) {
  const status = getStatus(event, now);

  if (status === 'live') {
    return `Ends in ${formatDuration(event.end - now)}`;
  }
  if (status === 'ended') {
    return `Ended ${formatDuration(now - event.end)} ago`;
  }
  return `Starts in ${formatDuration(event.start - now)}`;
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}min`;
  if (minutes > 0) return `${minutes} min`;
  return 'less than a min';
}

/** Helper: returns epoch ms that is `offset` minutes from now. */
export function inMinutes(offset) {
  return Date.now() + offset * 60 * 1000;
}

/**
 * Status sort priority (lower = earlier in feed).
 * live → today → upcoming → ended
 */
export function statusPriority(status) {
  const map = { live: 0, today: 1, upcoming: 2, ended: 3 };
  return map[status] ?? 4;
}
