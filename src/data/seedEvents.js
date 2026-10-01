/**
 * seedEvents.js – demo events with relative timestamps
 *
 * Owner: C
 * Builds 8-10 events with times relative to `now` so Live / Upcoming always works.
 *
 * C: adjust titles, categories, and descriptions to fit your demo narrative.
 */

import { inMinutes } from '../lib/time';

let _counter = 0;
function uid() {
  _counter += 1;
  return `evt-${Date.now()}-${_counter}`;
}

export function seedEvents() {
  return [
    // ── LIVE NOW (1-2 events) ────────────────────────
    {
      id: uid(),
      title: 'Hackathon Kickoff',
      category: 'Tech',
      venueId: 'v4',
      start: inMinutes(-20),
      end: inMinutes(100),
      organizer: 'IEEE Student Branch',
      description:
        '24-hour hackathon — form your teams, grab your laptops, and start building. Snacks provided!',
    },
    {
      id: uid(),
      title: 'Acoustic Jam Session',
      category: 'Cultural',
      venueId: 'v3',
      start: inMinutes(-10),
      end: inMinutes(50),
      organizer: 'Music Club',
      description:
        'Bring your guitar or just your voice. Open mic for all students — no sign-up needed.',
    },

    // ── TODAY / UPCOMING (4-5 events) ────────────────
    {
      id: uid(),
      title: 'Web Dev Workshop',
      category: 'Workshop',
      venueId: 'v2',
      start: inMinutes(40),
      end: inMinutes(160),
      organizer: 'GDSC',
      description:
        'Hands-on workshop on React and Vite. Bring your laptop with Node.js installed.',
    },
    {
      id: uid(),
      title: 'Inter-Dept Cricket Finals',
      category: 'Sports',
      venueId: 'v5',
      start: inMinutes(90),
      end: inMinutes(210),
      organizer: 'Sports Committee',
      description:
        'CS vs ECE — the grand finale! Come support your department.',
    },
    {
      id: uid(),
      title: 'AI in Healthcare — Guest Lecture',
      category: 'Seminar',
      venueId: 'v1',
      start: inMinutes(120),
      end: inMinutes(180),
      organizer: 'CSE Dept',
      description:
        'Guest lecture by Dr. Meena Iyer, AI researcher at IISc. Open to all departments.',
    },
    {
      id: uid(),
      title: 'Standup Comedy Night',
      category: 'Cultural',
      venueId: 'v6',
      start: inMinutes(200),
      end: inMinutes(290),
      organizer: 'Cultural Committee',
      description:
        'Open-mic standup comedy — 5 minutes each. Sign up at the venue!',
    },
    {
      id: uid(),
      title: 'Resume Building Bootcamp',
      category: 'Workshop',
      venueId: 'v2',
      start: inMinutes(300),
      end: inMinutes(390),
      organizer: 'Placement Cell',
      description:
        'Get your resume reviewed by seniors who cracked FAANG interviews. Bring a printed copy.',
    },

    // ── ENDED (2 events) ────────────────────────────
    {
      id: uid(),
      title: 'Morning Yoga',
      category: 'Sports',
      venueId: 'v5',
      start: inMinutes(-180),
      end: inMinutes(-120),
      organizer: 'NSS Unit',
      description:
        'Daily morning yoga session. Mats provided. All skill levels welcome.',
    },
    {
      id: uid(),
      title: 'Python for Beginners',
      category: 'Tech',
      venueId: 'v4',
      start: inMinutes(-240),
      end: inMinutes(-150),
      organizer: 'Coding Club',
      description:
        'Intro to Python — variables, loops, and your first program. No experience needed.',
    },
  ];
}
