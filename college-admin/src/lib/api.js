const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
          role: "college-admin",
        }),
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
        body: JSON.stringify({
          ...userData,
          role: "college-admin",
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
  clubs: {
    getAll: async () => {
      return fetchWithAuth("/clubs");
    },
  },
};
