/**
 * Organizer.jsx – Organizer Authentication & Management Dashboard
 *
 * Features:
 * - Organizer Login & Registration
 * - Role-protected Dashboard (Session in localStorage)
 * - Create Event with auto-filled Organizer name
 * - My Events list with Delete capability
 * - Demo credential auto-fill for testing/judges
 * - Reset Demo Data button
 */

import React, { useState } from 'react';
import EventForm from '../components/EventForm';
import {
  getVenues,
  getVenueById,
  addEvent,
  deleteEvent,
  resetDemo,
  loginOrganizer,
  registerOrganizer,
  getOrganizerSession,
  clearOrganizerSession,
} from '../lib/storage';

export default function Organizer({ onEventAdded, events = [] }) {
  const [session, setSession] = useState(() => getOrganizerSession());
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [dashboardTab, setDashboardTab] = useState('create'); // 'create' | 'events'
  const [toast, setToast] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  // Register form state
  const [regForm, setRegForm] = useState({
    name: '',
    organization: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const venues = getVenues();

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3500);
  };

  // ── Authentication Handlers ─────────────────────────────

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const email = loginForm.email.trim();
    const password = loginForm.password;

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const authSession = await loginOrganizer(email, password);
      setSession(authSession);
      showToast(`Welcome back, ${authSession.name}!`);
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const name = regForm.name.trim();
    const organization = regForm.organization.trim();
    const email = regForm.email.trim();
    const password = regForm.password;
    const confirmPassword = regForm.confirmPassword;

    if (!name) {
      setError('Please enter your name.');
      return;
    }
    if (!organization) {
      setError('Please enter your organization.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email.');
      return;
    }
    if (!password) {
      setError('Please enter a password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const newSession = await registerOrganizer({
        name,
        organization,
        email,
        password,
      });
      setSession(newSession);
      showToast(`Account created! Welcome, ${newSession.name}!`);
    } catch (err) {
      setError(err.message || 'Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    clearOrganizerSession();
    setSession(null);
    setAuthMode('login');
    setError('');
    showToast('Logged out successfully.');
  };

  const handleEventSubmit = (eventData) => {
    addEvent(eventData);
    onEventAdded();
    showToast('Event posted successfully! Check the Feed.');
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(id);
      onEventAdded();
      showToast('Event removed.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset demo data back to clean state?')) {
      resetDemo();
      setSession(getOrganizerSession());
      onEventAdded();
      showToast('Demo data reset!');
    }
  };

  // Quick-fill helper for evaluators/hackathon judges
  const fillDemoCredentials = () => {
    setLoginForm({
      email: 'organizer@campus.edu',
      password: 'password123',
    });
    setError('');
  };

  // Filter events belonging to this organizer
  const myEvents = events.filter((e) => {
    if (!session) return false;
    const org = (session.organization || '').toLowerCase();
    const eventOrg = (e.organizer || '').toLowerCase();
    return eventOrg === org || eventOrg.includes(org) || org.includes(eventOrg);
  });

  // ── Unauthenticated: Login or Register ──────────────────
  if (!session) {
    return (
      <div className="organizer-page">
        <div className="auth-card" id="organizer-auth-card">
          <div className="auth-card__header">
            <div className="auth-card__icon">🔐</div>
            <h2>Organizer Portal</h2>
            <p>Publish and manage campus events for your club or department</p>
          </div>

          {/* Mode Switcher */}
          <div className="auth-card__tabs">
            <button
              type="button"
              className={`auth-card__tab${authMode === 'login' ? ' auth-card__tab--active' : ''}`}
              onClick={() => {
                setAuthMode('login');
                setError('');
              }}
              id="auth-tab-login"
            >
              Organizer Login
            </button>
            <button
              type="button"
              className={`auth-card__tab${authMode === 'register' ? ' auth-card__tab--active' : ''}`}
              onClick={() => {
                setAuthMode('register');
                setError('');
              }}
              id="auth-tab-register"
            >
              New Registration
            </button>
          </div>

          {error && (
            <div className="auth-card__error" id="auth-error-msg">
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Login Form */}
          {authMode === 'login' ? (
            <form className="auth-form" onSubmit={handleLoginSubmit} id="organizer-login-form">
              <div className="event-form__field">
                <label htmlFor="login-email">Email Address</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  placeholder="e.g. organizer@campus.edu"
                  required
                  autoFocus
                />
              </div>

              <div className="event-form__field">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                id="login-submit-btn"
                disabled={loading}
              >
                {loading ? 'Logging in...' : '🔑 Login to Dashboard'}
              </button>

              {/* Demo auto-fill helper */}
              <div className="auth-card__demo-hint">
                <span>💡 Hackathon Demo: </span>
                <button
                  type="button"
                  className="auth-card__hint-link"
                  onClick={fillDemoCredentials}
                  title="Click to fill test credentials"
                >
                  Click to auto-fill demo credentials
                </button>
              </div>

              <div className="auth-card__switch">
                Don't have an organizer account?{' '}
                <button
                  type="button"
                  className="auth-card__link"
                  onClick={() => {
                    setAuthMode('register');
                    setError('');
                  }}
                  id="switch-to-register"
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            /* Registration Form */
            <form className="auth-form" onSubmit={handleRegisterSubmit} id="organizer-register-form">
              <div className="event-form__field">
                <label htmlFor="reg-name">Full Name</label>
                <input
                  id="reg-name"
                  type="text"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  placeholder="e.g. Alex Chen"
                  required
                  autoFocus
                />
              </div>

              <div className="event-form__field">
                <label htmlFor="reg-org">Organization / Club Name</label>
                <input
                  id="reg-org"
                  type="text"
                  value={regForm.organization}
                  onChange={(e) => setRegForm({ ...regForm, organization: e.target.value })}
                  placeholder="e.g. IEEE Student Branch or GDSC"
                  required
                />
              </div>

              <div className="event-form__field">
                <label htmlFor="reg-email">Email Address</label>
                <input
                  id="reg-email"
                  type="email"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  placeholder="e.g. alex@campus.edu"
                  required
                />
              </div>

              <div className="event-form__row">
                <div className="event-form__field">
                  <label htmlFor="reg-password">Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    placeholder="Min. 6 chars"
                    required
                  />
                </div>
                <div className="event-form__field">
                  <label htmlFor="reg-confirm">Confirm Password</label>
                  <input
                    id="reg-confirm"
                    type="password"
                    value={regForm.confirmPassword}
                    onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                    placeholder="Repeat password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn--primary"
                id="register-submit-btn"
                disabled={loading}
              >
                {loading ? 'Creating account...' : '✨ Create Organizer Account'}
              </button>

              <div className="auth-card__switch">
                Already have an account?{' '}
                <button
                  type="button"
                  className="auth-card__link"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                  id="switch-to-login"
                >
                  Login here
                </button>
              </div>
            </form>
          )}
        </div>

        {toast && (
          <div className="toast" id="organizer-toast">
            <span className="toast__icon">✅</span>
            {toast}
          </div>
        )}
      </div>
    );
  }

  // ── Authenticated: Organizer Dashboard ──────────────────
  return (
    <div className="organizer-page" id="organizer-dashboard">
      {/* Profile Header */}
      <div className="organizer-profile-card">
        <div className="organizer-profile-card__info">
          <div className="organizer-profile-card__avatar">🏛️</div>
          <div>
            <div className="organizer-profile-card__name-row">
              <h2>{session.name}</h2>
              <span className="organizer-badge">ORGANIZER</span>
            </div>
            <div className="organizer-profile-card__meta">
              <span>🏢 <strong>{session.organization}</strong></span>
              <span>·</span>
              <span>✉️ {session.email}</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn--secondary btn--small"
          onClick={handleLogout}
          id="organizer-logout-btn"
          title="Sign out of organizer dashboard"
        >
          🚪 Logout
        </button>
      </div>

      {/* Dashboard Subnav */}
      <div className="organizer-subnav">
        <button
          type="button"
          className={`organizer-subnav__item${dashboardTab === 'create' ? ' organizer-subnav__item--active' : ''}`}
          onClick={() => setDashboardTab('create')}
          id="dash-tab-create"
        >
          ➕ Post an Event
        </button>
        <button
          type="button"
          className={`organizer-subnav__item${dashboardTab === 'events' ? ' organizer-subnav__item--active' : ''}`}
          onClick={() => setDashboardTab('events')}
          id="dash-tab-events"
        >
          📋 My Events ({myEvents.length})
        </button>
      </div>

      {/* View 1: Create Event */}
      {dashboardTab === 'create' && (
        <div className="organizer-tab-content fade-in" id="dash-create-section">
          <div className="organizer-section-header">
            <h3>Create New Campus Event</h3>
            <p>
              Publishing as <strong>{session.organization}</strong>. The event will immediately appear on the live feed.
            </p>
          </div>

          <EventForm
            venues={venues}
            onSubmit={handleEventSubmit}
            initialOrganizer={session.organization}
          />
        </div>
      )}

      {/* View 2: My Events List */}
      {dashboardTab === 'events' && (
        <div className="organizer-tab-content fade-in" id="dash-events-section">
          <div className="organizer-section-header">
            <h3>Events by {session.organization}</h3>
            <p>Manage and track the events organized by your club</p>
          </div>

          {myEvents.length === 0 ? (
            <div className="saved-page__empty">
              <div className="saved-page__empty-icon">📅</div>
              <p>No events published yet</p>
              <button
                type="button"
                className="btn btn--primary btn--small"
                onClick={() => setDashboardTab('create')}
              >
                Post your first event
              </button>
            </div>
          ) : (
            <div className="organizer-events-list">
              {myEvents.map((evt) => {
                const venue = getVenueById(evt.venueId);
                const startDate = new Date(evt.start);
                const dateStr = startDate.toLocaleDateString([], {
                  month: 'short',
                  day: 'numeric',
                });
                const timeStr = startDate.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div key={evt.id} className="organizer-event-row" id={`org-event-${evt.id}`}>
                    <div className="organizer-event-row__details">
                      <div className="organizer-event-row__top">
                        <span className="event-card__category">{evt.category}</span>
                        <span className="organizer-event-row__time">
                          📅 {dateStr} at {timeStr}
                        </span>
                      </div>
                      <h4 className="organizer-event-row__title">{evt.title}</h4>
                      <div className="organizer-event-row__meta">
                        <span>📍 {venue ? `${venue.name} (${venue.building})` : 'Campus Venue'}</span>
                      </div>
                    </div>

                    <div className="organizer-event-row__actions">
                      <button
                        type="button"
                        className="btn btn--danger btn--small"
                        onClick={() => handleDeleteEvent(evt.id)}
                        id={`delete-event-${evt.id}`}
                        title="Delete event"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Bottom Area: Reset Demo Data */}
      <div className="reset-btn-area">
        <button
          type="button"
          className="btn btn--danger btn--small"
          onClick={handleReset}
          id="reset-demo-btn"
        >
          🔄 Reset Demo Data
        </button>
      </div>

      {toast && (
        <div className="toast" id="organizer-toast">
          <span className="toast__icon">✅</span>
          {toast}
        </div>
      )}
    </div>
  );
}
