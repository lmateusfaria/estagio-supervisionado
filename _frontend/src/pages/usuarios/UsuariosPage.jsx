import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TextField, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Plus, RefreshCw, Search, Eye, Trash2, Mail, Shield, Calendar } from "lucide-react";

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/api/admin/listarUsuarios");
            setUsuarios(data || []);
        } catch (err) {
            console.error("Erro ao buscar usuários", err);
            setSnackbar({ open: true, message: "Erro ao carregar usuários", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const handleDeleteRequest = (id) => {
        setTargetId(id);
        setConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        const id = targetId;
        setConfirmOpen(false);
        setTargetId(null);
        try {
            await api.delete(`/api/admin/excluirUsuario/${id}`);
            setUsuarios((prev) => prev.filter((u) => u.id !== id));
            setSnackbar({ open: true, message: "Usuário excluído com sucesso.", severity: "success" });
        } catch (err) {
            console.error("Erro ao excluir usuário", err);
            setSnackbar({ open: true, message: "Erro ao excluir usuário.", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    // Filtrar usuários baseado na busca
    const filteredUsuarios = usuarios.filter((u) => {
        const searchLower = searchTerm.toLowerCase();
        const nome = u.nome || u.login || u.name || "";
        const email = u.email || "";
        return nome.toLowerCase().includes(searchLower) || email.toLowerCase().includes(searchLower);
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <DashboardNavbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/10 rounded-xl">
                                    <Users className="text-blue-400" size={28} />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">Usuários</h1>
                                    <p className="text-gray-400 text-sm mt-1">Gerencie os usuários do sistema</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button
                                    variant="contained"
                                    onClick={() => navigate("/usuarios/novo")}
                                    className="!bg-gradient-to-r !from-blue-600 !to-blue-500 !text-white !px-6 !py-3 !rounded-xl !font-semibold hover:!from-blue-700 hover:!to-blue-600 !shadow-lg !shadow-blue-500/20"
                                    startIcon={<Plus size={20} />}
                                >
                                    Novo Usuário
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={fetchUsuarios}
                                    disabled={loading}
                                    className="!border-gray-600 !text-gray-300 !rounded-xl hover:!bg-gray-800"
                                >
                                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                                </Button>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-1">
                            <TextField
                                fullWidth
                                placeholder="Buscar por nome ou e-mail..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search size={20} className="text-gray-400" />
                                        </InputAdornment>
                                    ),
                                    sx: {
                                        color: 'white',
                                        '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                    }
                                }}
                            />
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden">
                        {loading ? (
                            <div className="p-12 text-center">
                                <RefreshCw size={48} className="animate-spin text-blue-400 mx-auto mb-4" />
                                <p className="text-gray-400">Carregando usuários...</p>
                            </div>
                        ) : filteredUsuarios.length === 0 ? (
                            <div className="p-12 text-center">
                                <Users size={48} className="text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">
                                    {searchTerm ? 'Nenhum usuário encontrado para essa busca.' : 'Nenhum usuário cadastrado.'}
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Desktop Table */}
                                <div className="hidden lg:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-900/50 border-b border-gray-700">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">E-mail</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Permissões</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700/50">
                                            {filteredUsuarios.map((u) => (
                                                <motion.tr
                                                    key={u.id}
                                                    variants={itemVariants}
                                                    className="hover:bg-gray-700/30 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-400">#{u.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                                <span className="text-white font-bold text-sm">
                                                                    {(u.nome || u.login || u.name || 'U').substring(0, 2).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <span className="text-white font-medium">{u.nome || u.login || u.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-gray-300">
                                                            <Mail size={16} className="text-gray-500" />
                                                            <span className="text-sm">{u.email}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <Shield size={16} className="text-emerald-400" />
                                                            <span className="text-sm text-gray-300">
                                                                {u.tipo || u.role || (u.roles && u.roles.map(r=>r.authority).join(", ")) || (u.tipoUsuario ? (Array.isArray(u.tipoUsuario) ? u.tipoUsuario.map(t=>t.tipoUsuario || t).join(', ') : u.tipoUsuario) : 'N/A')}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => navigate(`/usuarios/${u.id}`)}
                                                                className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10 !min-w-0 !px-3"
                                                            >
                                                                <Eye size={16} />
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => handleDeleteRequest(u.id)}
                                                                className="!border-red-500/30 !text-red-400 hover:!bg-red-500/10 !min-w-0 !px-3"
                                                            >
                                                                <Trash2 size={16} />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile/Tablet Cards */}
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="lg:hidden p-4 space-y-4"
                                >
                                    {filteredUsuarios.map((u) => (
                                        <motion.div
                                            key={u.id}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold">
                                                            {(u.nome || u.login || u.name || 'U').substring(0, 2).toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold">{u.nome || u.login || u.name}</h3>
                                                        <p className="text-xs text-gray-500">ID: #{u.id}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Mail size={16} className="text-gray-500" />
                                                    <span>{u.email}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <Shield size={16} className="text-emerald-400" />
                                                    <span>{u.tipo || u.role || (u.roles && u.roles.map(r=>r.authority).join(", ")) || 'N/A'}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={() => navigate(`/usuarios/${u.id}`)}
                                                    className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10"
                                                    startIcon={<Eye size={16} />}
                                                >
                                                    Ver Detalhes
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleDeleteRequest(u.id)}
                                                    className="!border-red-500/30 !text-red-400 hover:!bg-red-500/10 !min-w-0 !px-4"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </>
                        )}
                    </div>
                    
                    {/* Dialog de confirmação */}
                    <Dialog 
                        open={confirmOpen} 
                        onClose={() => setConfirmOpen(false)}
                        PaperProps={{
                            sx: {
                                bgcolor: 'rgb(17 24 39)',
                                color: 'white',
                                border: '1px solid rgba(75, 85, 99, 0.3)',
                            }
                        }}
                    >
                        <DialogTitle className="!text-white">Confirmar exclusão</DialogTitle>
                        <DialogContent className="!text-gray-300">
                            Deseja realmente excluir este usuário? Esta ação não pode ser desfeita.
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmOpen(false)} className="!text-gray-400">
                                Cancelar
                            </Button>
                            <Button 
                                color="error" 
                                variant="contained" 
                                onClick={handleConfirmDelete}
                                className="!bg-red-600 hover:!bg-red-700"
                            >
                                Excluir
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </main>
            </div>
        </div>
    );
};

export default UsuariosPage;
