import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100 max-w-2xl mx-auto">
                        <h1 className="text-2xl font-bold mb-4">{isEdit ? 'Editar Fluxo' : 'Novo Fluxo'}</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <TextField label="Nome" value={form.nome} onChange={handleChange('nome')} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />
                            <TextField label="Ordem/Descrição" value={form.ordemServico} onChange={handleChange('ordemServico')} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />
                            <TextField label="Versão" type="number" value={form.versaoDoc} onChange={handleChange('versaoDoc')} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />

                            <div className="flex gap-3">
                                <Button variant="contained" type="submit" className="flex-1">Salvar</Button>
                                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
                            </div>
                        </form>
                    </div>
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
