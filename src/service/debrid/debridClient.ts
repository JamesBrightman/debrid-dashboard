import axios from "axios";

/**
 * Helper to get debrid token from localStorage (client-side only)
 */
export const getDebridTokenFromStorage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem("debrid-key")?.slice(1, -1) ?? null;
};

/**
 * Creates an Axios client for Real-Debrid API
 */
export const createClient = () => {
  const instance = axios.create({
    baseURL: "https://api.real-debrid.com/rest/1.0",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  // Add request interceptor to inject auth token
  instance.interceptors.request.use((config) => {
    const token = getDebridTokenFromStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export const client = createClient();

/**
 * Gets user settings from Real-Debrid
 */
export const getSettings = async () => {
  return (await client.get("/settings")).data;
};

/**
 * Gets user from Real-Debrid
 */
export const getUser = async () => {
  return (await client.get("/user")).data;
};
