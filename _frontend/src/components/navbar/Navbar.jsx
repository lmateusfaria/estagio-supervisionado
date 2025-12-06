import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@mui/material";
import { Menu, Home, LogIn, Info, Mail, FileText } from "lucide-react";
import { motion } from "framer-motion";
import MobileDrawer from "./MobileDrawer";

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    // Links para mobile drawer - contexto PUBLIC
    const mobileLinks = [
        { path: '/', label: 'Início', icon: <Home size={20} /> },
        { path: '/login', label: 'Login', icon: <LogIn size={20} /> },
        { path: '#', label: 'Sobre', icon: <Info size={20} /> },
        { path: '#', label: 'Funcionalidades', icon: <FileText size={20} /> },
        { path: '#', label: 'Contato', icon: <Mail size={20} /> },
    ];

    // Desktop navigation links
    const desktopLinks = [
        { path: '/', label: 'Início' },
    ];

    const isActivePath = (path) => location.pathname === path;

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-green-900/90 backdrop-blur-md shadow-lg'
                        : 'bg-green-900/70 backdrop-blur-md shadow-lg'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.span
                                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                                transition={{ duration: 0.5 }}
                                className="text-3xl"
                            >
                                🌿
                            </motion.span>
                            <span className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                                SMD
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6">
                            {desktopLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`relative text-white hover:text-emerald-300 transition-colors font-medium ${
                                        isActivePath(link.path) ? 'text-emerald-300' : ''
                                    }`}
                                >
                                    {link.label}
                                    {isActivePath(link.path) && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-300"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            ))}

                            {/* Auth Buttons */}
                            {isAuthenticated ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={logout}
                                    className="!rounded-full !font-semibold !px-6"
                                >
                                    Sair
                                </Button>
                            ) : (
                                <Link to="/login">
                                    <Button
                                        variant="contained"
                                        className="!rounded-full !font-semibold !px-6 !bg-emerald-500 hover:!bg-emerald-600"
                                    >
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Abrir menu"
                        >
                            <Menu className="text-white" size={24} />
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Drawer */}
            <MobileDrawer
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                links={mobileLinks}
                isAuthenticated={isAuthenticated}
                onLogout={isAuthenticated ? logout : null}
            />
        </>
    );
};

export default Navbar;

