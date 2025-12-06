import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, TextField, Snackbar, Alert, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { GitBranch, Save, X, FileText, AlignLeft, Hash } from "lucide-react";

const FluxoForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({ nome: "", ordemServico: "", versaoDoc: 1 });
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchFluxo = async () => {
        if (!isEdit) return;
        setLoading(true);
        try {
            const { data } = await api.get(`/api/fluxos/${id}`);
            setForm({ nome: data.nome || "", ordemServico: data.ordemServico || "", versaoDoc: data.versaoDoc || 1 });
        } catch (err) {
            console.error("Erro ao carregar fluxo", err);
            setSnackbar({ open: true, message: "Erro ao carregar fluxo.", severity: 'error' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFluxo();
    }, [id]);

    const handleChange = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.nome || form.nome.trim() === "") {
            setSnackbar({ open: true, message: "Nome é obrigatório.", severity: 'warning' });
            return;
        }
        let payload;
        if (isEdit) {
            payload = { ...form, idUsuarioAtualizador: user?.id };
            console.log('Enviando atualização de fluxo:', payload);
        } else {
            payload = { ...form, idUsuarioCriador: user?.id };
            console.log('Enviando criação de fluxo:', payload);
        }
        if (!user || !user.id) {
            setSnackbar({ open: true, message: "Usuário não carregado. Faça login novamente. (Veja o payload no console)", severity: 'error' });
            // Não retorna, deixa passar para debug
        }
        try {
            if (isEdit) {
                await api.put(`/api/fluxos/${id}`, payload);
                setSnackbar({ open: true, message: "Fluxo atualizado.", severity: 'success' });
            } else {
                await api.post(`/api/fluxos`, payload);
                setSnackbar({ open: true, message: "Fluxo criado.", severity: 'success' });
            }
            navigate('/fluxos');
        } catch (err) {
            console.error("Erro ao salvar fluxo", err);
            setSnackbar({ open: true, message: "Erro ao salvar fluxo.", severity: 'error' });
        }
    };

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    if (authLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600">
                <span className="text-white text-lg">Carregando usuário...</span>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
        }
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
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-purple-500/10 rounded-xl">
                                <GitBranch className="text-purple-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {isEdit ? 'Editar Fluxo' : 'Novo Fluxo'}
                                </h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    {isEdit ? 'Atualize as informações do fluxo' : 'Crie um novo fluxo de processo'}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl mx-auto"
                    >
                        <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Nome */}
                                <div>
                                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                                        <FileText size={18} className="text-purple-400" />
                                        Nome do Fluxo
                                    </label>
                                    <TextField 
                                        fullWidth
                                        value={form.nome} 
                                        onChange={handleChange('nome')}
                                        disabled={loading}
                                        placeholder="Digite o nome do fluxo"
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a855f7' },
                                                backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                            }
                                        }}
                                    />
                                </div>

                                {/* Ordem/Descrição */}
                                <div>
                                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                                        <AlignLeft size={18} className="text-emerald-400" />
                                        Ordem de Serviço / Descrição
                                    </label>
                                    <TextField 
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={form.ordemServico} 
                                        onChange={handleChange('ordemServico')}
                                        disabled={loading}
                                        placeholder="Descreva o fluxo ou ordem de serviço"
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                                                backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                            }
                                        }}
                                    />
                                </div>

                                {/* Versão */}
                                <div>
                                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                                        <Hash size={18} className="text-blue-400" />
                                        Versão
                                    </label>
                                    <TextField 
                                        fullWidth
                                        type="number"
                                        value={form.versaoDoc} 
                                        onChange={handleChange('versaoDoc')}
                                        disabled={loading}
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                                                backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                            },
                                            inputProps: { min: 1 }
                                        }}
                                    />
                                </div>

                                {/* Botões */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <Save size={20} />}
                                        className="!bg-purple-600 hover:!bg-purple-700 !text-white !px-8 !py-3 !rounded-xl !font-semibold flex-1"
                                    >
                                        {loading ? 'Salvando...' : 'Salvar Fluxo'}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(-1)}
                                        disabled={loading}
                                        startIcon={<X size={20} />}
                                        className="!border-gray-600 !text-gray-300 !px-8 !py-3 !rounded-xl hover:!bg-gray-800"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </motion.div>

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

export default FluxoForm;