import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, CircularProgress, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import { 
    User, Mail, Building2, Calendar, Clock, 
    Shield, ArrowLeft, Edit, UserCircle 
} from "lucide-react";

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
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    const getTipoUsuarioDisplay = (tipo) => {
        if (!tipo) return '-';
        if (Array.isArray(tipo)) {
            return tipo.map(t => t.tipoUsuario || t).join(', ');
        }
        return tipo;
    };

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
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <UserCircle className="text-blue-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Detalhes do Usuário</h1>
                                <p className="text-gray-400 text-sm mt-1">Informações completas do cadastro</p>
                            </div>
                        </div>
                    </motion.div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <CircularProgress sx={{ color: '#60a5fa' }} />
                        </div>
                    ) : !usuario ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-16"
                        >
                            <User className="mx-auto text-gray-600 mb-4" size={64} />
                            <p className="text-gray-400 text-lg">Usuário não encontrado</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="max-w-4xl mx-auto space-y-6"
                        >
                            {/* Card Principal - Avatar e Nome */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <Avatar
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            fontSize: '2rem',
                                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {getInitials(usuario.nome || usuario.login)}
                                    </Avatar>
                                    <div className="text-center sm:text-left flex-1">
                                        <h2 className="text-2xl font-bold text-white mb-1">
                                            {usuario.nome || usuario.login}
                                        </h2>
                                        <p className="text-gray-400 flex items-center gap-2 justify-center sm:justify-start">
                                            <Mail size={16} />
                                            {usuario.email}
                                        </p>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        startIcon={<Edit size={18} />}
                                        onClick={() => navigate(`/usuarios/${id}/editar`)}
                                        className="!border-blue-500 !text-blue-400 hover:!bg-blue-500/10 !rounded-lg"
                                    >
                                        Editar
                                    </Button>
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
                                        <User size={20} className="text-blue-400" />
                                        Informações Básicas
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">ID</p>
                                            <p className="text-white font-medium">{usuario.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Tipo de Usuário</p>
                                            <div className="flex items-center gap-2">
                                                <Shield size={16} className="text-blue-400" />
                                                <p className="text-white font-medium">
                                                    {getTipoUsuarioDisplay(usuario.tipoUsuario)}
                                                </p>
                                            </div>
                                        </div>
                                        {(usuario.gestorId || usuario.nomeGestor || usuario.gestor) && (
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">Gestor</p>
                                                <p className="text-white font-medium">
                                                    {usuario.nomeGestor || (usuario.gestor && usuario.gestor.nome) || `ID: ${usuario.gestorId}`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>

                                {/* Informações da Empresa */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Building2 size={20} className="text-emerald-400" />
                                        Empresa
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1">Nome da Empresa</p>
                                            <p className="text-white font-medium">{usuario.nomeEmpresa || '-'}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Datas */}
                                <motion.div
                                    variants={itemVariants}
                                    className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 md:col-span-2"
                                >
                                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                        <Calendar size={20} className="text-purple-400" />
                                        Histórico
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                                                <Calendar size={14} />
                                                Data de Cadastro
                                            </p>
                                            <p className="text-white font-medium">
                                                {usuario.dataCadastro || '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                                                <Clock size={14} />
                                                Último Login
                                            </p>
                                            <p className="text-white font-medium">
                                                {usuario.dataUltimoLogin || '-'}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Botão Voltar */}
                            <motion.div
                                variants={itemVariants}
                                className="flex justify-start"
                            >
                                <Button
                                    variant="outlined"
                                    startIcon={<ArrowLeft size={18} />}
                                    onClick={() => navigate(-1)}
                                    className="!border-gray-600 !text-gray-300 !rounded-lg hover:!bg-gray-800"
                                >
                                    Voltar
                                </Button>
                            </motion.div>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default UsuarioDetail;