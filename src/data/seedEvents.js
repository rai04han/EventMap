/**
 * seedEvents.js – Demo events with dynamic timestamps
 *
 * Provides a populated, realistic dataset of 24 campus events:
 * - 4 LIVE events (different venues, categories)
 * - 5 TODAY events (starting in 50 min to 4 hours)
 * - 12 UPCOMING events (Tomorrow, +2d, +3d, +4d, +5d, +7d)
 * - 3 ENDED events (sorted to bottom, greyed out)
 *
 * All 6 venues from venues.js (v1 to v6) are evenly represented.
 * All categories (Tech, Cultural, Sports, Workshop, Seminar, Other) are well-balanced.
 */

import { inMinutes } from '../lib/time.js';

let _counter = 0;
function uid() {
  _counter += 1;
  return `evt-${Date.now()}-${_counter}`;
}

function futureDate(dayOffset, hour, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
}

export function seedEvents() {
  return [
    // ══════════════════════════════════════════════════════════
    // 1. LIVE NOW (4 events) – Ongoing right now across 4 venues
    // ══════════════════════════════════════════════════════════
    {
      id: uid(),
      title: 'Hackathon Kickoff & Sprint',
      category: 'Tech',
      venueId: 'v4', // CS Lab 3 (Tech Wing)
      start: inMinutes(-45),
      end: inMinutes(90),
      organizer: 'IEEE Student Branch',
      description:
        '24-hour campus hackathon — teams are building innovative web and AI solutions. Mentors available on-site.',
    },
    {
      id: uid(),
      title: 'Acoustic Jam Session & Open Mic',
      category: 'Cultural',
      venueId: 'v3', // Open-Air Stage (Central Quadrangle)
      start: inMinutes(-20),
      end: inMinutes(60),
      organizer: 'Music Club',
      description:
        'Live acoustic performances and impromptu jamming. Bring your instrument or enjoy the music with friends.',
    },
    {
      id: uid(),
      title: 'Hands-on UI/UX Prototyping Workshop',
      category: 'Workshop',
      venueId: 'v2', // Seminar Hall A (Academic Block 1)
      start: inMinutes(-30),
      end: inMinutes(75),
      organizer: 'Developer Club',
      description:
        'Interactive Figma masterclass on user journeys, component libraries, and interactive design systems.',
    },
    {
      id: uid(),
      title: 'Inter-Dept Badminton Championship',
      category: 'Sports',
      venueId: 'v5', // Sports Ground (Outdoor Facilities)
      start: inMinutes(-15),
      end: inMinutes(105),
      organizer: 'Sports Committee',
      description:
        'Semi-final clash between CS and Mechanical departments. Fast-paced doubles action on court 1.',
    },

    // ══════════════════════════════════════════════════════════
    // 2. TODAY (5 events) – Starting later today
    // ══════════════════════════════════════════════════════════
    {
      id: uid(),
      title: 'AI & Machine Learning Demonstration',
      category: 'Tech',
      venueId: 'v1', // Main Auditorium (Admin Block)
      start: inMinutes(50),
      end: inMinutes(140),
      organizer: 'CSE Dept',
      description:
        'Live demonstration of generative AI models, autonomous robotics, and computer vision research projects.',
    },
    {
      id: uid(),
      title: 'React & Vite Web Development Bootcamp',
      category: 'Workshop',
      venueId: 'v4', // CS Lab 3 (Tech Wing)
      start: inMinutes(80),
      end: inMinutes(200),
      organizer: 'Developer Club',
      description:
        'Build and deploy modern Single Page Applications with React, custom CSS hooks, and client-side state.',
    },
    {
      id: uid(),
      title: 'Inter-Department Football League',
      category: 'Sports',
      venueId: 'v5', // Sports Ground (Outdoor Facilities)
      start: inMinutes(120),
      end: inMinutes(220),
      organizer: 'Sports Committee',
      description:
        'High-energy 7-a-side football derby: Electronics vs Civil Engineering. Refreshments provided at half-time.',
    },
    {
      id: uid(),
      title: 'Career Guidance & FAANG Interview Prep',
      category: 'Seminar',
      venueId: 'v2', // Seminar Hall A (Academic Block 1)
      start: inMinutes(160),
      end: inMinutes(250),
      organizer: 'Placement Cell',
      description:
        'Senior engineers share actionable strategies on cracking coding rounds, system design, and behavioural interviews.',
    },
    {
      id: uid(),
      title: 'Standup Comedy & Talent Night',
      category: 'Cultural',
      venueId: 'v6', // Mini Hall (Student Centre)
      start: inMinutes(210),
      end: inMinutes(300),
      organizer: 'Cultural Committee',
      description:
        'An evening of laughter featuring student standup comics, beatboxers, and short skits. Free admission for students.',
    },

    // ══════════════════════════════════════════════════════════
    // 3. UPCOMING (12 events) – Next several days
    // ══════════════════════════════════════════════════════════
    // Tomorrow (+1 day)
    {
      id: uid(),
      title: 'Resume Building & Portfolio Review',
      category: 'Workshop',
      venueId: 'v2', // Seminar Hall A
      start: futureDate(1, 10, 0),
      end: futureDate(1, 12, 30),
      organizer: 'Placement Cell',
      description:
        'One-on-one resume feedback and LinkedIn profile optimization workshop led by industry talent acquisition experts.',
    },
    {
      id: uid(),
      title: 'Cybersecurity & Ethical Hacking Workshop',
      category: 'Tech',
      venueId: 'v4', // CS Lab 3
      start: futureDate(1, 14, 0),
      end: futureDate(1, 16, 30),
      organizer: 'Computer Science Club',
      description:
        'Learn network penetration testing, web vulnerability scans, and security hygiene through hands-on lab challenges.',
    },
    {
      id: uid(),
      title: 'Inter-College Cricket Tournament Finals',
      category: 'Sports',
      venueId: 'v5', // Sports Ground
      start: futureDate(1, 9, 30),
      end: futureDate(1, 13, 30),
      organizer: 'Sports Committee',
      description:
        'The annual 20-over championship finale. Come support the home team as they compete for the championship trophy.',
    },

    // In 2 Days (+2 days)
    {
      id: uid(),
      title: 'Research Horizons: AI in Healthcare Guest Lecture',
      category: 'Seminar',
      venueId: 'v1', // Main Auditorium
      start: futureDate(2, 11, 0),
      end: futureDate(2, 12, 45),
      organizer: 'Innovation Cell',
      description:
        'Distinguished guest lecture by Dr. Meena Iyer on machine learning diagnostics and medical image analysis.',
    },
    {
      id: uid(),
      title: 'Battle of the Bands – Annual Music Night',
      category: 'Cultural',
      venueId: 'v3', // Open-Air Stage
      start: futureDate(2, 17, 30),
      end: futureDate(2, 20, 30),
      organizer: 'Arts Club',
      description:
        'Eight campus bands compete across rock, indie, and fusion genres with guest judge performances and light show.',
    },

    // In 3 Days (+3 days)
    {
      id: uid(),
      title: 'Annual Student Club Orientation & Fresher Meetup',
      category: 'Other',
      venueId: 'v6', // Mini Hall
      start: futureDate(3, 10, 30),
      end: futureDate(3, 12, 30),
      organizer: 'Student Union',
      description:
        'Discover all active campus clubs, departmental committees, and extracurricular opportunities. Free welcome kits!',
    },
    {
      id: uid(),
      title: 'Digital Photography & Photo Editing Masterclass',
      category: 'Workshop',
      venueId: 'v2', // Seminar Hall A
      start: futureDate(3, 14, 0),
      end: futureDate(3, 16, 30),
      organizer: 'Arts Club',
      description:
        'Learn camera exposure techniques, composition rules, and Adobe Lightroom mobile color-grading fundamentals.',
    },

    // In 4 Days (+4 days)
    {
      id: uid(),
      title: 'Cloud Computing & DevOps Hands-on Lab',
      category: 'Tech',
      venueId: 'v4', // CS Lab 3
      start: futureDate(4, 10, 0),
      end: futureDate(4, 13, 0),
      organizer: 'Developer Club',
      description:
        'Deploy scalable containerized microservices using Docker and automated CI/CD deployment pipelines on AWS.',
    },
    {
      id: uid(),
      title: 'Entrepreneurship 101: From College Project to Startup',
      category: 'Seminar',
      venueId: 'v1', // Main Auditorium
      start: futureDate(4, 15, 0),
      end: futureDate(4, 17, 0),
      organizer: 'Entrepreneurship Cell',
      description:
        'Student startup founders discuss early-stage venture funding, finding co-founders, and developing minimum viable products.',
    },

    // In 5 Days (+5 days)
    {
      id: uid(),
      title: 'Annual Campus Chess & Table Tennis Championship',
      category: 'Sports',
      venueId: 'v6', // Mini Hall
      start: futureDate(5, 9, 30),
      end: futureDate(5, 14, 0),
      organizer: 'Sports Committee',
      description:
        'Rapid chess round-robin and singles table tennis knockout rounds open to students and faculty members alike.',
    },
    {
      id: uid(),
      title: 'Choreonite: Inter-Department Dance Competition',
      category: 'Cultural',
      venueId: 'v3', // Open-Air Stage
      start: futureDate(5, 18, 0),
      end: futureDate(5, 21, 0),
      organizer: 'Cultural Committee',
      description:
        'Spectacular thematic group dance showcases featuring classical, western hip-hop, and folk fusion styles.',
    },

    // In 7 Days (+7 days)
    {
      id: uid(),
      title: 'Campus Innovation Showcase & Project Expo 2026',
      category: 'Other',
      venueId: 'v1', // Main Auditorium
      start: futureDate(7, 10, 0),
      end: futureDate(7, 16, 0),
      organizer: 'Innovation Cell',
      description:
        'Interdisciplinary exhibition of capstone engineering prototypes, IoT hardware, sustainable tech, and patents.',
    },

    // ══════════════════════════════════════════════════════════
    // 4. ENDED (3 events) – Past events sorted to bottom
    // ══════════════════════════════════════════════════════════
    {
      id: uid(),
      title: 'Morning Yoga & Mindfulness Session',
      category: 'Sports',
      venueId: 'v5', // Sports Ground
      start: inMinutes(-240),
      end: inMinutes(-180),
      organizer: 'NSS Unit',
      description:
        'Guided sunrise pranayama, gentle hatha yoga stretching, and meditation session to promote student wellness.',
    },
    {
      id: uid(),
      title: 'Python for Beginners & Data Exploration',
      category: 'Tech',
      venueId: 'v4', // CS Lab 3
      start: inMinutes(-360),
      end: inMinutes(-240),
      organizer: 'Coding Club',
      description:
        'Introductory coding session covering Python variables, conditional loops, functions, and working with CSV datasets.',
    },
    {
      id: uid(),
      title: 'Alumni Talk: Higher Studies & Research Abroad',
      category: 'Seminar',
      venueId: 'v2', // Seminar Hall A
      start: inMinutes(-480),
      end: inMinutes(-360),
      organizer: 'Placement Cell',
      description:
        'Campus alumni pursuing graduate studies at Stanford, CMU, and TUM share advice on GRE prep and SOP writing.',
    },
  ];
}
