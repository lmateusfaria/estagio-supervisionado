import { useState } from "react";
import {
    Button,
    TextField,
    InputAdornment,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { User, Lock, Check, Shield, Zap, BarChart, ArrowRight } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await login({ login: username, password });
            if (result.ok) {
                navigate("/dashboard");
            } else {
                setError(result.msg || "Usuário ou senha inválidos");
            }
        } catch (err) {
            setError("Usuário ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    // Animação variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
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

    const benefits = [
        { icon: <Shield size={24} />, text: "100% Seguro e Criptografado" },
        { icon: <Zap size={24} />, text: "Acesso Rápido de Qualquer Lugar" },
        { icon: <BarChart size={24} />, text: "Dados em Tempo Real" }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-gray-950">
            <Navbar />

            <div className="flex-1 flex items-stretch mt-16 md:mt-20">
                {/* Coluna Esquerda - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-950 via-emerald-900 to-teal-950 relative overflow-hidden"
                >
                    {/* Pattern Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    {/* Gradient Orbs */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-green-500 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-center px-16 py-12">
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-6xl font-extrabold text-white mb-4">
                                🌿 SMD
                            </h1>
                            <h2 className="text-4xl font-bold text-white mb-6">
                                Bem-vindo de Volta
                            </h2>
                            <p className="text-xl text-gray-300 mb-12 max-w-md">
                                Gerencie seus processos de forma <span className="text-green-400 font-semibold">inteligente</span> e <span className="text-green-400 font-semibold">eficiente</span>
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-6"
                        >
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="flex items-center gap-4 text-white"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-green-500/20 backdrop-blur-sm border border-green-500/30 flex items-center justify-center text-green-400">
                                        {benefit.icon}
                                    </div>
                                    <span className="text-lg text-gray-200">{benefit.text}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="mt-12 pt-12 border-t border-white/10"
                        >
                            <p className="text-gray-400 text-sm">
                                "Desde que implementamos o SMD, reduzimos <strong className="text-green-400">80% do tempo</strong> em processos manuais."
                            </p>
                            <p className="text-gray-500 text-xs mt-2">— Empresa parceira</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Coluna Direita - Formulário */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-gray-900">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full max-w-md"
                    >
                        {/* Mobile Branding */}
                        <div className="lg:hidden text-center mb-8">
                            <h1 className="text-4xl font-extrabold text-white mb-2">
                                🌿 SMD
                            </h1>
                            <p className="text-gray-400">Sistema de Manuais Digitais</p>
                        </div>

                        {/* Card do Formulário */}
                        <div className="relative group">
                            {/* Gradient border effect */}
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
                            
                            <div className="relative bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 md:p-10">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-8"
                                >
                                    <h2 className="text-3xl font-bold text-white mb-2">
                                        Login
                                    </h2>
                                    <p className="text-gray-400">
                                        Acesse sua conta para continuar
                                    </p>
                                </motion.div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <TextField
                                            label="Usuário ou E-mail"
                                            fullWidth
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(75, 85, 99, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(16, 185, 129, 0.5)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#10b981',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(156, 163, 175, 1)',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#10b981',
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <User className="text-gray-400" size={20} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 }}
                                    >
                                        <TextField
                                            type="password"
                                            label="Senha"
                                            fullWidth
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    backgroundColor: 'rgba(17, 24, 39, 0.5)',
                                                    '& fieldset': {
                                                        borderColor: 'rgba(75, 85, 99, 0.5)',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'rgba(16, 185, 129, 0.5)',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#10b981',
                                                    },
                                                },
                                                '& .MuiInputLabel-root': {
                                                    color: 'rgba(156, 163, 175, 1)',
                                                },
                                                '& .MuiInputLabel-root.Mui-focused': {
                                                    color: '#10b981',
                                                }
                                            }}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock className="text-gray-400" size={20} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                        className="flex items-center justify-between"
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={rememberMe}
                                                    onChange={(e) => setRememberMe(e.target.checked)}
                                                    sx={{
                                                        color: 'rgba(156, 163, 175, 1)',
                                                        '&.Mui-checked': {
                                                            color: '#10b981',
                                                        },
                                                    }}
                                                />
                                            }
                                            label={<span className="text-gray-300 text-sm">Lembrar-me</span>}
                                        />
                                        <a
                                            href="#"
                                            className="text-sm text-green-400 hover:text-green-300 transition-colors"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert('Funcionalidade em desenvolvimento');
                                            }}
                                        >
                                            Esqueceu a senha?
                                        </a>
                                    </motion.div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Alert 
                                                severity="error" 
                                                className="!bg-red-900/20 !border !border-red-500/50 !text-red-200"
                                            >
                                                {error}
                                            </Alert>
                                        </motion.div>
                                    )}

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1 }}
                                    >
                                        <Button
                                            type="submit"
                                            fullWidth
                                            disabled={loading}
                                            className="!rounded-full !py-3 !font-bold !text-white !bg-gradient-to-r !from-green-600 !to-emerald-500 hover:!from-green-500 hover:!to-emerald-400 !shadow-lg disabled:!opacity-50 disabled:!cursor-not-allowed !transition-all !duration-300 hover:!scale-[1.02]"
                                        >
                                            {loading ? (
                                                <div className="flex items-center justify-center gap-2">
                                                    <CircularProgress size={20} className="!text-white" />
                                                    Entrando...
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center gap-2">
                                                    Entrar
                                                    <ArrowRight size={20} />
                                                </div>
                                            )}
                                        </Button>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.3 }}
                                        className="text-center pt-4"
                                    >
                                        <p className="text-gray-400 text-sm">
                                            Não tem uma conta?{' '}
                                            <a
                                                href="#"
                                                className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    alert('Funcionalidade em desenvolvimento. Entre em contato com o administrador.');
                                                }}
                                            >
                                                Criar conta
                                            </a>
                                        </p>
                                    </motion.div>
                                </form>

                                {/* Links úteis */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.5 }}
                                    className="mt-8 pt-6 border-t border-gray-700/50 flex justify-center gap-6 text-xs text-gray-500"
                                >
                                    <a href="/" className="hover:text-green-400 transition-colors">
                                        Página Inicial
                                    </a>
                                    <span>•</span>
                                    <a href="#" className="hover:text-green-400 transition-colors">
                                        Suporte
                                    </a>
                                    <span>•</span>
                                    <a href="#" className="hover:text-green-400 transition-colors">
                                        Privacidade
                                    </a>
                                </motion.div>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.7 }}
                            className="mt-6 text-center"
                        >
                            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
                                <Shield size={16} className="text-green-400" />
                                <span>Conexão segura e criptografada</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
