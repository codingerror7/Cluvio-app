const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// 30 Days in Milliseconds: 30 days * 24 hours * 60 minutes * 60 seconds * 1000 ms
export const SESSION_INACTIVITY_LIMIT_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_COOKIE_MAX_AGE_SEC = 30 * 24 * 60 * 60; // 30 days in seconds (2,592,000s)

let lastActivityThrottle = 0;

/**
 * Checks if the stored session has expired due to 30 days of inactivity.
 * Returns true if session was found but was expired (> 30 days inactive).
 */
export const checkSessionExpiry = () => {
  if (typeof window === "undefined") return false;

  const token =
    localStorage.getItem("broclubs_token") ||
    localStorage.getItem("cluvio_token");

  if (!token) return false;

  const lastActiveStr =
    localStorage.getItem("broclubs_last_active") ||
    localStorage.getItem("broclubs_session_start");

  const now = Date.now();

  // If no last_active timestamp exists yet for an existing valid session, initialize to now
  if (!lastActiveStr) {
    localStorage.setItem("broclubs_last_active", now.toString());
    localStorage.setItem("broclubs_session_start", now.toString());
    return false;
  }

  const lastActive = parseInt(lastActiveStr, 10);
  if (isNaN(lastActive)) {
    localStorage.setItem("broclubs_last_active", now.toString());
    return false;
  }

  // Check 30 days of inactivity
  if (now - lastActive > SESSION_INACTIVITY_LIMIT_MS) {
    console.warn("BroClubs: User session expired after 30 days of inactivity.");
    clearAuthToken();
    return true;
  }

  return false;
};

/**
 * Updates the user's last activity timestamp in localStorage.
 * Throttled to once every 30 seconds to minimize I/O overhead.
 */
export const updateLastActivity = (force = false) => {
  if (typeof window === "undefined") return;

  const now = Date.now();
  if (force || now - lastActivityThrottle > 30000) {
    lastActivityThrottle = now;
    const token =
      localStorage.getItem("broclubs_token") ||
      localStorage.getItem("cluvio_token");
    if (token) {
      localStorage.setItem("broclubs_last_active", now.toString());
    }
  }
};

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  if (checkSessionExpiry()) {
    return null;
  }

  return (
    localStorage.getItem("broclubs_token") ||
    localStorage.getItem("cluvio_token")
  );
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    const now = Date.now().toString();
    localStorage.setItem("broclubs_token", token);
    localStorage.setItem("broclubs_last_active", now);
    localStorage.setItem("broclubs_session_start", now);

    // Also persist via 30-day cookie for persistent browser storage
    try {
      document.cookie = `broclubs_token=${encodeURIComponent(
        token
      )}; path=/; max-age=${SESSION_COOKIE_MAX_AGE_SEC}; SameSite=Lax`;
    } catch (e) {}
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("broclubs_token");
    localStorage.removeItem("broclubs_user");
    localStorage.removeItem("broclubs_last_active");
    localStorage.removeItem("broclubs_session_start");
    localStorage.removeItem("cluvio_token");
    localStorage.removeItem("cluvio_user");

    try {
      document.cookie = "broclubs_token=; path=/; max-age=0; SameSite=Lax";
    } catch (e) {}
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;

  if (checkSessionExpiry()) {
    return null;
  }

  const user =
    localStorage.getItem("broclubs_user") ||
    localStorage.getItem("cluvio_user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("broclubs_user", JSON.stringify(user));
  }
};

async function fetchWithAuth(endpoint, options = {}) {
  // First check if session is expired due to inactivity
  if (checkSessionExpiry() && typeof window !== "undefined") {
    if (
      window.location.pathname.startsWith("/dashboard") ||
      window.location.pathname.startsWith("/president")
    ) {
      window.location.href = "/Login?reason=inactive";
    }
    throw new Error("Session expired due to 30 days of inactivity. Please log in again.");
  }

  const token = getAuthToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      clearAuthToken();
      if (
        window.location.pathname.startsWith("/dashboard") ||
        window.location.pathname.startsWith("/president")
      ) {
        window.location.href = "/Login?reason=expired";
      }
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  // Any authenticated successful request counts as fresh user activity
  if (token) {
    updateLastActivity();
  }

  return data;
}

