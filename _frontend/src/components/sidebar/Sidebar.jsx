import { Link, useLocation } from "react-router-dom";
import { Home, FileText, BarChart, Users, Settings, LogOut, ScrollText, Layers, X } from "lucide-react";
import { Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useUi } from "../../context/UiContext";
import { createPortal } from "react-dom";

const Sidebar = () => {
    const { logout } = useAuth();
    const { isSidebarOpen, setIsSidebarOpen } = useUi();
    const location = useLocation();

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
        { to: "/usuarios", label: "Usuários", icon: <Users size={20} /> },
        { to: "/fluxos", label: "Fluxos", icon: <Layers size={20} /> },
        { to: "/relatorios", label: "Relatórios", icon: <ScrollText size={20} /> },
        { to: "/config", label: "Configurações", icon: <Settings size={20} /> },
    ];

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:w-64 md:h-screen md:sticky md:top-0 bg-gradient-to-b from-green-900 to-emerald-800 text-white flex-col shadow-xl">
                
                {/* Navegação */}
                <nav className="flex-1 px-4 py-6 space-y-3">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                location.pathname === link.to
                                    ? "bg-emerald-600 text-white font-semibold hover:bg-primary-500 hover:text-white"
                                    : "text-gray-200 hover:bg-emerald-700 hover:text-white"
                            }`}
                        >
                            {link.icon}
                            {link.label}
                        </Link>
                    ))}
                </nav>

            </aside>

            {/* Mobile overlay sidebar */}
            {isSidebarOpen && createPortal(
                <div className="md:hidden fixed inset-0 z-[2000]">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsSidebarOpen(false)} />
                    <aside className="relative w-72 h-full bg-gradient-to-b from-green-900 to-emerald-800 text-white flex flex-col shadow-xl">
                        <div className="p-4 flex items-center justify-between border-b border-green-700">
                            <h1 className="text-lg font-bold">🌿 SMD</h1>
                            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-green-800">
                                <X size={18} />
                            </button>
                        </div>

                        <nav className="flex-1 px-4 py-6 space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                                        location.pathname === link.to
                                            ? "bg-emerald-600 text-white font-semibold hover:bg-primary-500 hover:text-white"
                                            : "text-gray-200 hover:bg-emerald-700 hover:text-white"
                                    }`}
                                >
                                    {link.icon}
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>,
                document.body
            )}
        </>
    );
};

export default Sidebar;
