import { useState } from "react";
import {
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    InputAdornment,
    CircularProgress,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { User, Lock } from "lucide-react";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const result = await login({ login: username, password });
            if (result.ok) {
                navigate("/dashboard"); // 👈 redireciona após login
            } else {
                setError(result.msg || "Usuário ou senha inválidos");
            }
        } catch (err) {
            setError("Usuário ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <section
                className="flex-1 flex items-center justify-center
        bg-gradient-to-r from-green-950 via-emerald-800 to-green-600
        bg-[length:200%_200%] animate-gradient-slow p-6"
            >
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-md md:max-w-lg">
                    <Card className="w-full shadow-2xl rounded-3xl bg-white/95 backdrop-blur-md">
                        <CardContent className="p-10">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Typography
                                    variant="h4"
                                    className="font-bold mb-2 text-center text-green-800"
                                >
                                    Bem-vindo 🌿
                                </Typography>
                                <Typography
                                    variant="body1"
                                    className="text-center mb-6 text-gray-600"
                                >
                                    Acesse sua conta para continuar
                                </Typography>
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <User className="text-green-700 w-5 h-5" />
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
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock className="text-green-700 w-5 h-5" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </motion.div>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.9 }}
                                    >
                                        <Typography
                                            color="error"
                                            className="text-center font-medium"
                                        >
                                            {error}
                                        </Typography>
                                    </motion.div>
                                )}

                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
                                    <Button type="submit" fullWidth disabled={loading} className="rounded-full py-3 font-bold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed">
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <CircularProgress size={20} color="inherit" />
                                                Carregando...
                                            </div>
                                        ) : (
                                            "Entrar"
                                        )}
                                    </Button>
                                </motion.div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </section>
        </div>
    );
};

export default LoginPage;
