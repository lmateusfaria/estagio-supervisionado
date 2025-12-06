import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import { Button, Snackbar, Alert } from "@mui/material";
import { motion } from "framer-motion";
import { BarChart, FileText, Users, GitBranch, Download, TrendingUp, Calendar, Filter } from "lucide-react";

const RelatoriosPage = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const handleGenerate = (type, title) => {
        setSnackbar({ open: true, message: `Gerando ${title}... (em desenvolvimento)`, severity: 'info' });
    };

    const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

    const reportCards = [
        {
            icon: Users,
            title: "Relatório de Usuários",
            description: "Exporta lista completa de usuários cadastrados no sistema em formato CSV ou PDF.",
            color: "blue",
            stats: "89 usuários",
            type: "usuarios"
        },
        {
            icon: GitBranch,
            title: "Relatório de Fluxos",
            description: "Resumo detalhado de versões, documentos vinculados e status de cada fluxo.",
            color: "purple",
            stats: "23 fluxos ativos",
            type: "fluxos"
        },
        {
            icon: FileText,
            title: "Relatório de Documentos",
            description: "Lista todos os documentos cadastrados com informações de criação e última modificação.",
            color: "emerald",
            stats: "1,234 documentos",
            type: "documentos"
        },
        {
            icon: TrendingUp,
            title: "Análise de Atividades",
            description: "Gráficos e métricas sobre atividades do sistema, aprovações e atualizações.",
            color: "orange",
            stats: "Últimos 30 dias",
            type: "atividades"
        },
        {
            icon: Calendar,
            title: "Relatório Temporal",
            description: "Histórico de mudanças e evolução do sistema em período específico.",
            color: "pink",
            stats: "Período customizado",
            type: "temporal"
        },
        {
            icon: Filter,
            title: "Relatório Customizado",
            description: "Escolha filtros específicos e gere relatórios personalizados com os dados desejados.",
            color: "cyan",
            stats: "Totalmente flexível",
            type: "custom"
        }
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

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const getColorClasses = (color) => {
        const colors = {
            blue: { bg: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20', icon: 'text-blue-400', button: '!bg-blue-600 hover:!bg-blue-700' },
            purple: { bg: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20', icon: 'text-purple-400', button: '!bg-purple-600 hover:!bg-purple-700' },
            emerald: { bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20', icon: 'text-emerald-400', button: '!bg-emerald-600 hover:!bg-emerald-700' },
            orange: { bg: 'from-orange-500/10 to-orange-600/5', border: 'border-orange-500/20', icon: 'text-orange-400', button: '!bg-orange-600 hover:!bg-orange-700' },
            pink: { bg: 'from-pink-500/10 to-pink-600/5', border: 'border-pink-500/20', icon: 'text-pink-400', button: '!bg-pink-600 hover:!bg-pink-700' },
            cyan: { bg: 'from-cyan-500/10 to-cyan-600/5', border: 'border-cyan-500/20', icon: 'text-cyan-400', button: '!bg-cyan-600 hover:!bg-cyan-700' },
        };
        return colors[color] || colors.blue;
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
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-3 bg-orange-500/10 rounded-xl">
                                <BarChart className="text-orange-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">Relatórios</h1>
                                <p className="text-gray-400 text-sm mt-1">Gere relatórios detalhados do sistema</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Cards Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {reportCards.map((card, index) => {
                            const Icon = card.icon;
                            const colorClasses = getColorClasses(card.color);

                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className={`relative group bg-gradient-to-br ${colorClasses.bg} border ${colorClasses.border} rounded-2xl p-6 hover:shadow-xl hover:shadow-${card.color}-500/10 transition-all duration-300`}
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-gray-800/50 rounded-xl`}>
                                            <Icon className={colorClasses.icon} size={28} />
                                        </div>
                                        <div className={`px-3 py-1 bg-gray-800/50 rounded-full border ${colorClasses.border}`}>
                                            <span className={`text-xs font-semibold ${colorClasses.icon}`}>
                                                {card.stats}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                    <p className="text-sm text-gray-400 mb-6 min-h-[60px]">
                                        {card.description}
                                    </p>

                                    {/* Action Button */}
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={() => handleGenerate(card.type, card.title)}
                                        className={`${colorClasses.button} !text-white !py-3 !rounded-xl !font-semibold !shadow-lg`}
                                        startIcon={<Download size={18} />}
                                    >
                                        Gerar Relatório
                                    </Button>

                                    {/* Hover Effect Glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses.bg} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10`} />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <FileText className="text-blue-400" size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg mb-2">Como gerar relatórios?</h3>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <p>• Clique no botão "Gerar Relatório" no card desejado</p>
                                    <p>• O sistema processará os dados e gerará o arquivo</p>
                                    <p>• Você pode escolher entre formatos PDF, CSV ou Excel (quando disponível)</p>
                                    <p>• Relatórios customizados permitem selecionar período e filtros específicos</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                            {snackbar.message}
                        </Alert>
                    </Snackbar>
                </main>
            </div>
        </div>
    );
};

export default RelatoriosPage;
