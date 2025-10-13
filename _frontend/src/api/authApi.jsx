import api from "./api";

export const authApi = {
    login: ({ login, password }) =>
        api.post("/auth/login", { login, password }),
    me: () => api.get("/auth/me"),
};

