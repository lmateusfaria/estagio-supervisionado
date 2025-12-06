import { Link, useLocation } from "react-router-dom";
import { Home, Users, GitBranch, FileText, BarChart, Settings, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUi } from "../../context/UiContext";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
    const { logout } = useAuth();
    const { isSidebarOpen, setIsSidebarOpen } = useUi();
    const location = useLocation();

    const links = [
        { to: "/dashboard", label: "Dashboard", icon: Home },
        { to: "/usuarios", label: "Usuários", icon: Users },
        { to: "/fluxos", label: "Fluxos", icon: GitBranch },
        { to: "/documentos", label: "Documentos", icon: FileText },
        { to: "/relatorios", label: "Relatórios", icon: BarChart },
        { to: "/config", label: "Configurações", icon: Settings },
    ];

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex md:w-64 md:h-screen md:sticky md:top-0 bg-gray-900 border-r border-gray-800 text-white flex-col">
                
                {/* Navegação */}
                <nav className="flex-1 px-3 py-6 space-y-1">
                    {links.map((link) => {
                        const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                        const Icon = link.icon;
                        
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="relative block"
                            >
                                <div className={`
                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                    ${isActive 
                                        ? "bg-gradient-to-r from-emerald-500/20 to-green-500/10 text-emerald-400 font-semibold" 
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }
                                `}>
                                    <Icon size={20} />
                                    <span>{link.label}</span>
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Info */}
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-xl">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-white">🌿</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">SMD</p>
                            <p className="text-xs text-gray-500">Sistema de Manuais</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile overlay sidebar */}
            <AnimatePresence>
                {isSidebarOpen && createPortal(
                    <div className="md:hidden fixed inset-0 z-[2000]">
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                        
                        {/* Drawer */}
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-80 h-full bg-gray-900 text-white flex flex-col shadow-2xl"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                                            <span className="text-xl">🌿</span>
                                        </div>
                                        <div>
                                            <h1 className="text-lg font-bold">SMD</h1>
                                            <p className="text-xs text-gray-500">Sistema de Manuais Digitais</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                                {links.map((link, index) => {
                                    const isActive = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
                                    const Icon = link.icon;
                                    
                                    return (
                                        <motion.div
                                            key={link.to}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                to={link.to}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={`
                                                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                                                    ${isActive 
                                                        ? "bg-gradient-to-r from-emerald-500/20 to-green-500/10 text-emerald-400 font-semibold" 
                                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                                    }
                                                `}
                                            >
                                                <Icon size={20} />
                                                <span>{link.label}</span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-800">
                                <p className="text-xs text-gray-500 text-center">
                                    © 2025 SMD - Todos os direitos reservados
                                </p>
                            </div>
                        </motion.aside>
                    </div>,
                    document.body
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;
