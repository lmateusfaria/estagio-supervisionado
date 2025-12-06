import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, TextField, InputAdornment, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GitBranch, Plus, RefreshCw, Search, Eye, Edit, Trash2, User, Calendar, FileText } from "lucide-react";

const FluxosPage = () => {
    const [fluxos, setFluxos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetId, setTargetId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const fetchFluxos = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/api/fluxos");
            setFluxos(data || []);
        } catch (err) {
            console.error("Erro ao buscar fluxos", err);
            setSnackbar({ open: true, message: "Erro ao carregar fluxos", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFluxos();
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
            await api.delete(`/api/fluxos/${id}`);
            setFluxos((prev) => prev.filter((f) => f.id !== id));
            setSnackbar({ open: true, message: "Fluxo excluído com sucesso.", severity: "success" });
        } catch (err) {
            console.error("Erro ao excluir fluxo", err);
            setSnackbar({ open: true, message: "Erro ao excluir fluxo.", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    // Filtrar fluxos baseado na busca
    const filteredFluxos = fluxos.filter((f) => {
        const searchLower = searchTerm.toLowerCase();
        const nome = f.nome || "";
        const descricao = f.ordemServico || f.descricaoFluxo || "";
        return nome.toLowerCase().includes(searchLower) || descricao.toLowerCase().includes(searchLower);
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
                                <div className="p-3 bg-purple-500/10 rounded-xl">
                                    <GitBranch className="text-purple-400" size={28} />
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white">Fluxos</h1>
                                    <p className="text-gray-400 text-sm mt-1">Gerencie os fluxos de trabalho</p>
                                </div>
                            </div>
                            
                            <div className="flex gap-3 w-full md:w-auto">
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/fluxos/novo')}
                                    className="!bg-gradient-to-r !from-purple-600 !to-purple-500 !text-white !px-6 !py-3 !rounded-xl !font-semibold hover:!from-purple-700 hover:!to-purple-600 !shadow-lg !shadow-purple-500/20"
                                    startIcon={<Plus size={20} />}
                                >
                                    Novo Fluxo
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={fetchFluxos}
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
                                placeholder="Buscar por nome ou descrição..."
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
                                <RefreshCw size={48} className="animate-spin text-purple-400 mx-auto mb-4" />
                                <p className="text-gray-400">Carregando fluxos...</p>
                            </div>
                        ) : filteredFluxos.length === 0 ? (
                            <div className="p-12 text-center">
                                <GitBranch size={48} className="text-gray-600 mx-auto mb-4" />
                                <p className="text-gray-400">
                                    {searchTerm ? 'Nenhum fluxo encontrado para essa busca.' : 'Nenhum fluxo cadastrado.'}
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
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Descrição</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Versão</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Criador</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700/50">
                                            {filteredFluxos.map((f) => (
                                                <motion.tr
                                                    key={f.id}
                                                    variants={itemVariants}
                                                    className="hover:bg-gray-700/30 transition-colors"
                                                >
                                                    <td className="px-6 py-4 text-sm text-gray-400">#{f.id}</td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                                                <GitBranch size={18} className="text-purple-400" />
                                                            </div>
                                                            <span className="text-white font-medium">{f.nome}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-gray-300">
                                                            <FileText size={16} className="text-gray-500" />
                                                            <span className="text-sm truncate max-w-xs">{f.ordemServico || f.descricaoFluxo || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Chip
                                                            label={`v${f.versaoDoc || '1.0'}`}
                                                            size="small"
                                                            className="!bg-emerald-500/10 !text-emerald-400 !border-emerald-500/20"
                                                            variant="outlined"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2 text-gray-300">
                                                            <User size={16} className="text-gray-500" />
                                                            <span className="text-sm">{f.nomeUsuarioCriador || '-'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex gap-2 justify-end">
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => navigate(`/fluxos/${f.id}`)}
                                                                className="!border-purple-500/30 !text-purple-400 hover:!bg-purple-500/10 !min-w-0 !px-3"
                                                            >
                                                                <Eye size={16} />
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => navigate(`/fluxos/${f.id}/editar`)}
                                                                className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10 !min-w-0 !px-3"
                                                            >
                                                                <Edit size={16} />
                                                            </Button>
                                                            <Button
                                                                size="small"
                                                                variant="outlined"
                                                                onClick={() => handleDeleteRequest(f.id)}
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
                                    {filteredFluxos.map((f) => (
                                        <motion.div
                                            key={f.id}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/30 transition-all"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                                        <GitBranch className="text-white" size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-semibold">{f.nome}</h3>
                                                        <p className="text-xs text-gray-500">ID: #{f.id}</p>
                                                    </div>
                                                </div>
                                                <Chip
                                                    label={`v${f.versaoDoc || '1.0'}`}
                                                    size="small"
                                                    className="!bg-emerald-500/10 !text-emerald-400 !border-emerald-500/20"
                                                    variant="outlined"
                                                />
                                            </div>

                                            <div className="space-y-2 mb-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <FileText size={16} className="text-gray-500" />
                                                    <span className="truncate">{f.ordemServico || f.descricaoFluxo || 'Sem descrição'}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-300">
                                                    <User size={16} className="text-gray-500" />
                                                    <span>Criado por: {f.nomeUsuarioCriador || '-'}</span>
                                                </div>
                                                {f.nomeUsuarioAtualizador && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-300">
                                                        <Calendar size={16} className="text-gray-500" />
                                                        <span>Atualizado por: {f.nomeUsuarioAtualizador}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2">
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    onClick={() => navigate(`/fluxos/${f.id}`)}
                                                    className="!border-purple-500/30 !text-purple-400 hover:!bg-purple-500/10"
                                                    startIcon={<Eye size={16} />}
                                                >
                                                    Ver
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => navigate(`/fluxos/${f.id}/editar`)}
                                                    className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10 !min-w-0 !px-4"
                                                >
                                                    <Edit size={16} />
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    onClick={() => handleDeleteRequest(f.id)}
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
                            Deseja realmente excluir este fluxo? Esta ação não pode ser desfeita.
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

export default FluxosPage;
