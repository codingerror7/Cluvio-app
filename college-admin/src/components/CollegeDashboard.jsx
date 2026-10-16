import React, { useState, useEffect } from 'react';
import {
  Building2,
  Users,
  Shield,
  Layers,
  Coins,
  LogOut,
  Sparkles,
  School,
  CheckCircle2,
  Calendar,
  Search,
  ExternalLink,
  BookOpen,
  Mail,
  UserCheck,
  Award,
} from 'lucide-react';
import { api } from '../lib/api';
import '../styles/dashboard.css';

export default function CollegeDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('clubs');
  const [clubs, setClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch clubs from Backend
    api.clubs.getAll()
      .then((data) => {
        if (data.success && Array.isArray(data.clubs)) {
          setClubs(data.clubs);
        } else if (Array.isArray(data)) {
          setClubs(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load clubs:', err);
      })
      .finally(() => {
        setLoadingClubs(false);
      });
  }, []);

  const filteredClubs = clubs.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMembers = clubs.reduce((acc, curr) => acc + (curr.membersCount || 1), 0);
  const totalBudget = clubs.reduce((acc, curr) => acc + (curr.budgetAllocated || 25000), 0);

  return (
    <div className="dashboard-container">
      {/* Sticky Topbar */}
      <header className="dashboard-header">
        <div className="header-left">
          <div className="college-brand-badge">
            <div className="college-icon-circle">
              <School size={22} />
            </div>
            <div className="college-title-group text-left">
              <h2>
                <span>{user.collegeName || 'Campus Administration'}</span>
                {user.collegeCode && (
                  <span className="badge badge-indigo">{user.collegeCode}</span>
                )}
              </h2>
              <p>Cluvio Institutional Operating Console</p>
            </div>
          </div>
        </div>

        <div className="header-right">
          {/* User Profile Badge */}
          <div className="user-profile-badge">
            <img
              src={
                user.avatar ||
                'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
              }
              alt={user.name}
              className="user-avatar"
            />
            <div className="user-details-text">
              <p className="name">{user.name}</p>
              <p className="designation">{user.designation || 'College Administrator'}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={onLogout}
            className="btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Sign out of college panel"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="dashboard-content animate-fade-in">
        {/* Hero Scope Card */}
        <section className="college-hero-banner">
          <div className="hero-text-content text-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-emerald">
                <CheckCircle2 size={12} />
                Verified Campus Session
              </span>
              <span className="badge badge-cyan">
                <Shield size={12} />
                Isolated Panel Scope
              </span>
            </div>

            <h1>{user.collegeName}</h1>
            <p>
              Welcome back, <strong>{user.name}</strong> ({user.designation || 'Administrator'}).
              You are managing the verified institutional portal for <strong>{user.collegeName}</strong>. All clubs, rosters, budgets, and candidate approvals are scoped to this campus.
            </p>

            <div className="hero-badges-row">
              <span className="badge badge-indigo">
                <Mail size={12} />
                {user.email}
              </span>
              <span className="badge badge-amber">
                <Building2 size={12} />
                Department: {user.department || 'Office of Student Welfare'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="btn-secondary"
            >
              <UserCheck size={16} />
              <span>College Profile</span>
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          {/* Card 1: Clubs */}
          <div className="stat-card">
            <div className="stat-info">
              <p className="stat-title">Active Campus Clubs</p>
              <p className="stat-value">{clubs.length || 6}</p>
              <p className="stat-subtitle">Across technical, sports & cultural</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Layers size={22} />
            </div>
          </div>

          {/* Card 2: Students */}
          <div className="stat-card">
            <div className="stat-info">
              <p className="stat-title">Total Active Members</p>
              <p className="stat-value">{totalMembers || 842}</p>
              <p className="stat-subtitle">Enrolled campus students</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Users size={22} />
            </div>
          </div>

          {/* Card 3: Presidents */}
          <div className="stat-card">
            <div className="stat-info">
              <p className="stat-title">Club Presidents</p>
              <p className="stat-value">{clubs.length || 6}</p>
              <p className="stat-subtitle">Executive student leaders</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Award size={22} />
            </div>
          </div>

          {/* Card 4: Budget */}
          <div className="stat-card">
            <div className="stat-info">
              <p className="stat-title">Allocated Budget</p>
              <p className="stat-value">₹{(totalBudget / 1000).toFixed(0)}k</p>
              <p className="stat-subtitle">FY 2026 Student Activity Grant</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Coins size={22} />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="dashboard-nav-tabs">
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'clubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            <Layers size={16} />
            <span>Campus Clubs ({clubs.length})</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Building2 size={16} />
            <span>Institution Profile & Scoping</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'guidelines' ? 'active' : ''}`}
            onClick={() => setActiveTab('guidelines')}
          >
            <BookOpen size={16} />
            <span>Admin Operational Guide</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: CAMPUS CLUBS
           ======================================================== */}
        {activeTab === 'clubs' && (
          <div className="animate-fade-in">
            {/* Search Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div className="input-wrapper" style={{ width: '100%', maxWidth: '380px' }}>
                <span className="input-icon">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search clubs by name or domain..."
                  className="input-field"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Viewing clubs for <strong>{user.collegeName}</strong>
                </span>
              </div>
            </div>

            {/* Clubs Grid */}
            <div className="clubs-grid">
              {filteredClubs.map((club) => (
                <div key={club._id || club.id || club.name} className="club-card">
                  <div>
                    <div className="club-card-header">
                      <div className="club-logo">
                        {club.logo && club.logo.length <= 4 ? club.logo : '🏛️'}
                      </div>
                      <div className="club-meta text-left">
                        <h3>{club.name}</h3>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <span className="badge badge-indigo">{club.category}</span>
                          <span className="badge badge-emerald">{club.status || 'Active'}</span>
                        </div>
                      </div>
                    </div>

                    <p className="club-desc">{club.description}</p>
                  </div>

                  <div className="club-stats-row">
                    <div>
                      <span>Members: </span>
                      <strong style={{ color: '#ffffff' }}>{club.membersCount || 1}</strong>
                    </div>
                    <div>
                      <span>Budget: </span>
                      <strong style={{ color: '#10b981' }}>₹{club.budgetAllocated?.toLocaleString('en-IN') || '25,000'}</strong>
                    </div>
                    <div>
                      <span>Schedule: </span>
                      <strong style={{ color: '#ffffff' }}>{club.meetingSchedule || 'Weekly'}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: INSTITUTION PROFILE
           ======================================================== */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="profile-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '18px' }}>
                <div className="college-icon-circle" style={{ width: '52px', height: '52px' }}>
                  <Building2 size={28} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                    {user.collegeName}
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Isolated Campus Node • Code: {user.collegeCode || 'N/A'}
                  </p>
                </div>
              </div>

              <div className="profile-info-grid">
                <div className="profile-field">
                  <p className="profile-field-label">Official College Name</p>
                  <p className="profile-field-value">{user.collegeName}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">College Acronym / Code</p>
                  <p className="profile-field-value">{user.collegeCode || 'DTU'}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Registered Administrator</p>
                  <p className="profile-field-value">{user.name}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Designation / Office</p>
                  <p className="profile-field-value">{user.designation || 'Dean of Student Affairs'}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Official Institutional Email</p>
                  <p className="profile-field-value">{user.email}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Authority Department</p>
                  <p className="profile-field-value">{user.department || 'Office of Student Welfare'}</p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Security & Isolation Status</p>
                  <p className="profile-field-value" style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={16} />
                    Verified Campus Partition
                  </p>
                </div>

                <div className="profile-field">
                  <p className="profile-field-label">Campus Platform Version</p>
                  <p className="profile-field-value">Cluvio Enterprise v2.4 (2026)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: OPERATIONAL GUIDE
           ======================================================== */}
        {activeTab === 'guidelines' && (
          <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="profile-card" style={{ maxWidth: '780px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                College Administrator Responsibilities
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                As the administrator for <strong>{user.collegeName}</strong>, your panel grants you direct oversight of all student organizations registered under your university.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="profile-field">
                  <h4 style={{ fontSize: '0.9rem', color: '#818cf8', fontWeight: 700, marginBottom: '4px' }}>
                    1. Scoped Campus Data
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    Every user, club president, and membership request belonging to {user.collegeName} is linked to this college partition. Only students from your university will participate in your college's ecosystem.
                  </p>
                </div>

                <div className="profile-field">
                  <h4 style={{ fontSize: '0.9rem', color: '#22d3ee', fontWeight: 700, marginBottom: '4px' }}>
                    2. Club Charters & Annual Handover
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    Club presidents can submit semester reports and budget requests directly to the Dean's office through the portal.
                  </p>
                </div>

                <div className="profile-field">
                  <h4 style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, marginBottom: '4px' }}>
                    3. Institutional Compliance
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                    All student events, hackathons, and guest invitations adhere to campus guidelines verified by the college administration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
