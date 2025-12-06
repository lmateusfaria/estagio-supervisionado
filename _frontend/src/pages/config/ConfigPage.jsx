import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import { Button, TextField, Snackbar, Alert, Switch, FormControlLabel, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { 
    Settings, Save, RotateCcw, Bell, Lock, 
    Palette, Globe, Mail, Shield, Eye, Moon, Sun
} from "lucide-react";

const ConfigPage = () => {
    const [form, setForm] = useState({ 
        companyName: 'SMD - Sistema de Manuais Digitais', 
        primaryColor: '#10b981',
        email: 'admin@smd.com',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo'
    });
    
    const [settings, setSettings] = useState({
        notifications: true,
        darkMode: true,
        autoSave: true,
        twoFactor: false,
        emailAlerts: true,
        showActivity: true
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
    
    const handleToggle = (field) => (e) => setSettings((s) => ({ ...s, [field]: e.target.checked }));
    
    const handleSave = () => {
        setSnackbar({ open: true, message: 'Configurações salvas com sucesso!', severity: 'success' });
    };
    
    const handleRestore = () => {
        setForm({ 
            companyName: 'SMD - Sistema de Manuais Digitais', 
            primaryColor: '#10b981',
            email: 'admin@smd.com',
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo'
        });
        setSettings({
            notifications: true,
            darkMode: true,
            autoSave: true,
            twoFactor: false,
            emailAlerts: true,
            showActivity: true
        });
        setSnackbar({ open: true, message: 'Configurações padrão restauradas', severity: 'info' });
    };
    
    const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
                            <div className="p-3 bg-gray-500/10 rounded-xl">
                                <Settings className="text-gray-400" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-white">Configurações</h1>
                                <p className="text-gray-400 text-sm mt-1">Personalize o sistema de acordo com suas preferências</p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Configurações Gerais */}
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.1 }}
                            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <Globe className="text-blue-400" size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Configurações Gerais</h2>
                            </div>

                            <div className="space-y-4">
                                <TextField
                                    label="Nome da Empresa"
                                    value={form.companyName}
                                    onChange={handleChange('companyName')}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                                            backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                                />

                                <TextField
                                    label="E-mail Principal"
                                    value={form.email}
                                    onChange={handleChange('email')}
                                    fullWidth
                                    variant="outlined"
                                    InputProps={{
                                        sx: {
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                                            backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                        }
                                    }}
                                    InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <TextField
                                        label="Idioma"
                                        value={form.language}
                                        onChange={handleChange('language')}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                                                backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                            }
                                        }}
                                        InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                                    />

                                    <TextField
                                        label="Fuso Horário"
                                        value={form.timezone}
                                        onChange={handleChange('timezone')}
                                        fullWidth
                                        variant="outlined"
                                        InputProps={{
                                            sx: {
                                                color: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                                                backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                            }
                                        }}
                                        InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Aparência */}
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.2 }}
                            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-500/10 rounded-lg">
                                    <Palette className="text-purple-400" size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Aparência</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {settings.darkMode ? <Moon size={20} className="text-gray-400" /> : <Sun size={20} className="text-gray-400" />}
                                        <div>
                                            <p className="text-white font-medium">Modo Escuro</p>
                                            <p className="text-sm text-gray-400">Ativa o tema escuro da interface</p>
                                        </div>
                                    </div>
                                    <Switch
                                        checked={settings.darkMode}
                                        onChange={handleToggle('darkMode')}
                                        sx={{
                                            '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                        }}
                                    />
                                </div>

                                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.3)' }} />

                                <div>
                                    <label className="text-white font-medium mb-2 block">Cor Primária</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="color"
                                            value={form.primaryColor}
                                            onChange={handleChange('primaryColor')}
                                            className="w-20 h-12 rounded-lg cursor-pointer border-2 border-gray-600"
                                        />
                                        <TextField
                                            value={form.primaryColor}
                                            onChange={handleChange('primaryColor')}
                                            placeholder="#10b981"
                                            variant="outlined"
                                            size="small"
                                            InputProps={{
                                                sx: {
                                                    color: 'white',
                                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                                                    backgroundColor: 'rgba(17, 24, 39, 0.5)'
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Preferências */}
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.3 }}
                            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-emerald-500/10 rounded-lg">
                                    <Bell className="text-emerald-400" size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Notificações e Preferências</h2>
                            </div>

                            <div className="space-y-4">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.notifications}
                                            onChange={handleToggle('notifications')}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                            }}
                                        />
                                    }
                                    label={
                                        <div>
                                            <p className="text-white font-medium">Notificações Push</p>
                                            <p className="text-sm text-gray-400">Receber notificações em tempo real</p>
                                        </div>
                                    }
                                    className="!m-0 !flex !justify-between !w-full"
                                    labelPlacement="start"
                                />

                                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.3)' }} />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.emailAlerts}
                                            onChange={handleToggle('emailAlerts')}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                            }}
                                        />
                                    }
                                    label={
                                        <div>
                                            <p className="text-white font-medium">Alertas por E-mail</p>
                                            <p className="text-sm text-gray-400">Receber resumo diário por e-mail</p>
                                        </div>
                                    }
                                    className="!m-0 !flex !justify-between !w-full"
                                    labelPlacement="start"
                                />

                                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.3)' }} />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.autoSave}
                                            onChange={handleToggle('autoSave')}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                            }}
                                        />
                                    }
                                    label={
                                        <div>
                                            <p className="text-white font-medium">Salvamento Automático</p>
                                            <p className="text-sm text-gray-400">Salvar alterações automaticamente</p>
                                        </div>
                                    }
                                    className="!m-0 !flex !justify-between !w-full"
                                    labelPlacement="start"
                                />

                                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.3)' }} />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.showActivity}
                                            onChange={handleToggle('showActivity')}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                            }}
                                        />
                                    }
                                    label={
                                        <div>
                                            <p className="text-white font-medium">Mostrar Atividade</p>
                                            <p className="text-sm text-gray-400">Exibir registro de atividades recentes</p>
                                        </div>
                                    }
                                    className="!m-0 !flex !justify-between !w-full"
                                    labelPlacement="start"
                                />
                            </div>
                        </motion.div>

                        {/* Segurança */}
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.4 }}
                            className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-red-500/10 rounded-lg">
                                    <Shield className="text-red-400" size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-white">Segurança</h2>
                            </div>

                            <div className="space-y-4">
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={settings.twoFactor}
                                            onChange={handleToggle('twoFactor')}
                                            sx={{
                                                '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' }
                                            }}
                                        />
                                    }
                                    label={
                                        <div>
                                            <p className="text-white font-medium">Autenticação de Dois Fatores</p>
                                            <p className="text-sm text-gray-400">Adiciona uma camada extra de segurança</p>
                                        </div>
                                    }
                                    className="!m-0 !flex !justify-between !w-full"
                                    labelPlacement="start"
                                />

                                <Divider sx={{ borderColor: 'rgba(75, 85, 99, 0.3)' }} />

                                <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl">
                                    <div>
                                        <p className="text-white font-medium">Alterar Senha</p>
                                        <p className="text-sm text-gray-400">Última alteração há 30 dias</p>
                                    </div>
                                    <Button
                                        variant="outlined"
                                        className="!border-gray-600 !text-gray-300 !rounded-lg hover:!bg-gray-800"
                                        startIcon={<Lock size={16} />}
                                    >
                                        Alterar
                                    </Button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            variants={sectionVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button
                                variant="contained"
                                onClick={handleSave}
                                className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !px-8 !py-3 !rounded-xl !font-semibold !shadow-lg"
                                startIcon={<Save size={20} />}
                            >
                                Salvar Configurações
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleRestore}
                                className="!border-gray-600 !text-gray-300 !px-8 !py-3 !rounded-xl hover:!bg-gray-800"
                                startIcon={<RotateCcw size={20} />}
                            >
                                Restaurar Padrões
                            </Button>
                        </motion.div>
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