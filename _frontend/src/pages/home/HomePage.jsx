import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { 
    FileText, TrendingUp, Users, Check, X, 
    Shield, Zap, Lock, Layers, Clock, BarChart, 
    Bell, Smartphone, Github, Linkedin, Twitter 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import StatCard from "../../components/card/StatCard";
import FeatureCard from "../../components/card/FeatureCard";
import StepCard from "../../components/card/StepCard";
import PersonaCard from "../../components/card/PersonaCard";

const HomePage = () => {
    const navigate = useNavigate();

    // Variantes de animação
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    // Dados das seções
    const steps = [
        {
            title: "Crie Fluxos Personalizados",
            description: "Configure processos específicos para cada departamento da sua empresa com campos customizáveis.",
            icon: <Layers className="text-white" size={28} />
        },
        {
            title: "Digitalize Documentos",
            description: "Transforme formulários em papel em dados estruturados acessíveis de qualquer lugar.",
            icon: <FileText className="text-white" size={28} />
        },
        {
            title: "Preencha Online",
            description: "Colaboradores preenchem documentos via web com validação automática de dados.",
            icon: <Smartphone className="text-white" size={28} />
        },
        {
            title: "Aprove em Tempo Real",
            description: "Gestores acompanham e aprovam documentos instantaneamente pelo sistema.",
            icon: <Check className="text-white" size={28} />
        },
        {
            title: "Gere Insights Automáticos",
            description: "Relatórios e indicadores de performance gerados automaticamente para tomada de decisão.",
            icon: <BarChart className="text-white" size={28} />
        }
    ];

    const personas = [
        {
            avatar: "👨‍💼",
            role: "Administradores",
            description: "Controle total do sistema, gestão de usuários e relatórios estratégicos",
            benefits: [
                "Dashboard completo com visão 360°",
                "Auditoria de todos os processos",
                "Controle granular de permissões",
                "Relatórios customizados"
            ]
        },
        {
            avatar: "👔",
            role: "Gestores",
            description: "Acompanhamento de fluxos, aprovações e análise de performance em tempo real",
            benefits: [
                "Aprovações rápidas e digitais",
                "Notificações inteligentes",
                "Métricas de produtividade",
                "Histórico de mudanças"
            ]
        },
        {
            avatar: "👨‍💻",
            role: "Colaboradores",
            description: "Preenchimento simples e rápido de documentos digitais de qualquer dispositivo",
            benefits: [
                "Interface intuitiva e amigável",
                "Acesso mobile responsivo",
                "Validação automática de dados",
                "Suporte em tempo real"
            ]
        }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <Navbar />

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-8 mt-16 md:mt-20 bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 bg-[length:200%_200%] animate-gradient-slow text-white min-h-[600px]">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
                >
                    Transforme Papel em<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">Produtividade Digital</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.4 }} 
                    className="mt-4 md:mt-6 max-w-xl md:max-w-2xl text-base md:text-xl text-gray-100"
                >
                    O <strong>SMD</strong> elimina processos manuais, reduz <strong className="text-emerald-400">80% do tempo</strong> em aprovações e garante <strong className="text-emerald-400">100% de rastreabilidade</strong>.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.8 }} 
                    className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
                >
                    <Button 
                        variant="contained" 
                        onClick={() => navigate('/login')}
                        className="!bg-gradient-to-r !from-green-500 !to-emerald-400 hover:!from-green-400 hover:!to-emerald-300 !text-white !font-bold !text-lg !px-8 !py-3 !rounded-full !shadow-lg w-full sm:w-auto"
                    >
                        Começar Gratuitamente
                    </Button>

                    <Button 
                        variant="outlined" 
                        onClick={() => scrollToSection('como-funciona')}
                        sx={{ 
                            border: '2px solid rgba(255,255,255,0.6)', 
                            color: 'white', 
                            fontWeight: 'bold', 
                            fontSize: '1.125rem',
                            borderRadius: '9999px', 
                            padding: '0.75rem 2rem', 
                            '&:hover': { 
                                backgroundColor: 'rgba(255,255,255,0.1)', 
                                borderColor: 'white',
                                border: '2px solid white'
                            } 
                        }} 
                        className="w-full sm:w-auto"
                    >
                        Como Funciona
                    </Button>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-6 text-sm text-gray-300"
                >
                    ✓ Sem cartão de crédito &nbsp;•&nbsp; ✓ Configuração em 5 minutos
                </motion.p>
            </section>

            {/* Estatísticas Section */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900 px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-7xl mx-auto"
                >
                    <motion.h2 
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
                    >
                        Resultados que <span className="text-green-400">Comprovam</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div variants={itemVariants}>
                            <StatCard
                                icon={<FileText size={40} />}
                                number="10.000+"
                                label="Documentos Digitalizados"
                                trend="+45% este mês"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                icon={<Users size={40} />}
                                number="500+"
                                label="Empresas Ativas"
                                trend="+28% trimestre"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                icon={<TrendingUp size={40} />}
                                number="80%"
                                label="Redução de Tempo"
                                trend="↑ Economia média"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                icon={<Shield size={40} />}
                                number="100%"
                                label="Dados Seguros"
                                trend="✓ Criptografados"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Benefícios Section - Redesenhado */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-green-950/30 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Por Que Escolher o <span className="text-green-400">SMD</span>?
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Elimine papelada e processos manuais com uma solução completa e moderna
                    </p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        <motion.div variants={itemVariants} className="group relative">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                            
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <FileText className="text-white" size={28} />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-white">Formulários Digitais</h3>
                                <p className="text-gray-300 mb-4">
                                    Substitua formulários em papel por versões digitais interativas e rastreáveis.
                                </p>
                                
                                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                                    <TrendingUp size={18} />
                                    <span>Redução de 90% no papel</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                            
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-xl flex items-center justify-center mb-4">
                                    <Clock className="text-white" size={28} />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-white">Mais Produtividade</h3>
                                <p className="text-gray-300 mb-4">
                                    Agilidade no preenchimento, aprovação e análise dos documentos em tempo real.
                                </p>
                                
                                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                                    <Zap size={18} />
                                    <span>80% mais rápido</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                            
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="text-white" size={28} />
                                </div>
                                
                                <h3 className="text-xl font-bold mb-2 text-white">Colaboração Segura</h3>
                                <p className="text-gray-300 mb-4">
                                    Administradores, gestores e colaboradores conectados em um único sistema.
                                </p>
                                
                                <div className="flex items-center gap-2 text-pink-400 font-semibold text-sm">
                                    <Shield size={18} />
                                    <span>Criptografia total</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Como Funciona - Timeline Section */}
            <section id="como-funciona" className="py-16 md:py-20 bg-gradient-to-b from-green-950/30 to-gray-900 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Como o <span className="text-green-400">SMD</span> Funciona
                    </h2>
                    <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                        Do papel à análise de dados em 5 passos simples
                    </p>

                    <div className="relative">
                        {/* Linha conectora vertical */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 hidden md:block" />
                        
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            {steps.map((step, index) => (
                                <StepCard key={index} step={step} index={index} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Detalhadas Section */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-950 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Funcionalidades <span className="text-green-400">Completas</span>
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Tudo que você precisa para digitalizar seus processos
                    </p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<Layers className="text-white" size={24} />}
                                title="Versionamento Automático"
                                description="Controle de versões de documentos com histórico completo de alterações"
                                color="from-blue-500 to-cyan-500"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<Lock className="text-white" size={24} />}
                                title="Segurança Total"
                                description="Criptografia end-to-end e controle de acesso granular por perfil"
                                color="from-green-500 to-emerald-500"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<Zap className="text-white" size={24} />}
                                title="Processos Ágeis"
                                description="Automação de fluxos de aprovação com notificações em tempo real"
                                color="from-yellow-500 to-orange-500"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<Smartphone className="text-white" size={24} />}
                                title="Acesso Mobile"
                                description="Interface responsiva para trabalhar de qualquer dispositivo"
                                color="from-purple-500 to-pink-500"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<BarChart className="text-white" size={24} />}
                                title="Relatórios em Tempo Real"
                                description="Dashboard com métricas e indicadores de performance atualizados"
                                color="from-red-500 to-rose-500"
                            />
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <FeatureCard
                                icon={<Bell className="text-white" size={24} />}
                                title="Notificações Inteligentes"
                                description="Alertas automáticos para aprovações, prazos e atualizações"
                                color="from-teal-500 to-cyan-500"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Personas Section */}
            <section className="py-16 md:py-20 bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Para Quem é o <span className="text-green-400">SMD</span>?
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Solução completa para todos os níveis da sua organização
                    </p>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {personas.map((persona, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <PersonaCard {...persona} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Antes x Depois Section */}
            <section className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Antes e Depois do <span className="text-green-400">SMD</span>
                    </h2>
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        Veja a transformação que o SMD traz para sua empresa
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Coluna ANTES */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-red-950/20 border border-red-500/30 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-red-400 flex items-center gap-2">
                                <X size={28} />
                                Processos Manuais
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Formulários impressos em pilhas de papel</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Busca demorada de documentos arquivados</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Erros de preenchimento sem validação</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Sem rastreabilidade de mudanças</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="text-red-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Análise manual e lenta de dados</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Coluna DEPOIS */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-green-950/20 border border-green-500/30 rounded-2xl p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6 text-green-400 flex items-center gap-2">
                                <Check size={28} />
                                Com SMD
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Formulários digitais acessíveis de qualquer lugar</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Busca instantânea por qualquer campo</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Validação automática de dados em tempo real</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Histórico completo de versões e alterações</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                    <span className="text-gray-300">Relatórios automáticos e dashboards em tempo real</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Final Section */}
            <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">
                            Pronto para Eliminar o Papel?
                        </h2>
                        
                        <p className="text-xl mb-8 text-white/90">
                            Junte-se a <strong>centenas de empresas</strong> que já digitalizaram seus processos
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="contained"
                                size="large"
                                onClick={() => navigate('/login')}
                                className="!bg-white !text-green-600 !font-bold !text-lg !px-8 !py-4 !rounded-full hover:!scale-105 transition-transform"
                            >
                                Começar Gratuitamente
                            </Button>
                            
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/dashboard')}
                                sx={{
                                    border: '2px solid white',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '1.125rem',
                                    padding: '1rem 2rem',
                                    borderRadius: '9999px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        border: '2px solid white'
                                    }
                                }}
                            >
                                Ver Demonstração
                            </Button>
                        </div>
                        
                        <p className="mt-6 text-sm text-white/70">
                            ✓ Sem cartão de crédito &nbsp;•&nbsp; ✓ Configuração em 5 minutos &nbsp;•&nbsp; ✓ Suporte dedicado
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Footer Completo */}
            <footer className="bg-gradient-to-br from-gray-950 via-green-950 to-gray-950 text-gray-300 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Coluna 1: Sobre */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">🌿 SMD</h3>
                        <p className="text-sm mb-4 text-gray-400">
                            Sistema de Manuais Digitais. Transformando processos manuais em fluxos digitais inteligentes.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="hover:text-green-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="hover:text-green-400 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/lmateusfaria/estagio-supervisionado" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                    
                    {/* Coluna 2: Produto */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Produto</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Funcionalidades</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Planos e Preços</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Segurança</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Integrações</a></li>
                        </ul>
                    </div>
                    
                    {/* Coluna 3: Recursos */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Recursos</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Documentação</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Tutoriais</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Suporte</a></li>
                        </ul>
                    </div>
                    
                    {/* Coluna 4: Empresa */}
                    <div>
                        <h4 className="font-semibold text-white mb-4">Empresa</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-green-400 transition-colors">Sobre Nós</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Contato</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Política de Privacidade</a></li>
                            <li><a href="#" className="hover:text-green-400 transition-colors">Termos de Uso</a></li>
                        </ul>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
                    <p>© 2025 Sistema de Manuais Digitais (SMD). Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
