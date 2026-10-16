import React, { useState, useEffect } from 'react';
import {
  Building2,
  Mail,
  Lock,
  User,
  BadgeCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Sparkles,
  School,
  FileBadge,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../lib/api';
import '../styles/auth.css';

const POPULAR_COLLEGES = [
  { name: 'Delhi Technological University (DTU)', code: 'DTU' },
  { name: 'Indian Institute of Technology Delhi (IITD)', code: 'IITD' },
  { name: 'Indian Institute of Technology Bombay (IITB)', code: 'IITB' },
  { name: 'BITS Pilani', code: 'BITS' },
  { name: 'Vellore Institute of Technology (VIT)', code: 'VIT' },
  { name: 'National Institute of Technology Trichy', code: 'NITT' },
  { name: 'Delhi University (DU)', code: 'DU' },
];

export default function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Common Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register Fields
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeCode, setCollegeCode] = useState('');
  const [designation, setDesignation] = useState('Dean of Student Welfare');
  const [department, setDepartment] = useState('Student Affairs & Clubs');

  // Existing Colleges in DB for auto-complete
  const [existingColleges, setExistingColleges] = useState([]);

  useEffect(() => {
    // Fetch registered colleges from API
    api.auth.getColleges()
      .then((data) => {
        if (data.success && Array.isArray(data.colleges)) {
          setExistingColleges(data.colleges);
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectCollege = (col) => {
    setCollegeName(col.name);
    setCollegeCode(col.code || '');
    setError(null);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      const response = await api.auth.login({
        email: email.trim(),
        password,
      });

      if (response.success && response.user) {
        setSuccessMsg(`Welcome back, ${response.user.name}! Accessing ${response.user.collegeName || 'College'} Panel...`);
        setTimeout(() => {
          onLoginSuccess(response.user);
        }, 600);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your college administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Validation
    if (!collegeName.trim()) {
      setError('College Name is strictly required. Each College Admin is provisioned to their specific university panel.');
      return;
    }

    if (!fullName.trim()) {
      setError('Please provide your full administrative name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid official institutional email.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please re-enter your confirmation password.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.auth.register({
        name: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        collegeName: collegeName.trim(),
        collegeCode: collegeCode.trim().toUpperCase(),
        designation: designation.trim(),
        department: department.trim(),
      });

      if (response.success && response.user) {
        setSuccessMsg(`College registered successfully! Setting up ${response.user.collegeName} workspace...`);
        setTimeout(() => {
          onLoginSuccess(response.user);
        }, 800);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. An account with this email may already exist.');
    } finally {
      setLoading(false);
    }
  };

  // Demo auto-fill handlers
  const handleFillDemoLogin = () => {
    setEmail('collegeadmin@dtu.ac.in');
    setPassword('Admin@123');
    setError(null);
  };

  const handleFillDemoRegisterDTU = () => {
    setCollegeName('Delhi Technological University (DTU)');
    setCollegeCode('DTU');
    setFullName('Prof. Anil K. Sachdeva');
    setEmail(`dean.clubs.${Math.floor(100 + Math.random() * 900)}@dtu.ac.in`);
    setDesignation('Director of Student Activities');
    setDepartment('Office of Student Welfare');
    setPassword('Admin@123');
    setConfirmPassword('Admin@123');
    setError(null);
  };

  const handleFillDemoRegisterIITB = () => {
    setCollegeName('Indian Institute of Technology Bombay (IITB)');
    setCollegeCode('IITB');
    setFullName('Dr. Meenakshi Sundaram');
    setEmail(`dean.sa.${Math.floor(100 + Math.random() * 900)}@iitb.ac.in`);
    setDesignation('Dean of Student Affairs');
    setDepartment('Campus Life & Societies');
    setPassword('Admin@123');
    setConfirmPassword('Admin@123');
    setError(null);
  };

  return (
    <div className="auth-container">
      {/* Brand Header */}
      <div className="auth-header-brand">
        <div className="auth-logo-icon">
          <Building2 size={24} />
        </div>
        <div className="auth-brand-text">
          <h1>Cluvio Campus</h1>
          <p>College Administration Operations System</p>
        </div>
      </div>

      {/* Main Glass Auth Card */}
      <div className="auth-card glass-panel-glow animate-fade-in">
        {/* Portal Scope Badge */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <span className="badge badge-indigo">
            <School size={12} />
            Institutional Access Portal
          </span>
        </div>

        {/* Auth Mode Tabs */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => {
              setMode('login');
              setError(null);
              setSuccessMsg(null);
            }}
          >
            <BadgeCheck size={16} />
            <span>Sign In to College</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
            onClick={() => {
              setMode('register');
              setError(null);
              setSuccessMsg(null);
            }}
          >
            <Building2 size={16} />
            <span>Register College</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="error-banner animate-fade-in">
            <ShieldAlert size={18} style={{ shrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: 600 }}>Action Required</p>
              <p style={{ fontSize: '0.75rem', opacity: 0.9 }}>{error}</p>
            </div>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="success-banner animate-fade-in">
            <CheckCircle2 size={18} style={{ shrink: 0 }} />
            <div>
              <p style={{ fontWeight: 600 }}>{successMsg}</p>
            </div>
          </div>
        )}

        {/* ========================================================
            LOGIN FORM
           ======================================================== */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="animate-fade-in">
            {/* Quick Preset Banner */}
            <div className="demo-fill-card">
              <div className="demo-fill-label">
                <Sparkles size={14} color="#818cf8" />
                <span>Demo Account: <strong>collegeadmin@dtu.ac.in</strong></span>
              </div>
              <button
                type="button"
                onClick={handleFillDemoLogin}
                className="demo-fill-btn"
              >
                Auto-fill
              </button>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">
                <span>Administrator Email</span>
                <span className="helper-badge">Campus Domain</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Mail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. dean.clubs@college.edu"
                  required
                  className="input-field"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label className="form-label">
                <span>Account Password</span>
              </label>
              <div className="input-wrapper">
                <span className="input-icon">
                  <Lock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  required
                  className="input-field pr-btn"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="input-right-btn"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', height: '44px', marginTop: '10px' }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Verifying Institutional Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to College Panel</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                New university or campus administrator?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#818cf8',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Register your college here
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ========================================================
            REGISTER FORM (COLLEGE NAME IS MANDATORY)
           ======================================================== */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="animate-fade-in">
            {/* Quick Preset Banner */}
            <div className="demo-fill-card">
              <div className="demo-fill-label">
                <Sparkles size={14} color="#818cf8" />
                <span>Fill Demo College Profile:</span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={handleFillDemoRegisterDTU}
                  className="demo-fill-btn"
                >
                  DTU Admin
                </button>
                <button
                  type="button"
                  onClick={handleFillDemoRegisterIITB}
                  className="demo-fill-btn"
                >
                  IITB Admin
                </button>
              </div>
            </div>

            {/* COLLEGE NAME INPUT - HIGHLY PROMINENT */}
            <div className="form-group college-highlight-box">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <School size={15} color="#818cf8" />
                  <strong>College / University Name</strong>
                  <span className="required-tag">*</span>
                </span>
                <span className="helper-badge">Required for Scoped Panel</span>
              </label>

              <div className="input-wrapper" style={{ marginTop: '6px' }}>
                <span className="input-icon">
                  <Building2 size={16} color="#818cf8" />
                </span>
                <input
                  type="text"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  placeholder="e.g. Delhi Technological University (DTU)"
                  required
                  className="input-field"
                  style={{ borderColor: collegeName ? '#818cf8' : undefined }}
                />
              </div>

              {/* Suggestions Chips */}
              <div style={{ marginTop: '8px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '4px' }}>
                  Quick select popular university or type custom name:
                </p>
                <div className="college-suggestions">
                  {POPULAR_COLLEGES.map((col) => (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => handleSelectCollege(col)}
                      className={`college-pill ${collegeName === col.name ? 'selected' : ''}`}
                    >
                      <span>{col.code}</span>
                      <span style={{ opacity: 0.7 }}>•</span>
                      <span>{col.name.split(' (')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* College Acronym & Designation Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span>College Code / Acronym</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <FileBadge size={16} />
                  </span>
                  <input
                    type="text"
                    value={collegeCode}
                    onChange={(e) => setCollegeCode(e.target.value)}
                    placeholder="e.g. DTU / IITD"
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Designation / Role</span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <BadgeCheck size={16} />
                  </span>
                  <input
                    type="text"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="e.g. Dean of Student Affairs"
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Admin Full Name & Official Email Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span>Administrator Full Name<span className="required-tag">*</span></span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <User size={16} />
                  </span>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    required
                    className="input-field"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Official Email<span className="required-tag">*</span></span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Mail size={16} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@college.ac.in"
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Passwords Row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span>Password<span className="required-tag">*</span></span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    required
                    className="input-field pr-btn"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-right-btn"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span>Confirm Password<span className="required-tag">*</span></span>
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <Lock size={16} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-type password"
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', height: '46px', marginTop: '12px' }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Provisioning College Admin Panel...</span>
                </>
              ) : (
                <>
                  <Building2 size={16} />
                  <span>Register & Initialize College Console</span>
                </>
              )}
            </button>

            <div style={{ marginTop: '18px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                Already registered your college?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#818cf8',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Sign in here
                </button>
              </p>
            </div>
          </form>
        )}
      </div>

      {/* Footer Info */}
      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', maxWidth: '420px', lineHeight: 1.4 }}>
          Each college administrator is granted scoped isolation. All student memberships, club budgets, and activity requests are tied directly to your registered college.
        </p>
      </div>
    </div>
  );
}