export const api = {
  auth: {
    register: async (userData) => {
      const data = await fetchWithAuth("/auth/register", {
        method: "POST",
        body: JSON.stringify(userData),
      });
      if (data.token) {
        setAuthToken(data.token);
        setStoredUser(data.user);
      }
      return data;
    },
    login: async (credentials) => {
      const data = await fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      if (data.token) {
        setAuthToken(data.token);
        setStoredUser(data.user);
      }
      return data;
    },
    me: async () => {
      return fetchWithAuth("/auth/me");
    },
    logout: () => {
      clearAuthToken();
    },
  },
  users: {
    getProfile: async () => {
      return fetchWithAuth("/users/profile");
    },
    updateProfile: async (userData) => {
      const data = await fetchWithAuth("/users/profile", {
        method: "PUT",
        body: JSON.stringify(userData),
      });
      if (data.user) {
        setStoredUser(data.user);
      }
      return data;
    },
  },
  clubs: {
    getAll: async (params) => {
      const query = params ? "?" + new URLSearchParams(params).toString() : "";
      return fetchWithAuth(`/clubs${query}`);
    },
    getById: async (id) => {
      return fetchWithAuth(`/clubs/${id}`);
    },
    create: async (clubData) => {
      return fetchWithAuth("/clubs", {
        method: "POST",
        body: JSON.stringify(clubData),
      });
    },
    update: async (id, clubData) => {
      return fetchWithAuth(`/clubs/${id}`, {
        method: "PUT",
        body: JSON.stringify(clubData),
      });
    },
    delete: async (id) => {
      return fetchWithAuth(`/clubs/${id}`, {
        method: "DELETE",
      });
    },
    getMembers: async (id) => {
      return fetchWithAuth(`/clubs/${id}/members`);
    },
    removeMember: async (clubId, studentId) => {
      return fetchWithAuth(`/clubs/${clubId}/members/${studentId}`, {
        method: "DELETE",
      });
    },
    addEvent: async (clubId, eventData) => {
      return fetchWithAuth(`/clubs/${clubId}/events`, {
        method: "POST",
        body: JSON.stringify(eventData),
      });
    },
    removeEvent: async (clubId, eventId) => {
      return fetchWithAuth(`/clubs/${clubId}/events/${eventId}`, {
        method: "DELETE",
      });
    },
    addAnnouncement: async (clubId, data) => {
      return fetchWithAuth(`/clubs/${clubId}/announcements`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    removeAnnouncement: async (clubId, announcementId) => {
      return fetchWithAuth(`/clubs/${clubId}/announcements/${announcementId}`, {
        method: "DELETE",
      });
    },
    updateRecruitment: async (clubId, settings) => {
      return fetchWithAuth(`/clubs/${clubId}/recruitment`, {
        method: "PUT",
        body: JSON.stringify(settings),
      });
    },
  },
  requests: {
    submit: async (clubId, applicationData = {}) => {
      const payload =
        typeof applicationData === "string"
          ? { clubId, note: applicationData }
          : { clubId, ...applicationData };
      return fetchWithAuth("/requests", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    getMyRequests: async () => {
      return fetchWithAuth("/requests/my");
    },
    cancel: async (id) => {
      return fetchWithAuth(`/requests/${id}`, {
        method: "DELETE",
      });
    },
    getClubRequests: async (clubId = "all") => {
      return fetchWithAuth(`/requests/club/${clubId}`);
    },
    review: async (id, reviewData) => {
      const payload =
        typeof reviewData === "string" ? { action: reviewData } : reviewData;
      return fetchWithAuth(`/requests/${id}/review`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
  },
};
