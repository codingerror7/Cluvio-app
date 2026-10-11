const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cluvio_token");
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cluvio_token");
    localStorage.removeItem("cluvio_user");
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("cluvio_user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_user", JSON.stringify(user));
  }
};

async function fetchWithAuth(endpoint, options = {}) {
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
