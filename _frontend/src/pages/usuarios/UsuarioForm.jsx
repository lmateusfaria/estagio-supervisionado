import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, TextField, MenuItem, Snackbar, Alert, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { UserPlus, Save, X, User, Mail, Building2, Lock, Shield } from "lucide-react";

export default function UsuarioForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ tipo: "colaboradores", nome: "", email: "", senha: "", nomeEmpresa: "", gestorId: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [gestores, setGestores] = useState([]);
  const { user: authUser } = useAuth();

  useEffect(() => {
    if (!isEdit) return;
    // Load user data for editing
    const fetchUser = async () => {
      try {
        const { data } = await api.get(`/api/admin/listarUsuario/${id}`);
        setForm({
          tipo: data.tipo || "colaboradores",
          nome: data.nome || "",
          email: data.email || "",
          senha: "",
          nomeEmpresa: data.nomeEmpresa || "",
          gestorId: data.gestorId || null
        });
      } catch (err) {
        console.error("Erro ao carregar usuário", err);
        setSnackbar({ open: true, message: "Erro ao carregar dados do usuário", severity: "error" });
      }
    };
    fetchUser();
  }, [id, isEdit]);

  useEffect(() => {
    // Load gestores for dropdown
    const fetchGestores = async () => {
      try {
        const { data } = await api.get("/api/admin/listarUsuarios");
        const gestoresList = data.filter(u => 
          u.tipoUsuario?.includes?.("GESTOR") || u.tipoUsuario?.includes?.("gestor")
        );
        setGestores(gestoresList);
      } catch (err) {
        console.error("Erro ao carregar gestores", err);
      }
    };
    fetchGestores();
  }, []);

  const handleChange = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || form.nome.trim() === "" || form.email.trim() === "") {
      setSnackbar({ open: true, message: "Nome e email são obrigatórios.", severity: "warning" });
      return;
    }

    const endpointMap = {
      colaboradores: "/api/colaborador",
      gestores: "/api/gestor",
      administradores: "/api/admin",
    };

    const endpoint = endpointMap[form.tipo] || "/api/colaborador";

    try {
      console.debug("UsuarioForm: submit", {
        endpoint: isEdit ? `${endpoint}/${id}` : endpoint,
        localStorageToken: localStorage.getItem("token"),
        axiosAuth: api?.defaults?.headers?.common?.Authorization,
      });

      const payloadBase = { nome: form.nome, email: form.email, senha: form.senha, nomeEmpresa: form.nomeEmpresa };

      if (form.tipo === 'colaboradores' && form.gestorId) payloadBase.gestorId = Number(form.gestorId);

      setLoading(true);

      if (isEdit) {
        await api.put(`${endpoint}/${id}`, payloadBase);
        setSnackbar({ open: true, message: "Usuário atualizado com sucesso!", severity: "success" });
      } else {
        await api.post(endpoint, payloadBase);
        setSnackbar({ open: true, message: "Usuário criado com sucesso!", severity: "success" });
      }
      
      setTimeout(() => navigate("/usuarios"), 1500);
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
      setSnackbar({ open: true, message: "Erro ao salvar usuário.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                {isEdit ? <User className="text-blue-400" size={28} /> : <UserPlus className="text-blue-400" size={28} />}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {isEdit ? "Editar Usuário" : "Novo Usuário"}
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  {isEdit ? "Atualize as informações do usuário" : "Preencha os dados para criar um novo usuário"}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tipo de Usuário */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <Shield size={18} className="text-blue-400" />
                    Tipo de Usuário
                  </label>
                  <TextField 
                    select 
                    fullWidth 
                    value={form.tipo} 
                    onChange={handleChange("tipo")}
                    disabled={loading}
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  >
                    <MenuItem value="colaboradores">Colaborador</MenuItem>
                    <MenuItem value="gestores">Gestor</MenuItem>
                    <MenuItem value="administradores">Administrador</MenuItem>
                  </TextField>
                </div>

                {/* Nome */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <User size={18} className="text-emerald-400" />
                    Nome Completo
                  </label>
                  <TextField 
                    fullWidth
                    value={form.nome} 
                    onChange={handleChange("nome")}
                    disabled={loading}
                    placeholder="Digite o nome completo"
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <Mail size={18} className="text-purple-400" />
                    E-mail
                  </label>
                  <TextField 
                    fullWidth
                    type="email"
                    value={form.email} 
                    onChange={handleChange("email")}
                    disabled={loading}
                    placeholder="usuario@exemplo.com"
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a855f7' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  />
                </div>

                {/* Nome da Empresa */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <Building2 size={18} className="text-orange-400" />
                    Nome da Empresa
                  </label>
                  <TextField 
                    fullWidth
                    value={form.nomeEmpresa} 
                    onChange={handleChange("nomeEmpresa")}
                    disabled={loading}
                    placeholder="Nome da empresa"
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fb923c' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  />
                </div>

                {/* Gestor (apenas para colaboradores) */}
                {form.tipo === 'colaboradores' && (
                  <div>
                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                      <User size={18} className="text-cyan-400" />
                      Gestor Responsável
                    </label>
                    <TextField 
                      select 
                      fullWidth
                      value={form.gestorId || ""} 
                      onChange={handleChange("gestorId")}
                      disabled={loading}
                      InputProps={{
                        sx: {
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#06b6d4' },
                          backgroundColor: 'rgba(17, 24, 39, 0.5)'
                        }
                      }}
                    >
                      <MenuItem value="">Sem Gestor</MenuItem>
                      {gestores.map(g => (
                        <MenuItem key={g.id} value={g.id}>
                          {`${g.nome || g.email} ${g.tipo ? `(${g.tipo})` : ''}`}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                )}

                {/* Senha (apenas em criação) */}
                {!isEdit && (
                  <div>
                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                      <Lock size={18} className="text-red-400" />
                      Senha
                    </label>
                    <TextField 
                      fullWidth
                      type="password"
                      value={form.senha} 
                      onChange={handleChange("senha")}
                      disabled={loading}
                      placeholder="Digite uma senha segura"
                      autoComplete="new-password"
                      InputProps={{
                        sx: {
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ef4444' },
                          backgroundColor: 'rgba(17, 24, 39, 0.5)'
                        }
                      }}
                    />
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Save size={20} />}
                    className="!bg-blue-600 hover:!bg-blue-700 !text-white !px-8 !py-3 !rounded-xl !font-semibold flex-1"
                  >
                    {loading ? "Salvando..." : "Salvar Usuário"}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={loading}
                    startIcon={<X size={20} />}
                    className="!border-gray-600 !text-gray-300 !px-8 !py-3 !rounded-xl hover:!bg-gray-800"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
}
