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
  BookOpen,
  Mail,
  UserCheck,
  Award,
  Clock,
  XCircle,
  FileCheck,
  Key,
  Trash2,
  Plus,
  RefreshCw,
  X,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { api } from '../lib/api';
import '../styles/dashboard.css';

export default function CollegeDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('approvals');

  // Stats
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  // Approvals
  const [approvals, setApprovals] = useState([]);
  const [approvalCounts, setApprovalCounts] = useState({ totalPending: 0 });
  const [approvalFilter, setApprovalFilter] = useState('Pending');
  const [loadingApprovals, setLoadingApprovals] = useState(false);
  const [rejectionModal, setRejectionModal] = useState({ isOpen: false, item: null, reason: '' });
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // Presidents & 6-Digit Codes
  const [presidents, setPresidents] = useState([]);
  const [presidentCodes, setPresidentCodes] = useState([]);
  const [loadingPresidents, setLoadingPresidents] = useState(false);
  const [codeModal, setCodeModal] = useState({
    isOpen: false,
    email: '',
    enrollmentNumber: '',
    targetClubName: '',
  });

  // Students
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Clubs
  const [clubs, setClubs] = useState([]);
  const [loadingClubs, setLoadingClubs] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Events
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(false);

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  // Feedback Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // 1. Fetch Top-Level Dashboard Stats
  const fetchDashboardStats = async () => {
    try {
      setLoadingStats(true);
      const res = await api.dashboard.getStats();
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch (err) {
      console.warn('Dashboard stats fallback:', err);
    } finally {
      setLoadingStats(false);
    }
  };

  // 2. Fetch Approvals
  const fetchApprovals = async () => {
    try {
      setLoadingApprovals(true);
      const [appRes, countRes] = await Promise.all([
        api.approvals.getAll({ status: approvalFilter }),
        api.approvals.getCounts().catch(() => ({ counts: { totalPending: 0 } })),
      ]);

      if (appRes.success && Array.isArray(appRes.approvals)) {
        setApprovals(appRes.approvals);
      }
      if (countRes.counts) {
        setApprovalCounts(countRes.counts);
      }
    } catch (err) {
      console.warn('Approvals fetch error:', err);
    } finally {
      setLoadingApprovals(false);
    }
  };

  // 3. Fetch Presidents & Codes
  const fetchPresidentsAndCodes = async () => {
    try {
      setLoadingPresidents(true);
      const [presRes, codesRes] = await Promise.all([
        api.presidents.getAll().catch(() => ({ presidents: [] })),
        api.presidents.getCodes().catch(() => ({ codes: [] })),
      ]);

      if (presRes.success && Array.isArray(presRes.presidents)) {
        setPresidents(presRes.presidents);
      }
      if (codesRes.success && Array.isArray(codesRes.codes)) {
        setPresidentCodes(codesRes.codes);
      }
    } catch (err) {
      console.warn('Presidents load error:', err);
    } finally {
      setLoadingPresidents(false);
    }
  };

  // 4. Fetch Students
  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      const res = await api.students.getAll();
      if (res.success && Array.isArray(res.students)) {
        setStudents(res.students);
      }
    } catch (err) {
      console.warn('Students load error:', err);
    } finally {
      setLoadingStudents(false);
    }
  };

  // 5. Fetch Clubs
  const fetchClubs = async () => {
    try {
      setLoadingClubs(true);
      const res = await api.clubs.getAll({ status: 'all' });
      if (res.success && Array.isArray(res.clubs)) {
        setClubs(res.clubs);
      }
    } catch (err) {
      console.warn('Clubs load error:', err);
    } finally {
      setLoadingClubs(false);
    }
  };

  // 6. Fetch Events
  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const res = await api.events.getAll({ status: 'all' });
      if (res.success && Array.isArray(res.events)) {
        setEvents(res.events);
      }
    } catch (err) {
      console.warn('Events load error:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  // 7. Fetch Audit Logs
  const fetchAuditLogs = async () => {
    try {
      setLoadingAudit(true);
      const res = await api.auditLogs.getAll();
      if (res.success && Array.isArray(res.logs)) {
        setAuditLogs(res.logs);
      }
    } catch (err) {
      console.warn('Audit logs load error:', err);
    } finally {
      setLoadingAudit(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
    fetchApprovals();
    fetchPresidentsAndCodes();
    fetchStudents();
    fetchClubs();
  }, []);

  useEffect(() => {
    if (activeTab === 'approvals') fetchApprovals();
    if (activeTab === 'presidents') fetchPresidentsAndCodes();
    if (activeTab === 'students') fetchStudents();
    if (activeTab === 'clubs') fetchClubs();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'audit') fetchAuditLogs();
  }, [activeTab, approvalFilter]);

  // Approval Handlers
  const handleApprove = async (id) => {
    try {
      setActionLoadingId(id);
      const res = await api.approvals.approve(id);
      if (res.success) {
        showToast('Request approved successfully. Resource is now active.');
        fetchApprovals();
        fetchDashboardStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to approve request.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleOpenRejectModal = (item) => {
    setRejectionModal({ isOpen: true, item, reason: '' });
  };

  const handleConfirmReject = async (e) => {
    e.preventDefault();
    if (!rejectionModal.reason.trim()) {
      alert('A rejection reason is strictly required.');
      return;
    }

    try {
      setActionLoadingId(rejectionModal.item._id);
      const res = await api.approvals.reject(rejectionModal.item._id, rejectionModal.reason);
      if (res.success) {
        showToast('Request rejected and requester has been notified with the reason.');
        setRejectionModal({ isOpen: false, item: null, reason: '' });
        fetchApprovals();
        fetchDashboardStats();
      }
    } catch (err) {
      showToast(err.message || 'Failed to reject request.', 'error');
    } finally {
      setActionLoadingId(null);
    }
  };

  // Generate President Code Handler
  const handleGenerateCode = async (e) => {
    e.preventDefault();
    if (!codeModal.email.trim() || !codeModal.enrollmentNumber.trim()) {
      alert('Student email and enrollment number are required.');
      return;
    }

    try {
      const res = await api.presidents.generateCode({
        email: codeModal.email,
        enrollmentNumber: codeModal.enrollmentNumber,
        targetClubName: codeModal.targetClubName,
      });

      if (res.success) {
        showToast(`President Code ${res.presidentCode?.code} generated successfully!`);
        setCodeModal({ isOpen: false, email: '', enrollmentNumber: '', targetClubName: '' });
        fetchPresidentsAndCodes();
      }
    } catch (err) {
      alert(err.message || 'Failed to generate president code.');
    }
  };

  const handleRevokeCode = async (id) => {
    if (!window.confirm('Are you sure you want to deactivate this President Code?')) return;
    try {
      const res = await api.presidents.revokeCode(id);
      if (res.success) {
        showToast('President code revoked.');
        fetchPresidentsAndCodes();
      }
    } catch (err) {
      alert(err.message || 'Failed to revoke code.');
    }
  };

  const totalMembers = clubs.reduce((acc, curr) => acc + (curr.membersCount || 1), 0);
  const totalBudget = clubs.reduce((acc, curr) => acc + (curr.budgetAllocated || 25000), 0);
  const pendingCount = approvalCounts.totalPending || stats?.pendingApprovals || 0;

  return (
    <div className="dashboard-container">
      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 1000,
            background: toast.type === 'error' ? '#ef4444' : '#10b981',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
          }}
        >
          {toast.message}
        </div>
      )}

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
          <div className="user-profile-badge">
            <img
              src={user.avatar || '/avatars/avatar-4.svg'}
              alt={user.name}
              className="user-avatar"
            />
            <div className="user-details-text">
              <p className="name">{user.name}</p>
              <p className="designation">{user.designation || 'College Administrator'}</p>
            </div>
          </div>

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
                Verified Institutional Scope
              </span>
              <span className="badge badge-cyan">
                <Shield size={12} />
                Tenant Isolated: {user.collegeCode || 'DTU'}
              </span>
            </div>

            <h1>{user.collegeName}</h1>
            <p>
              Welcome back, <strong>{user.name}</strong> ({user.designation || 'Dean of Student Welfare'}).
              As the administrative authority for <strong>{user.collegeName}</strong>, all student profiles, club charters, memberships, and events require your review and moderation.
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
        </section>

        {/* Stats Grid */}
        <section className="stats-grid">
          <div className="stat-card" onClick={() => setActiveTab('approvals')} style={{ cursor: 'pointer' }}>
            <div className="stat-info">
              <p className="stat-title">Pending Approvals</p>
              <p className="stat-value" style={{ color: pendingCount > 0 ? '#f59e0b' : '#10b981' }}>
                {pendingCount}
              </p>
              <p className="stat-subtitle">Awaiting administrative decision</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
              <Clock size={22} />
            </div>
          </div>

          <div className="stat-card" onClick={() => setActiveTab('students')} style={{ cursor: 'pointer' }}>
            <div className="stat-info">
              <p className="stat-title">Total Students</p>
              <p className="stat-value">{stats?.totalStudents ?? students.length ?? 4}</p>
              <p className="stat-subtitle">Enrolled campus candidates</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee' }}>
              <Users size={22} />
            </div>
          </div>

          <div className="stat-card" onClick={() => setActiveTab('clubs')} style={{ cursor: 'pointer' }}>
            <div className="stat-info">
              <p className="stat-title">Active Campus Clubs</p>
              <p className="stat-value">{stats?.activeClubs ?? clubs.length ?? 2}</p>
              <p className="stat-subtitle">Chartered student chapters</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
              <Layers size={22} />
            </div>
          </div>

          <div className="stat-card" onClick={() => setActiveTab('presidents')} style={{ cursor: 'pointer' }}>
            <div className="stat-info">
              <p className="stat-title">Club Presidents</p>
              <p className="stat-value">{stats?.totalPresidents ?? presidents.length ?? 2}</p>
              <p className="stat-subtitle">Authorized student leaders</p>
            </div>
            <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <Award size={22} />
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="dashboard-nav-tabs">
          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
            onClick={() => setActiveTab('approvals')}
          >
            <FileCheck size={16} />
            <span>Approval Center</span>
            {pendingCount > 0 && (
              <span className="badge badge-amber" style={{ marginLeft: '6px', padding: '2px 8px' }}>
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'presidents' ? 'active' : ''}`}
            onClick={() => setActiveTab('presidents')}
          >
            <Key size={16} />
            <span>President Management & Codes</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            <Users size={16} />
            <span>Student Roster ({students.length})</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'clubs' ? 'active' : ''}`}
            onClick={() => setActiveTab('clubs')}
          >
            <Layers size={16} />
            <span>Clubs ({clubs.length})</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Calendar size={16} />
            <span>Events</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <FileText size={16} />
            <span>Audit Trail</span>
          </button>

          <button
            type="button"
            className={`dash-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <Building2 size={16} />
            <span>Institutional Scope</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: APPROVAL CENTER
           ======================================================== */}
        {activeTab === 'approvals' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Universal Approval Center</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Review all pending student profiles, club charters, memberships, and events requiring administrative authorization.
                </p>
              </div>

              {/* Status Filter */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Pending', 'Approved', 'Rejected', 'all'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setApprovalFilter(st)}
                    className="btn-outline"
                    style={{
                      background: approvalFilter === st ? '#6366f1' : 'transparent',
                      color: approvalFilter === st ? '#fff' : '#94a3b8',
                      borderColor: approvalFilter === st ? '#6366f1' : 'rgba(255,255,255,0.1)',
                      padding: '6px 14px',
                      fontSize: '12px',
                    }}
                  >
                    {st === 'all' ? 'All History' : st}
                  </button>
                ))}
              </div>
            </div>

            {loadingApprovals ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8', fontSize: '13px' }}>
                Loading approval requests...
              </div>
            ) : approvals.length === 0 ? (
              <div className="empty-state-box" style={{ padding: '60px 20px', textAlign: 'center', background: '#0e1322', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <CheckCircle2 size={36} color="#10b981" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 600 }}>No Pending Approvals</h4>
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>
                  You are all caught up! There are currently no pending requests requiring decision in this view.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {approvals.map((app) => (
                  <div
                    key={app._id}
                    style={{
                      background: '#0d111d',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '16px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span className="badge badge-indigo font-mono">
                          {app.actionType?.replace('_', ' ')}
                        </span>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>
                          Resource: {app.resourceType}
                        </span>
                        <span
                          className={`badge ${
                            app.status === 'Approved'
                              ? 'badge-emerald'
                              : app.status === 'Pending'
                              ? 'badge-amber'
                              : 'badge-rose'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                        Submitted {new Date(app.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    {/* Metadata details */}
                    <div style={{ background: '#070a13', padding: '12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)', fontSize: '12px', color: '#cbd5e1' }}>
                      <p>
                        <strong>Requested by:</strong> {app.requestedBy?.name || 'Student'} ({app.requestedBy?.email || 'N/A'}) • Enrollment: {app.requestedBy?.enrollmentNumber || 'N/A'}
                      </p>
                      {app.metadata?.name && <p>• <strong>Target Name:</strong> {app.metadata.name}</p>}
                      {app.metadata?.clubName && <p>• <strong>Target Club:</strong> {app.metadata.clubName}</p>}
                      {app.metadata?.motivation && <p>• <strong>Motivation:</strong> &ldquo;{app.metadata.motivation}&rdquo;</p>}
                      {app.metadata?.title && <p>• <strong>Title:</strong> {app.metadata.title}</p>}
                      {app.reason && <p style={{ color: '#f87171' }}>• <strong>Rejection Reason:</strong> &ldquo;{app.reason}&rdquo;</p>}
                    </div>

                    {/* Actions if Pending */}
                    {app.status === 'Pending' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '4px' }}>
                        <button
                          type="button"
                          onClick={() => handleOpenRejectModal(app)}
                          disabled={actionLoadingId === app._id}
                          className="btn-outline"
                          style={{ borderColor: 'rgba(239, 68, 68, 0.4)', color: '#f87171', padding: '6px 14px', fontSize: '12px' }}
                        >
                          Reject with Reason
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprove(app._id)}
                          disabled={actionLoadingId === app._id}
                          style={{
                            background: '#10b981',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 18px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '12px',
                            cursor: 'pointer',
                          }}
                        >
                          {actionLoadingId === app._id ? 'Processing...' : 'Approve Request'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rejection Modal */}
        {rejectionModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#0e1322', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '480px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>Reject Request</h3>
                <button
                  type="button"
                  onClick={() => setRejectionModal({ isOpen: false, item: null, reason: '' })}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleConfirmReject}>
                <p style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '12px' }}>
                  Please specify the institutional reason for rejecting this {rejectionModal.item?.actionType?.replace('_', ' ')} request. This will be transmitted directly to the requester.
                </p>

                <textarea
                  value={rejectionModal.reason}
                  onChange={(e) => setRejectionModal({ ...rejectionModal, reason: e.target.value })}
                  placeholder="e.g. Incomplete credentials, club charter does not meet campus activity guidelines..."
                  rows={4}
                  required
                  style={{ width: '100%', background: '#070a13', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '12px', color: '#fff', fontSize: '13px', marginBottom: '16px', outline: 'none' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setRejectionModal({ isOpen: false, item: null, reason: '' })}
                    className="btn-outline"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Confirm Rejection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: PRESIDENT MANAGEMENT & 6-DIGIT CODES
           ======================================================== */}
        {activeTab === 'presidents' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>President Management & Authorization Codes</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>
                  Generate and assign secure 6-digit activation codes for student leaders authorized to charter and manage campus clubs.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCodeModal({ isOpen: true, email: '', enrollmentNumber: '', targetClubName: '' })}
                style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', padding: '10px 18px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Plus size={16} />
                <span>Generate 6-Digit Code</span>
              </button>
            </div>

            {/* Generated Codes Table */}
            <div style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
                Active & Historical President Activation Codes
              </h4>

              {presidentCodes.length === 0 ? (
                <p style={{ fontSize: '12px', color: '#64748b', textAlign: 'center', padding: '20px' }}>
                  No president codes generated yet. Click &ldquo;Generate 6-Digit Code&rdquo; above.
                </p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                        <th style={{ padding: '10px' }}>6-Digit Code</th>
                        <th style={{ padding: '10px' }}>Assigned Email</th>
                        <th style={{ padding: '10px' }}>Enrollment No.</th>
                        <th style={{ padding: '10px' }}>Target Club</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px' }}>Created</th>
                        <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {presidentCodes.map((code) => (
                        <tr key={code._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#cbd5e1' }}>
                          <td style={{ padding: '10px', fontFamily: 'monospace', fontWeight: 'bold', color: '#818cf8', fontSize: '14px' }}>
                            {code.code}
                          </td>
                          <td style={{ padding: '10px' }}>{code.assignedEmail}</td>
                          <td style={{ padding: '10px', fontFamily: 'monospace' }}>{code.assignedEnrollment}</td>
                          <td style={{ padding: '10px' }}>{code.targetClubName || 'Any Charter'}</td>
                          <td style={{ padding: '10px' }}>
                            <span
                              className={`badge ${
                                code.status === 'Active'
                                  ? 'badge-emerald'
                                  : code.status === 'Used'
                                  ? 'badge-cyan'
                                  : 'badge-rose'
                              }`}
                            >
                              {code.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px', fontFamily: 'monospace', fontSize: '11px', color: '#64748b' }}>
                            {new Date(code.createdAt).toLocaleDateString('en-GB')}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'right' }}>
                            {code.status === 'Active' && (
                              <button
                                type="button"
                                onClick={() => handleRevokeCode(code._id)}
                                className="btn-outline"
                                style={{ padding: '4px 10px', fontSize: '11px', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Verified Presidents List */}
            <div style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '12px' }}>
                Verified Club Presidents ({presidents.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {presidents.map((p) => (
                  <div
                    key={p.id || p._id}
                    style={{ background: '#070a13', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}
                  >
                    <img src={p.avatar || '/avatars/avatar-2.svg'} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '12px', objectCover: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>{p.name}</p>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>{p.department} • {p.year}</p>
                      <p style={{ fontSize: '11px', color: '#818cf8', fontWeight: 600 }}>{p.assignedClub?.name || 'Active President'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Generate Code Modal */}
        {codeModal.isOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: '#0e1322', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '440px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}>Generate 6-Digit President Code</h3>
                <button
                  type="button"
                  onClick={() => setCodeModal({ isOpen: false, email: '', enrollmentNumber: '', targetClubName: '' })}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleGenerateCode} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Eligible Student Email</label>
                  <input
                    type="email"
                    value={codeModal.email}
                    onChange={(e) => setCodeModal({ ...codeModal, email: e.target.value })}
                    placeholder="student@campus.edu"
                    required
                    style={{ width: '100%', background: '#070a13', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Enrollment / Student ID</label>
                  <input
                    type="text"
                    value={codeModal.enrollmentNumber}
                    onChange={(e) => setCodeModal({ ...codeModal, enrollmentNumber: e.target.value })}
                    placeholder="e.g. STU-2026-0142"
                    required
                    style={{ width: '100%', background: '#070a13', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none', fontFamily: 'monospace' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '12px', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Designated Club Name (Optional)</label>
                  <input
                    type="text"
                    value={codeModal.targetClubName}
                    onChange={(e) => setCodeModal({ ...codeModal, targetClubName: e.target.value })}
                    placeholder="e.g. Robotics Society"
                    style={{ width: '100%', background: '#070a13', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '10px', color: '#fff', fontSize: '13px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setCodeModal({ isOpen: false, email: '', enrollmentNumber: '', targetClubName: '' })}
                    className="btn-outline"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 18px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Generate & Authorize
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: STUDENT ROSTER
           ======================================================== */}
        {activeTab === 'students' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Student Roster ({students.length})</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Verified student profiles belonging to {user.collegeName}.</p>
              </div>
            </div>

            <div style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                      <th style={{ padding: '10px' }}>Student</th>
                      <th style={{ padding: '10px' }}>Enrollment ID</th>
                      <th style={{ padding: '10px' }}>Department</th>
                      <th style={{ padding: '10px' }}>Course & Year</th>
                      <th style={{ padding: '10px' }}>Profile Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((stu) => (
                      <tr key={stu._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#cbd5e1' }}>
                        <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={stu.avatar || '/avatars/avatar-1.svg'} alt={stu.name} style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                          <div>
                            <p style={{ fontWeight: 600, color: '#fff' }}>{stu.name}</p>
                            <p style={{ fontSize: '10px', color: '#64748b' }}>{stu.email}</p>
                          </div>
                        </td>
                        <td style={{ padding: '10px', fontFamily: 'monospace' }}>{stu.enrollmentNumber || stu.studentId}</td>
                        <td style={{ padding: '10px' }}>{stu.department}</td>
                        <td style={{ padding: '10px' }}>{stu.course || 'B.Tech'} • {stu.year}</td>
                        <td style={{ padding: '10px' }}>
                          <span
                            className={`badge ${
                              stu.profileStatus === 'Approved'
                                ? 'badge-emerald'
                                : stu.profileStatus === 'Pending'
                                ? 'badge-amber'
                                : 'badge-rose'
                            }`}
                          >
                            {stu.profileStatus || 'Approved'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: CLUBS
           ======================================================== */}
        {activeTab === 'clubs' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Campus Clubs ({clubs.length})</h3>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>All chartered and proposed clubs in {user.collegeName}.</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {clubs.map((c) => (
                <div
                  key={c._id}
                  style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '32px' }}>{c.logo || '💻'}</div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>{c.name}</h4>
                      <p style={{ fontSize: '11px', color: '#94a3b8' }}>{c.category} • {c.sector}</p>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5', marginBottom: '16px' }}>{c.description}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', fontSize: '11px', fontFamily: 'monospace' }}>
                    <span style={{ color: '#94a3b8' }}>{c.membersCount || 1} Members</span>
                    <span className={`badge ${c.status === 'Active' ? 'badge-emerald' : 'badge-amber'}`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 5: EVENTS
           ======================================================== */}
        {activeTab === 'events' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>College Events ({events.length})</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Events created by club presidents and reviewed by College Admin.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {events.map((ev) => (
                <div key={ev._id} style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>{ev.title}</h4>
                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>{ev.date} • {ev.location} • Capacity: {ev.capacity}</p>
                  </div>
                  <span className={`badge ${ev.status === 'Approved' ? 'badge-emerald' : 'badge-amber'}`}>
                    {ev.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 6: AUDIT TRAIL
           ======================================================== */}
        {activeTab === 'audit' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' }}>Institutional Audit Log</h3>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '20px' }}>Comprehensive chronological record of all administrative and student transactions in {user.collegeName}.</p>

            <div style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {auditLogs.map((log) => (
                  <div key={log._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{log.title}</span>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>
                        {new Date(log.createdAt).toLocaleTimeString()} • {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{log.description}</p>
                    <span style={{ fontSize: '10px', color: '#818cf8', fontFamily: 'monospace' }}>
                      Actor: {log.actorName} ({log.actorRole})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 7: INSTITUTIONAL PROFILE
           ======================================================== */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>Tenant Configuration & Scope</h3>
            <div style={{ background: '#0d111d', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '24px', spaceY: '12px' }}>
              <p style={{ color: '#cbd5e1', fontSize: '13px' }}><strong>Institution:</strong> {user.collegeName}</p>
              <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px' }}><strong>College Code:</strong> {user.collegeCode || 'DTU'}</p>
              <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px' }}><strong>Official Admin Email:</strong> {user.email}</p>
              <p style={{ color: '#cbd5e1', fontSize: '13px', marginTop: '6px' }}><strong>Designation:</strong> {user.designation || 'Dean of Student Welfare'}</p>
              <p style={{ color: '#10b981', fontSize: '12px', marginTop: '12px' }}>✓ Multi-tenant isolation active: All database queries enforce college-level scoping.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
