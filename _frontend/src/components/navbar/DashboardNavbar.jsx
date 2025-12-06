import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
    LogOut, Menu, Bell, User, Settings, 
    KeyRound, ChevronRight, Home
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useUi } from "../../context/UiContext";
import { 
    Button, IconButton, Badge, Menu as MuiMenu, 
    MenuItem, Avatar, Divider, Drawer, List, 
    ListItem, ListItemText, Typography 
} from "@mui/material";
import { motion } from "framer-motion";

const DashboardNavbar = () => {
    const { user, logout } = useAuth();
    const { setIsSidebarOpen } = useUi();
    const location = useLocation();
    const navigate = useNavigate();

    // Estados
    const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
    const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
    
    // Mock de notificações
    const [notifications] = useState([
        { id: 1, title: 'Novo documento aprovado', message: 'O documento "Formulário X" foi aprovado', time: '5 min atrás', unread: true },
        { id: 2, title: 'Atualização de fluxo', message: 'Fluxo de compras foi atualizado', time: '1h atrás', unread: true },
        { id: 3, title: 'Bem-vindo ao SMD!', message: 'Configure seu perfil para começar', time: '2h atrás', unread: false },
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    // Breadcrumb mapping
    const getBreadcrumb = () => {
        const pathMap = {
            '/dashboard': ['Dashboard'],
            '/usuarios': ['Dashboard', 'Usuários'],
            '/usuarios/novo': ['Dashboard', 'Usuários', 'Novo'],
            '/fluxos': ['Dashboard', 'Fluxos'],
            '/fluxos/novo': ['Dashboard', 'Fluxos', 'Novo'],
            '/documentos': ['Dashboard', 'Documentos'],
            '/relatorios': ['Dashboard', 'Relatórios'],
            '/config': ['Dashboard', 'Configurações'],
        };

        // Check for dynamic routes
        const path = location.pathname;
        if (path.match(/\/usuarios\/\d+\/editar/)) return ['Dashboard', 'Usuários', 'Editar'];
        if (path.match(/\/usuarios\/\d+/)) return ['Dashboard', 'Usuários', 'Detalhes'];
        if (path.match(/\/fluxos\/\d+\/editar/)) return ['Dashboard', 'Fluxos', 'Editar'];
        if (path.match(/\/fluxos\/\d+\/documentos/)) return ['Dashboard', 'Fluxos', 'Documentos'];
        if (path.match(/\/fluxos\/\d+/)) return ['Dashboard', 'Fluxos', 'Detalhes'];
        if (path.match(/\/documentos\/\d+/)) return ['Dashboard', 'Documentos', 'Detalhes'];

        return pathMap[path] || ['Dashboard'];
    };

    const breadcrumbItems = getBreadcrumb();

    // Handlers
    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchor(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchor(null);
    };

    const handleNotificationClick = () => {
        setNotificationDrawerOpen(true);
    };

    const handleProfileClick = () => {
        handleProfileMenuClose();
        alert('Funcionalidade de Perfil em desenvolvimento');
    };

    const handleSettingsClick = () => {
        handleProfileMenuClose();
        navigate('/config');
    };

    const handleChangePasswordClick = () => {
        handleProfileMenuClose();
        alert('Funcionalidade de Alterar Senha em desenvolvimento');
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="px-4 md:px-8 py-3 md:py-4 bg-green-900/80 backdrop-blur-md text-white shadow-lg z-30"
            >
                {/* Single Row */}
                <div className="flex justify-between items-center">
                    {/* Left Side - Dashboard + Hamburger on Mobile */}
                    <div className="flex items-center gap-3">
                        {/* Hamburger Mobile Only */}
                        <div className="md:hidden">
                            <IconButton
                                size="small"
                                className="!p-2 !rounded-md hover:!bg-green-800 !text-white"
                                onClick={() => {
                                    setIsSidebarOpen((prev) => !prev);
                                }}
                                aria-label="Abrir menu"
                            >
                                <Menu size={20} />
                            </IconButton>
                        </div>

                        {/* Dashboard Breadcrumb */}
                        <div className="hidden md:flex items-center gap-2 text-sm">
                            <Home size={16} className="text-emerald-400" />
                            <span className="text-white font-semibold">Dashboard</span>
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* User Name (Desktop) */}
                        {user && (
                            <span className="hidden lg:block text-sm">
                                Olá, <span className="font-semibold text-emerald-300">{user.login}</span>
                            </span>
                        )}

                        {/* Notifications */}
                        <IconButton
                            onClick={handleNotificationClick}
                            className="!p-2 !rounded-lg hover:!bg-white/10 !text-white"
                            aria-label="Notificações"
                        >
                            <Badge badgeContent={unreadCount} color="error">
                                <Bell size={20} />
                            </Badge>
                        </IconButton>

                        {/* Profile Menu */}
                        <IconButton
                            onClick={handleProfileMenuOpen}
                            className="!p-1 !rounded-lg hover:!bg-white/10"
                            aria-label="Menu de perfil"
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: '#10b981',
                                    fontSize: '0.875rem',
                                    fontWeight: 'bold'
                                }}
                            >
                                {getInitials(user?.login || 'User')}
                            </Avatar>
                        </IconButton>

                        {/* Logout Button (Desktop) */}
                        <Button
                            variant="contained"
                            color="error"
                            onClick={logout}
                            className="!px-3 md:!px-4 !py-2 !rounded-full !font-semibold !hidden md:!flex !items-center !gap-2 !text-sm"
                            size="small"
                        >
                            <LogOut size={16} />
                            <span className="hidden lg:inline">Sair</span>
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Profile Dropdown Menu */}
            <MuiMenu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        bgcolor: 'rgb(17 24 39)',
                        color: 'white',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                    }
                }}
            >
                <div className="px-4 py-3 border-b border-gray-700">
                    <Typography variant="subtitle2" className="!text-gray-400">
                        Logado como
                    </Typography>
                    <Typography variant="body2" className="!font-semibold !text-emerald-300">
                        {user?.login || 'Usuário'}
                    </Typography>
                </div>

                <MenuItem onClick={handleProfileClick} className="!py-3">
                    <User size={18} className="mr-3 text-green-400" />
                    <span>Meu Perfil</span>
                </MenuItem>

                <MenuItem onClick={handleSettingsClick} className="!py-3">
                    <Settings size={18} className="mr-3 text-green-400" />
                    <span>Configurações</span>
                </MenuItem>

                <MenuItem onClick={handleChangePasswordClick} className="!py-3">
                    <KeyRound size={18} className="mr-3 text-green-400" />
                    <span>Alterar Senha</span>
                </MenuItem>

                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.5)', my: 1 }} />

                <MenuItem onClick={logout} className="!py-3 !text-red-400">
                    <LogOut size={18} className="mr-3" />
                    <span>Sair</span>
                </MenuItem>
            </MuiMenu>

            {/* Notifications Drawer */}
            <Drawer
                anchor="right"
                open={notificationDrawerOpen}
                onClose={() => setNotificationDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 400 },
                        bgcolor: 'rgb(17 24 39)',
                        color: 'white',
                    }
                }}
            >
                <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">Notificações</h3>
                        {unreadCount > 0 && (
                            <p className="text-sm text-gray-400 mt-1">
                                {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                    <IconButton
                        onClick={() => setNotificationDrawerOpen(false)}
                        className="!text-gray-400 hover:!text-white"
                    >
                        <span className="text-2xl">×</span>
                    </IconButton>
                </div>

                <List className="p-0">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Bell size={48} className="mx-auto mb-3 opacity-30" />
                            <p>Nenhuma notificação</p>
                        </div>
                    ) : (
                        notifications.map((notification) => (
                            <ListItem
                                key={notification.id}
                                className={`!border-b !border-gray-800 hover:!bg-white/5 !cursor-pointer ${
                                    notification.unread ? '!bg-green-950/20' : ''
                                }`}
                            >
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className="font-semibold text-sm text-white">
                                            {notification.title}
                                        </p>
                                        {notification.unread && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-1">
                                        {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {notification.time}
                                    </p>
                                </div>
                            </ListItem>
                        ))
                    )}
                </List>

                {notifications.length > 0 && (
                    <div className="p-4 border-t border-gray-700">
                        <Button
                            fullWidth
                            variant="outlined"
                            className="!border-gray-600 !text-gray-300 hover:!bg-white/5"
                        >
                            Marcar todas como lidas
                        </Button>
                    </div>
                )}
            </Drawer>
        </>
    );
};

export default DashboardNavbar;

