import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const MobileDrawer = ({ isOpen, onClose, links, isAuthenticated, onLogout }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 shadow-2xl z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-green-500/20">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">🌿</span>
                                <h2 className="text-2xl font-bold text-white">SMD</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                aria-label="Fechar menu"
                            >
                                <X className="text-white" size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="p-6">
                            <ul className="space-y-2">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {link.onClick ? (
                                            <button
                                                onClick={() => {
                                                    link.onClick();
                                                    onClose();
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
                                            >
                                                <span className="text-green-400 group-hover:scale-110 transition-transform">
                                                    {link.icon}
                                                </span>
                                                <span className="font-medium">{link.label}</span>
                                            </button>
                                        ) : (
                                            <Link
                                                to={link.path}
                                                onClick={onClose}
                                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-all group"
                                            >
                                                <span className="text-green-400 group-hover:scale-110 transition-transform">
                                                    {link.icon}
                                                </span>
                                                <span className="font-medium">{link.label}</span>
                                            </Link>
                                        )}
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Logout Button (if authenticated) */}
                            {isAuthenticated && onLogout && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: links.length * 0.1 }}
                                    className="mt-8 pt-6 border-t border-green-500/20"
                                >
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            onClose();
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
                                    >
                                        <span>Sair</span>
                                    </button>
                                </motion.div>
                            )}
                        </nav>

                        {/* Footer */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-green-500/20 bg-gray-900/50">
                            <p className="text-xs text-gray-500 text-center">
                                © 2025 SMD - Todos os direitos reservados
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileDrawer;
