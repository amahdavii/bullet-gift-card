import axios from "axios";

const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

const dashboard = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

dashboard.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("panelAccessToken");
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

dashboard.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized (401) → redirect to login");
    }

    return Promise.reject(error.response?.data || error);
  }
);

const panelAdmin = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DASHBOARD_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
  },
});

panelAdmin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("panelAccessToken");
    if (token) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

panelAdmin.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized (401) → redirect to login");
    }

    return Promise.reject(error.response?.data || error);
  }
);

const http = {
  get: app.get,
  post: app.post,
  delete: app.delete,
  put: app.put,
  patch: app.patch,
};

const http2 = {
  get: dashboard.get,
  post: dashboard.post,
  delete: dashboard.delete,
  put: dashboard.put,
  patch: dashboard.patch,
};

const http3 = {
  get: panelAdmin.get,
  post: panelAdmin.post,
  delete: panelAdmin.delete,
  put: panelAdmin.put,
  patch: panelAdmin.patch,
};

export { http, http2, http3 };
