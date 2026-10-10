const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("cluvio_admin_token");
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_admin_token", token);
  }
};

export const clearAuthToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cluvio_admin_token");
    localStorage.removeItem("cluvio_admin_user");
  }
};

export const getStoredUser = (): any | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("cluvio_admin_user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user: any): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cluvio_admin_user", JSON.stringify(user));
  }
};

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (headers as any)["Authorization"] = `Bearer ${token}`;
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
    login: async (credentials: { email: string; password: string }) => {
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
  dashboard: {
    getStats: async () => {
      return fetchWithAuth("/admin/dashboard");
    },
  },
  students: {
    getAll: async (params?: Record<string, string>) => {
      const query = params ? "?" + new URLSearchParams(params).toString() : "";
      return fetchWithAuth(`/admin/students${query}`);
    },
    getById: async (id: string) => {
      return fetchWithAuth(`/admin/students/${id}`);
    },
    create: async (studentData: any) => {
      return fetchWithAuth("/admin/students", {
        method: "POST",
        body: JSON.stringify(studentData),
      });
    },
    update: async (id: string, studentData: any) => {
      return fetchWithAuth(`/admin/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(studentData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth(`/admin/students/${id}`, {
        method: "DELETE",
      });
    },
  },
  presidents: {
    getAll: async (params?: Record<string, string>) => {
      const query = params ? "?" + new URLSearchParams(params).toString() : "";
      return fetchWithAuth(`/admin/presidents${query}`);
    },
    getById: async (id: string) => {
      return fetchWithAuth(`/admin/presidents/${id}`);
    },
    create: async (presidentData: any) => {
      return fetchWithAuth("/admin/presidents", {
        method: "POST",
        body: JSON.stringify(presidentData),
      });
    },
    update: async (id: string, presidentData: any) => {
      return fetchWithAuth(`/admin/presidents/${id}`, {
        method: "PUT",
        body: JSON.stringify(presidentData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth(`/admin/presidents/${id}`, {
        method: "DELETE",
      });
    },
  },
  clubs: {
    getAll: async (params?: Record<string, string>) => {
      const query = params ? "?" + new URLSearchParams(params).toString() : "";
      return fetchWithAuth(`/clubs${query}`);
    },
    getById: async (id: string) => {
      return fetchWithAuth(`/clubs/${id}`);
    },
    create: async (clubData: any) => {
      return fetchWithAuth("/clubs", {
        method: "POST",
        body: JSON.stringify(clubData),
      });
    },
    update: async (id: string, clubData: any) => {
      return fetchWithAuth(`/clubs/${id}`, {
        method: "PUT",
        body: JSON.stringify(clubData),
      });
    },
    delete: async (id: string) => {
      return fetchWithAuth(`/clubs/${id}`, {
        method: "DELETE",
      });
    },
    getMembers: async (id: string) => {
      return fetchWithAuth(`/clubs/${id}/members`);
    },
    removeMember: async (clubId: string, studentId: string) => {
      return fetchWithAuth(`/clubs/${clubId}/members/${studentId}`, {
        method: "DELETE",
      });
    },
  },
  requests: {
    getAll: async (status?: string) => {
      const query = status && status !== "all" ? `?status=${status}` : "";
      return fetchWithAuth(`/admin/requests${query}`);
    },
    review: async (id: string, action: "Approved" | "Rejected") => {
      return fetchWithAuth(`/requests/${id}/review`, {
        method: "PUT",
        body: JSON.stringify({ action }),
      });
    },
  },
};
