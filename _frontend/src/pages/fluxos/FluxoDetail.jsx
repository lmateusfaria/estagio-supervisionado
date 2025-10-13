import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";

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
            navigate('/fluxos');
        } catch (err) {
            console.error("Erro ao excluir fluxo", err);
            setSnackbar({ open: true, message: "Erro ao excluir fluxo.", severity: "error" });
        }
    };

    const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white overflow-x-hidden">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100 w-full md:max-w-2xl md:mx-auto overflow-hidden">
                        {loading ? (
                            <p>Carregando...</p>
                        ) : !fluxo ? (
                            <p>Fluxo não encontrado.</p>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                                    <h1 className="text-2xl font-bold">{fluxo.nome}</h1>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="text-sm font-semibold">ID</div>
                                        <div className="text-xs text-gray-200">{fluxo.id}</div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-lg">
                                        <div className="text-sm font-semibold">Versão</div>
                                        <div className="text-xs text-gray-200">{fluxo.versaoDoc}</div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 bg-white/5 p-4 rounded-lg">
                                        <div className="text-sm font-semibold">Descrição / Ordem de Serviço</div>
                                        <div className="text-xs text-gray-200">{fluxo.ordemServico}</div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 bg-white/5 p-4 rounded-lg">
                                        <div className="text-sm font-semibold">Criado por</div>
                                        <div className="text-xs text-gray-200">{fluxo.nomeUsuarioCriador || '-'}</div>
                                    </div>
                                    <div className="col-span-1 md:col-span-2 bg-white/5 p-4 rounded-lg">
                                        <div className="text-sm font-semibold">Atualizado por</div>
                                        <div className="text-xs text-gray-200">{fluxo.nomeUsuarioAtualizador || '-'}</div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-6">
                                    <Button variant="contained" onClick={() => navigate(-1)} className="w-full sm:w-auto">Voltar</Button>
                                    <Button variant="contained" onClick={() => navigate(`/fluxos/${id}/editar`)} className="w-full sm:w-auto">Editar</Button>
                                    <Button variant="contained" onClick={() => navigate(`/fluxos/${id}/documentos`)} className="w-full sm:w-auto">Documentos</Button>
                                    <Button variant="contained" color="error" onClick={handleDeleteRequest} className="w-full sm:w-auto">Excluir</Button>
                                </div>
                            </div>
                        )}
                    </div>

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
