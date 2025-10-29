import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button } from "@mui/material";

const UsuarioDetail = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.get(`/api/admin/listarUsuario/${id}`);
                setUsuario(data);
            } catch (err) {
                console.error("Erro ao buscar usuário", err);
                alert("Erro ao carregar usuário");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600">
            <DashboardNavbar />
            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <main className="flex-1 p-4 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Detalhe do Usuário</h1>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
                        {loading ? (
                            <p>Carregando...</p>
                        ) : !usuario ? (
                            <p>Usuário não encontrado.</p>
                        ) : (
                            <>
                                <div className="space-y-2 text-sm md:text-base">
                                    <div><strong>ID:</strong> {usuario.id}</div>
                                    <div><strong>Nome:</strong> {usuario.nome || usuario.login}</div>
                                    <div><strong>Email:</strong> {usuario.email}</div>
                                    <div><strong>Nome da Empresa:</strong> {usuario.nomeEmpresa}</div>
                                    <div><strong>Data Cadastro:</strong> {usuario.dataCadastro}</div>
                                    <div><strong>Último Login:</strong> {usuario.dataUltimoLogin}</div>
                                    <div><strong>Tipo Usuário:</strong> {usuario.tipoUsuario ? (Array.isArray(usuario.tipoUsuario) ? usuario.tipoUsuario.map(t=>t.tipoUsuario || t).join(', ') : usuario.tipoUsuario) : ''}</div>
                                    {usuario.gestorId || usuario.nomeGestor || usuario.gestor ? (
                                        <div><strong>Gestor:</strong> {usuario.nomeGestor || (usuario.gestor && usuario.gestor.nome) || usuario.gestorId}</div>
                                    ) : null}
                                </div>
                                <div className="flex justify-end mt-6">
                                    <Button variant="contained" onClick={() => navigate(-1)} className="text-green-800 w-full md:w-auto">
                                        Voltar
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UsuarioDetail;
