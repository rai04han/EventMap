/**
 * EventForm.jsx – Form to create a new event
 *
 * Owner: C
 * Props: venues (array), onSubmit(eventData)
 */

import React, { useState } from 'react';

const CATEGORIES = ['Tech', 'Cultural', 'Sports', 'Workshop', 'Seminar', 'Other'];

function toLocalDatetime(date) {
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

export default function EventForm({ venues, onSubmit }) {
  const now = new Date();
  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

  const [form, setForm] = useState({
    title: '',
    category: 'Tech',
    venueId: venues[0]?.id || '',
    start: toLocalDatetime(now),
    end: toLocalDatetime(inOneHour),
    organizer: '',
    description: '',
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.organizer.trim()) return;

    onSubmit({
      id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title: form.title.trim(),
      category: form.category,
      venueId: form.venueId,
      start: new Date(form.start).getTime(),
      end: new Date(form.end).getTime(),
      organizer: form.organizer.trim(),
      description: form.description.trim(),
    });

    // Reset form
    setForm({
      title: '',
      category: 'Tech',
      venueId: venues[0]?.id || '',
      start: toLocalDatetime(new Date()),
      end: toLocalDatetime(new Date(Date.now() + 60 * 60 * 1000)),
      organizer: '',
      description: '',
    });
  };

  return (
    <form className="event-form" onSubmit={handleSubmit} id="event-form">
      <div className="event-form__field">
        <label htmlFor="ef-title">Event Title</label>
        <input id="ef-title" value={form.title} onChange={update('title')} placeholder="e.g. Hackathon 2026" required />
      </div>

      <div className="event-form__row">
        <div className="event-form__field">
          <label htmlFor="ef-category">Category</label>
          <select id="ef-category" value={form.category} onChange={update('category')}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="event-form__field">
          <label htmlFor="ef-venue">Venue</label>
          <select id="ef-venue" value={form.venueId} onChange={update('venueId')}>
            {venues.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
        </div>
      </div>

      <div className="event-form__row">
        <div className="event-form__field">
          <label htmlFor="ef-start">Start</label>
          <input id="ef-start" type="datetime-local" value={form.start} onChange={update('start')} required />
        </div>
        <div className="event-form__field">
          <label htmlFor="ef-end">End</label>
          <input id="ef-end" type="datetime-local" value={form.end} onChange={update('end')} required />
        </div>
      </div>

      <div className="event-form__field">
        <label htmlFor="ef-organizer">Organizer</label>
        <input id="ef-organizer" value={form.organizer} onChange={update('organizer')} placeholder="e.g. IEEE Student Branch" required />
      </div>

      <div className="event-form__field">
        <label htmlFor="ef-desc">Description</label>
        <textarea id="ef-desc" value={form.description} onChange={update('description')} placeholder="Brief description..." />
      </div>

      <button type="submit" className="btn btn--primary" id="ef-submit">
        🚀 Post Event
      </button>
    </form>
  );
}
