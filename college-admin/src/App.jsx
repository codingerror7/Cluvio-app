import React, { useState, useEffect } from 'react';
import { api, getStoredUser, getAuthToken, clearAuthToken } from './lib/api';
import AuthPage from './components/AuthPage';
import CollegeDashboard from './components/CollegeDashboard';
import { Loader2 } from 'lucide-react';
import './index.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const stored = getStoredUser();
      const token = getAuthToken();

      if (token && stored) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.user) {
            setUser(res.user);
          } else {
            setUser(stored);
          }
        } catch (err) {
          console.warn('Session verification error, using cached user:', err);
          setUser(stored);
        }
      }
      setCheckingAuth(false);
    };

    initAuth();
  }, []);

  const handleLoginSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
  };

  const handleLogout = () => {
    api.auth.logout();
    clearAuthToken();
    setUser(null);
  };

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <Loader2 size={36} color="#818cf8" className="animate-spin" />
        <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
          Loading Cluvio College Admin Console...
        </p>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <CollegeDashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}
