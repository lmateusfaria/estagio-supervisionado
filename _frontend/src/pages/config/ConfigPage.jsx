import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

const ConfigPage = () => {
    const [form, setForm] = useState({ companyName: '', primaryColor: '#16a34a' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
    const handleSave = () => {
        // placeholder: salvar configurações no backend
        setSnackbar({ open: true, message: 'Configurações salvas (placeholder)', severity: 'success' });
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
                    <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
                        <h1 className="text-2xl font-bold mb-4">Configurações</h1>
                        <div className="space-y-4">
                            <TextField label="Nome da Empresa" value={form.companyName} onChange={handleChange('companyName')} fullWidth variant="filled" InputProps={{ className: 'bg-white/5 text-white' }} />
                            <TextField label="Cor Primária (hex)" value={form.primaryColor} onChange={handleChange('primaryColor')} fullWidth variant="filled" InputProps={{ className: 'bg-white/5 text-white' }} />

                            <div className="flex gap-3 mt-2">
                                <Button variant="contained" onClick={handleSave}>Salvar</Button>
                                <Button variant="contained" color="secondary">Restaurar Padrões</Button>
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

export default ConfigPage;
