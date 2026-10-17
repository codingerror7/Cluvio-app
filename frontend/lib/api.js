const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const SESSION_INACTIVITY_LIMIT_MS = 30 * 24 * 60 * 60 * 1000;
const SESSION_COOKIE_MAX_AGE_SEC = 30 * 24 * 60 * 60;

let lastActivityThrottle = 0;

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

  if (now - lastActive > SESSION_INACTIVITY_LIMIT_MS) {
    console.warn("Cluvio: User session expired after 30 days of inactivity.");
    clearAuthToken();
    return true;
  }

  return false;
};

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
    localStorage.setItem("cluvio_token", token);
    localStorage.setItem("broclubs_last_active", now);
    localStorage.setItem("broclubs_session_start", now);

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
    localStorage.removeItem("cluvio_token");
    localStorage.removeItem("broclubs_user");
    localStorage.removeItem("cluvio_user");
    localStorage.removeItem("broclubs_last_active");
    localStorage.removeItem("broclubs_session_start");

    try {
      document.cookie =
        "broclubs_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
    } catch (e) {}
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user =
    localStorage.getItem("broclubs_user") ||
    localStorage.getItem("cluvio_user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (typeof window !== "undefined") {
    const jsonStr = JSON.stringify(user);
    localStorage.setItem("broclubs_user", jsonStr);
    localStorage.setItem("cluvio_user", jsonStr);
  }
};

export async function fetchWithAuth(endpoint, options = {}) {
  updateLastActivity();

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
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  auth: {
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
    presidentLogin: async (credentials) => {
      const data = await fetchWithAuth("/auth/president/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
      if (data.token) {
        setAuthToken(data.token);
        setStoredUser(data.user);
      }
      return data;
    },
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
    getMe: async () => {
      return fetchWithAuth("/auth/me");
    },
    getColleges: async () => {
      return fetchWithAuth("/auth/colleges");
    },
    logout: () => {
      clearAuthToken();
    },
  },

  students: {
    getProfile: async () => {
      return fetchWithAuth("/students/profile");
    },
    updateProfile: async (profileData) => {
      return fetchWithAuth("/students/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });
    },
    getMyClubs: async () => {
      return fetchWithAuth("/students/my-clubs");
    },
    getMyEvents: async () => {
      return fetchWithAuth("/students/my-events");
    },
  },

  presidents: {
    getProfile: async () => {
      return fetchWithAuth("/presidents/profile");
    },
    updateProfile: async (profileData) => {
      return fetchWithAuth("/presidents/profile", {
        method: "PUT",
        body: JSON.stringify(profileData),
      });
    },
    getMyClub: async () => {
      return fetchWithAuth("/presidents/my-club");
    },
    getMembers: async () => {
      return fetchWithAuth("/presidents/members");
    },
    getAnalytics: async () => {
      return fetchWithAuth("/presidents/analytics");
    },
  },

  clubs: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/clubs${query ? `?${query}` : ""}`);
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
  },

  memberships: {
    join: async (data) => {
      return fetchWithAuth("/memberships/join", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    getMyMemberships: async () => {
      return fetchWithAuth("/memberships/my-memberships");
    },
    cancel: async (id) => {
      return fetchWithAuth(`/memberships/${id}`, {
        method: "DELETE",
      });
    },
  },

  events: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/events${query ? `?${query}` : ""}`);
    },
    create: async (eventData) => {
      return fetchWithAuth("/events", {
        method: "POST",
        body: JSON.stringify(eventData),
      });
    },
    update: async (id, eventData) => {
      return fetchWithAuth(`/events/${id}`, {
        method: "PUT",
        body: JSON.stringify(eventData),
      });
    },
  },

  activities: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/activities${query ? `?${query}` : ""}`);
    },
    create: async (activityData) => {
      return fetchWithAuth("/activities", {
        method: "POST",
        body: JSON.stringify(activityData),
      });
    },
  },

  announcements: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/announcements${query ? `?${query}` : ""}`);
    },
    create: async (announcementData) => {
      return fetchWithAuth("/announcements", {
        method: "POST",
        body: JSON.stringify(announcementData),
      });
    },
  },

  notifications: {
    getAll: async () => {
      return fetchWithAuth("/notifications");
    },
    markAsRead: async (id) => {
      return fetchWithAuth(`/notifications/${id}/read`, {
        method: "PATCH",
      });
    },
    markAllAsRead: async () => {
      return fetchWithAuth("/notifications/read-all", {
        method: "PATCH",
      });
    },
    getUnreadCount: async () => {
      return fetchWithAuth("/notifications/unread-count");
    },
  },
};
