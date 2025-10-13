import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    const isAuthenticated = !!token;

    // Busca os dados do usuário autenticado
    const fetchUser = async () => {
        if (!token) return; // não tenta sem token
        try {
            const { data } = await api.get("/auth/me");
            setUser(data);
        } catch (err) {
            console.error("Erro ao carregar usuário:", err);
            setUser(null);
        }
    };
    // Tenta buscar o usuário se já houver token salvo
    useEffect(() => {
        if (token && !user) {
            fetchUser();
        }
    }, [token]);

    const login = async ({ login, password }) => {
        setLoading(true);
        try {
            const { data } = await api.post("/auth/login", { login, password });
            let tk = data?.token || data?.accessToken || data;
            if (!tk.startsWith('Bearer ')) tk = `Bearer ${tk}`;

            // salva token no localStorage primeiro
            setToken(tk);
            localStorage.setItem("token", tk);

            // Removed undefined setState call

            // garante que o axios já tenha Authorization
            api.defaults.headers.common["Authorization"] = tk;

            // agora busca os dados do usuário
            await fetchUser();

            return { ok: true };
        } catch (err) {
            return { ok: false, msg: err?.response?.data || "Falha no login" };
        } finally {
            setLoading(false);
        }
    };


    const logout = () => {
        setToken(null);
        setUser(null);
        // remove Authorization default header so subsequent requests are unauthenticated
        try { delete api.defaults.headers.common["Authorization"]; } catch (e) { /* ignore */ }
        localStorage.removeItem("token");
    };

    const value = useMemo(
        () => ({ token, isAuthenticated, loading, user, login, logout, fetchUser }),
        [token, isAuthenticated, loading, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
