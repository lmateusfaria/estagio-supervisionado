import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

// anexa o token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    // ensure headers object exists
    config.headers = config.headers || {};
    // don't overwrite if Authorization already present
    if (!config.headers.Authorization && token) {
        config.headers["Authorization"] = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }
    return config;
});

export default api;
