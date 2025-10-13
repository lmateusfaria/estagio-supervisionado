import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { FileText, TrendingUp, Users } from "lucide-react";
import Navbar from "../../components/navbar/Navbar";

const HomePage = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="flex-1 flex flex-col items-center justify-center text-center p-6 md:p-8 mt-16 md:mt-20 bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow text-white">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg"
                >
                    Digitalize seus processos,<br />
                    <span className="text-gray-200">elimine o papel</span>
                </motion.h1>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-4 md:mt-6 max-w-xl md:max-w-2xl text-sm md:text-lg text-gray-100">
                    O <strong>SMD</strong> transforma formulários físicos em fluxos digitais inteligentes, otimizando tempo, reduzindo custos e garantindo segurança da informação.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
                    <Button variant="contained" className="bg-gradient-to-r from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-white font-bold px-6 py-3 rounded-full shadow-lg w-full sm:w-auto">
                        Começar Agora
                    </Button>

                    <Button variant="contained" sx={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.6)', color: 'white', fontWeight: 'bold', borderRadius: '9999px', padding: '0.6rem 1.5rem', '&:hover': { backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'white' } }} className="w-full sm:w-auto">
                        Saiba Mais
                    </Button>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="bg-gradient-to-tr from-emerald-50 via-green-100 to-emerald-50 text-gray-800 py-12 md:py-16 px-4 md:px-20 rounded-t-3xl shadow-inner">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-green-900">Benefícios do <span className="text-emerald-600">SMD</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-center">
                        <FileText className="mx-auto mb-3 text-green-600" size={36} />
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Formulários Digitais</h3>
                        <p className="text-gray-700 text-sm md:text-base">Substitua formulários em papel por versões digitais interativas e rastreáveis.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-center">
                        <TrendingUp className="mx-auto mb-3 text-green-600" size={36} />
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Mais Produtividade</h3>
                        <p className="text-gray-700 text-sm md:text-base">Agilidade no preenchimento, aprovação e análise dos documentos em tempo real.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-center">
                        <Users className="mx-auto mb-3 text-green-600" size={36} />
                        <h3 className="text-lg md:text-xl font-semibold mb-2">Colaboração Segura</h3>
                        <p className="text-gray-700 text-sm md:text-base">Administradores, gestores e colaboradores conectados em um único sistema.</p>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gradient-to-r from-green-900 to-green-800 text-gray-200 text-center py-6">
                <p>© 2025 Sistema de Manuais Digitais (SMD). Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default HomePage;
