import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import { Button, Snackbar, Alert } from "@mui/material";

const RelatoriosPage = () => {
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

    const handleGenerate = (type) => {
        // placeholder: aqui você pode chamar o backend para gerar/baixar relatórios
        setSnackbar({ open: true, message: `Gerando relatório: ${type} (em desenvolvimento)`, severity: 'info' });
    };

    const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
            <DashboardNavbar />

            <div className="flex flex-1">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <main className="flex-1 p-4 md:p-8 text-white">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
                        <p className="text-sm text-gray-200">Gere relatórios do sistema rapidamente.</p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-lg font-semibold">Relatório de Usuários</div>
                                <div className="text-sm text-gray-300 mt-2">Exporta lista de usuários em CSV.</div>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="contained" onClick={() => handleGenerate('usuarios')}>Gerar</Button>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-lg font-semibold">Relatório de Fluxos</div>
                                <div className="text-sm text-gray-300 mt-2">Resumo de versões e documentos por fluxo.</div>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="contained" onClick={() => handleGenerate('fluxos')}>Gerar</Button>
                                </div>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg">
                                <div className="text-lg font-semibold">Relatório Customizado</div>
                                <div className="text-sm text-gray-300 mt-2">Escolha filtros e gere relatórios personalizados.</div>
                                <div className="mt-3 flex gap-2">
                                    <Button variant="contained" onClick={() => handleGenerate('custom')}>Gerar</Button>
                                </div>
                            </div>
                        </div>
                    </div>

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
