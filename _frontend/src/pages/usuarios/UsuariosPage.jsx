import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
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
            alert("Erro ao carregar usuários");
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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                {/* Sidebar escondida em telas pequenas (mobile-first) */}
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Usuários</h1>
                        <div className="flex w-full md:w-auto gap-3">
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => navigate("/usuarios/novo")}
                                className="rounded-full flex-1 md:flex-none"
                            >
                                Cadastrar Usuário
                            </Button>
                            <Button variant="contained" onClick={fetchUsuarios} className="text-white">
                                Atualizar
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
                        {loading ? (
                            <p>Carregando usuários...</p>
                        ) : usuarios.length === 0 ? (
                            <p>Nenhum usuário encontrado.</p>
                        ) : (
                            <>
                                {/* tabela visível em md+ */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full table-auto text-left">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">ID</th>
                                                <th className="px-4 py-2">Nome</th>
                                                <th className="px-4 py-2">Email</th>
                                                <th className="px-4 py-2">Tipo</th>
                                                <th className="px-4 py-2">Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuarios.map((u) => (
                                                <tr key={u.id} className="border-t border-white/10">
                                                    <td className="px-4 py-3">{u.id}</td>
                                                    <td className="px-4 py-3">{u.nome || u.login || u.name}</td>
                                                    <td className="px-4 py-3">{u.email}</td>
                                                    <td className="px-4 py-3">{u.nomeEmpresa}</td>
                                                    <td className="px-4 py-3">{u.dataCadastro}</td>
                                                    <td className="px-4 py-3">{u.tipo || u.role || (u.roles && u.roles.map(r=>r.authority).join(", ")) || (u.tipoUsuario ? (Array.isArray(u.tipoUsuario) ? u.tipoUsuario.map(t=>t.tipoUsuario || t).join(', ') : u.tipoUsuario) : '')}</td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex gap-2">
                                                            <Button size="small" variant="contained" onClick={() => navigate(`/usuarios/${u.id}`)}>
                                                                Ver
                                                            </Button>
                                                            <Button size="small" color="error" variant="contained" onClick={() => handleDeleteRequest(u.id)}>
                                                                Excluir
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* lista/cards visíveis em sm */}
                                <div className="md:hidden space-y-3">
                                    {usuarios.map((u) => (
                                        <div key={u.id} className="bg-white/5 p-4 rounded-lg shadow-inner">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-semibold">{u.nome || u.login || u.name}</div>
                                                    <div className="text-xs text-gray-200">{u.email}</div>
                                                    <div className="text-xs text-gray-200">{u.nomeEmpresa}</div>
                                                </div>
                                                <div className="text-right text-xs text-gray-300">ID: {u.id}</div>
                                            </div>
                                            <div className="mt-3 flex gap-2">
                                                <Button size="small" variant="contained" onClick={() => navigate(`/usuarios/${u.id}`)} fullWidth>
                                                    Ver
                                                </Button>
                                                <Button size="small" color="error" variant="contained" onClick={() => handleDeleteRequest(u.id)} fullWidth>
                                                    Excluir
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                    
                    {/* Dialog de confirmação */}
                    <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                        <DialogTitle>Confirmar exclusão</DialogTitle>
                        <DialogContent>Deseja realmente excluir este usuário?</DialogContent>
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

export default UsuariosPage;
