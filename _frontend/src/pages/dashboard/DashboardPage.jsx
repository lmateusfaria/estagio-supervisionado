import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import { motion } from "framer-motion";
import { 
    FileText, Users, GitBranch, TrendingUp, 
    Clock, CheckCircle, AlertCircle, Plus,
    ArrowRight, Activity, Zap
} from "lucide-react";

const DashboardPage = () => {
    const { isAuthenticated, user, fetchUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && !user) {
            fetchUser();
        }
    }, [isAuthenticated, user, fetchUser]);

    // Dados mockados para demonstração
    const stats = [
        { 
            icon: FileText, 
            label: 'Total de Documentos', 
            value: '1,234', 
            trend: '+12%',
            trendUp: true,
            color: 'emerald'
        },
        { 
            icon: Users, 
            label: 'Usuários Ativos', 
            value: '89', 
            trend: '+5%',
            trendUp: true,
            color: 'blue'
        },
        { 
            icon: GitBranch, 
            label: 'Fluxos Ativos', 
            value: '23', 
            trend: '+8%',
            trendUp: true,
            color: 'purple'
        },
        { 
            icon: CheckCircle, 
            label: 'Aprovações Pendentes', 
            value: '47', 
            trend: '-15%',
            trendUp: false,
            color: 'orange'
        },
    ];

    const recentActivities = [
        { id: 1, type: 'document', action: 'Documento "Manual de Processos" foi aprovado', time: '5 min atrás', user: 'João Silva' },
        { id: 2, type: 'flow', action: 'Fluxo "Compras" foi atualizado', time: '1h atrás', user: 'Maria Santos' },
        { id: 3, type: 'user', action: 'Novo usuário cadastrado: Pedro Costa', time: '2h atrás', user: 'Admin' },
        { id: 4, type: 'document', action: 'Documento "Procedimento X" está em análise', time: '3h atrás', user: 'Ana Paula' },
    ];

    const quickActions = [
        { icon: FileText, label: 'Novo Documento', color: 'emerald', action: () => navigate('/documentos/novo') },
        { icon: Users, label: 'Novo Usuário', color: 'blue', action: () => navigate('/usuarios/novo') },
        { icon: GitBranch, label: 'Novo Fluxo', color: 'purple', action: () => navigate('/fluxos/novo') },
        { icon: Activity, label: 'Ver Relatórios', color: 'orange', action: () => navigate('/relatorios') },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'document': return <FileText size={16} className="text-emerald-400" />;
            case 'flow': return <GitBranch size={16} className="text-purple-400" />;
            case 'user': return <Users size={16} className="text-blue-400" />;
            default: return <Activity size={16} className="text-gray-400" />;
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
                    {/* Header de Boas-vindas */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Olá, {user?.login || 'Usuário'}! 👋
                        </h1>
                        <p className="text-gray-400">
                            Aqui está um resumo das suas atividades hoje
                        </p>
                    </motion.div>

                    {/* Cards Estatísticos */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-${stat.color}-500/10 rounded-xl`}>
                                            <stat.icon className={`text-${stat.color}-400`} size={24} />
                                        </div>
                                        <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-emerald-400' : 'text-red-400'}`}>
                                            <TrendingUp size={16} className={stat.trendUp ? '' : 'rotate-180'} />
                                            <span className="font-semibold">{stat.trend}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Atividades Recentes */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Clock size={20} className="text-emerald-400" />
                                    Atividades Recentes
                                </h2>
                                <button className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                                    Ver todas
                                    <ArrowRight size={16} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * activity.id }}
                                        className="flex items-start gap-4 p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors cursor-pointer group"
                                    >
                                        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-emerald-500/10 transition-colors">
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-white text-sm mb-1">{activity.action}</p>
                                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                                <span>{activity.time}</span>
                                                <span>•</span>
                                                <span>{activity.user}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Ações Rápidas */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <Zap size={20} className="text-emerald-400" />
                                Ações Rápidas
                            </h2>

                            <div className="space-y-3">
                                {quickActions.map((action, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={action.action}
                                        className={`w-full flex items-center justify-between p-4 bg-gradient-to-r from-${action.color}-500/10 to-${action.color}-600/5 hover:from-${action.color}-500/20 hover:to-${action.color}-600/10 border border-${action.color}-500/20 rounded-xl transition-all duration-300 group`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 bg-${action.color}-500/10 rounded-lg group-hover:bg-${action.color}-500/20 transition-colors`}>
                                                <action.icon className={`text-${action.color}-400`} size={20} />
                                            </div>
                                            <span className="text-white font-medium text-sm">{action.label}</span>
                                        </div>
                                        <ArrowRight size={16} className={`text-${action.color}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Info Card */}
                            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertCircle size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-white font-semibold text-sm mb-1">Dica do Dia</h3>
                                        <p className="text-gray-400 text-xs">
                                            Você pode usar atalhos do teclado para navegar mais rápido pelo sistema.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
