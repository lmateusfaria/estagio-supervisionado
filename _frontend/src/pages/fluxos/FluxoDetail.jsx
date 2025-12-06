import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, CircularProgress, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { 
    GitBranch, Edit, Trash2, ArrowLeft, FileText, 
    User, Calendar, Hash, AlignLeft 
} from "lucide-react";

const FluxoDetail = () => {
    const { id } = useParams();
    const [fluxo, setFluxo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    const fetchFluxo = async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/api/fluxos/${id}`);
            setFluxo(data);
        } catch (err) {
            console.error("Erro ao carregar fluxo", err);
            setSnackbar({ open: true, message: "Erro ao carregar fluxo.", severity: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFluxo();
    }, [id]);

    const handleDeleteRequest = () => setConfirmOpen(true);

    const handleConfirmDelete = async () => {
        setConfirmOpen(false);
        try {
            await api.delete(`/api/fluxos/${id}`);
            setSnackbar({ open: true, message: "Fluxo excluído com sucesso.", severity: "success" });
            setTimeout(() => navigate('/fluxos'), 1500);
        } catch (err) {
            console.error("Erro ao excluir fluxo", err);
            setSnackbar({ open: true, message: "Erro ao excluir fluxo.", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.4,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
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
                        className="mb-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <GitBranch className="text-purple-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Detalhes do Fluxo</h1>
                                <p className="text-gray-400 text-sm mt-1">Informações completas do processo</p>
                            </div>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <CircularProgress sx={{ color: '#a855f7' }} />
                        </div>
                    ) : !fluxo ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <GitBranch className="mx-auto text-gray-600 mb-4" size={64} />
                            <p className="text-gray-400 text-lg">Fluxo não encontrado</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="max-w-4xl mx-auto space-y-6"
                        >
                            {/* Card Principal - Nome e Versão */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                            >
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-2">{fluxo.nome}</h2>
                                        <Chip 
                                            label={`Versão ${fluxo.versaoDoc}`}
                                            size="small"
                                            sx={{
                                                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                                                color: '#10b981',
                                                fontWeight: 'bold',
                                                border: '1px solid rgba(16, 185, 129, 0.3)'
                                            }}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            startIcon={<Edit size={16} />}
                                            onClick={() => navigate(`/fluxos/${id}/editar`)}
                                            className="!border-purple-500 !text-purple-400 hover:!bg-purple-500/10 !rounded-lg"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="error"
                                            startIcon={<Trash2 size={16} />}
                                            onClick={handleDeleteRequest}
                                            className="!rounded-lg"
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Grid de Informações */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Informações Básicas */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Hash size={20} className="text-purple-400" />
                                        Identificação
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">ID do Fluxo</p>
                                            <p className="text-white font-medium">{fluxo.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Versão do Documento</p>
                                            <p className="text-white font-medium">{fluxo.versaoDoc}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Descrição */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <AlignLeft size={20} className="text-emerald-400" />
                                        Descrição
                                    </h3>
                                    <div>
                                        <p className="text-gray-500 text-sm mb-1">Ordem de Serviço</p>
                                        <p className="text-white">{fluxo.ordemServico || '-'}</p>
                                    </div>
                                </motion.div>

                                {/* Autoria */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 md:col-span-2"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <User size={20} className="text-blue-400" />
                                        Histórico de Autoria
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                                                <Calendar size={14} />
                                                Criado por
                                            </p>
                                            <p className="text-white font-medium">
                                                {fluxo.nomeUsuarioCriador || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                                                <Calendar size={14} />
                                                Atualizado por
                                            </p>
                                            <p className="text-white font-medium">
                                                {fluxo.nomeUsuarioAtualizador || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Ações */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowLeft size={18} />}
                                    onClick={() => navigate(-1)}
                                    className="!border-gray-600 !text-gray-300 !rounded-lg hover:!bg-gray-800"
                                >
                                    Voltar
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<FileText size={18} />}
                                    onClick={() => navigate(`/fluxos/${id}/documentos`)}
                                    className="!bg-purple-600 hover:!bg-purple-700 !text-white !rounded-lg"
                                >
                                    Ver Documentos
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}

                    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogContent>Deseja realmente excluir este fluxo?</DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
                            <Button color="error" variant="contained" onClick={handleConfirmDelete}>Excluir</Button>
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

export default FluxoDetail;