import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";

const FluxosPage = () => {
    const [fluxos, setFluxos] = useState([]);
    const [loading, setLoading] = useState(true);
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
            alert("Erro ao carregar fluxos");
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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Fluxos</h1>
                        <div className="flex w-full md:w-auto gap-3">
                            <Button variant="contained" color="success" onClick={() => navigate('/fluxos/novo')} className="rounded-full flex-1 md:flex-none">
                                Novo Fluxo
                            </Button>
                            <Button variant="contained" onClick={fetchFluxos} className="text-white">
                                Atualizar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
                        {loading ? (
                            <p>Carregando fluxos...</p>
                        ) : fluxos.length === 0 ? (
                            <p>Nenhum fluxo encontrado.</p>
                        ) : (
                            <>
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full table-auto text-left">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">ID</th>
                                                <th className="px-4 py-2">Nome</th>
                                                <th className="px-4 py-2">Descrição</th>
                                                <th className="px-4 py-2">Versão</th>
                                                <th className="px-4 py-2">Criado por</th>
                                                <th className="px-4 py-2">Atualizado por</th>
                                                <th className="px-4 py-2">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fluxos.map((f) => (
                                                <tr key={f.id} className="border-t border-white/10">
                                                    <td className="px-4 py-3">{f.id}</td>
                                                    <td className="px-4 py-3">{f.nome}</td>
                                                    <td className="px-4 py-3">{f.ordemServico || f.descricaoFluxo}</td>
                                                    <td className="px-4 py-3">{f.versaoDoc}</td>
                                                    <td className="px-4 py-3">{f.nomeUsuarioCriador || '-'}</td>
                                                    <td className="px-4 py-3">{f.nomeUsuarioAtualizador || '-'}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <Button size="small" variant="contained" onClick={() => navigate(`/fluxos/${f.id}`)}>
                                                                Ver
                                                            </Button>
                                                            <Button size="small" variant="contained" onClick={() => navigate(`/fluxos/${f.id}/editar`)}>
                                                                Editar
                                                            </Button>
                                                            <Button size="small" color="error" variant="contained" onClick={() => handleDeleteRequest(f.id)}>
                                                                Excluir
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="md:hidden space-y-3">
                                    {fluxos.map((f) => (
                                        <div key={f.id} className="bg-white/5 p-4 rounded-lg shadow-inner">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-semibold">{f.nome}</div>
                                                    <div className="text-xs text-gray-200">{f.ordemServico || f.descricaoFluxo}</div>
                                                    <div className="text-xs text-gray-300 mt-1">Criado por: {f.nomeUsuarioCriador || '-'}</div>
                                                    <div className="text-xs text-gray-300">Atualizado por: {f.nomeUsuarioAtualizador || '-'}</div>
                                                </div>
                                                <div className="text-right text-xs text-gray-300">ID: {f.id}</div>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                <Button size="small" variant="contained" onClick={() => navigate(`/fluxos/${f.id}`)} fullWidth>
                                                    Ver
                                                </Button>
                                                <Button size="small" variant="contained" onClick={() => navigate(`/fluxos/${f.id}/editar`)} fullWidth>
                                                    Editar
                                                </Button>
                                                <Button size="small" color="error" variant="contained" onClick={() => handleDeleteRequest(f.id)} fullWidth>
                                                    Excluir
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
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

export default FluxosPage;
