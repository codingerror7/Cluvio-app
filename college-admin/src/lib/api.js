const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const getAuthToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cluvio_college_admin_token");
};

export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_college_admin_token", token);
  }
};

export const clearAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cluvio_college_admin_token");
    localStorage.removeItem("cluvio_college_admin_user");
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("cluvio_college_admin_user");
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_college_admin_user", JSON.stringify(user));
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
    login: async (credentials) => {
      const data = await fetchWithAuth("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          ...credentials,
          role: "college_admin",
        }),
      });
      if (data.token) {
        setAuthToken(data.token);
        setStoredUser(data.user);
      }
      return data;
    },
    getMe: async () => {
      const data = await fetchWithAuth("/auth/me");
      if (data.user) {
        setStoredUser(data.user);
      }
      return data;
    },
    getColleges: async () => {
      return fetchWithAuth("/auth/colleges");
    },
    logout: () => {
      clearAuthToken();
    },
  },

  dashboard: {
    getStats: async () => {
      return fetchWithAuth("/college-admin/dashboard");
    },
  },

  approvals: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/approvals${query ? `?${query}` : ""}`);
    },
    getCounts: async () => {
      return fetchWithAuth("/approvals/counts");
    },
    approve: async (id) => {
      return fetchWithAuth(`/approvals/${id}/approve`, {
        method: "POST",
      });
    },
    reject: async (id, reason) => {
      return fetchWithAuth(`/approvals/${id}/reject`, {
        method: "POST",
        body: JSON.stringify({ reason }),
      });
    },
  },

  students: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/college-admin/students${query ? `?${query}` : ""}`);
    },
  },

  presidents: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/college-admin/presidents${query ? `?${query}` : ""}`);
    },
    generateCode: async (data) => {
      return fetchWithAuth("/college-admin/presidents/generate-code", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    getCodes: async () => {
      return fetchWithAuth("/college-admin/presidents/codes");
    },
    revokeCode: async (id) => {
      return fetchWithAuth(`/college-admin/presidents/codes/${id}/revoke`, {
        method: "PATCH",
      });
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
  },

  events: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/events${query ? `?${query}` : ""}`);
    },
  },

  auditLogs: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetchWithAuth(`/college-admin/audit-logs${query ? `?${query}` : ""}`);
    },
  },
};
