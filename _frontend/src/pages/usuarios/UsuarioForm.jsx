import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, TextField, MenuItem, Snackbar, Alert } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

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
    // ...existing code...
  }, [authUser, isEdit]);

  const handleChange = (field) => (e) => setForm((s) => ({ ...s, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.email || form.nome.trim() === "" || form.email.trim() === "") {
      setSnackbar({ open: true, message: "Nome e email são obrigatórios.", severity: "warning" });
      return;
    }

    // resolve backend endpoint for the selected user type
    const endpointMap = {
      colaboradores: "/api/colaborador",
      gestores: "/api/gestor",
      administradores: "/api/admin",
    };

    const endpoint = endpointMap[form.tipo] || "/api/colaborador";

    // debug: log token, axios Authorization header and resolved endpoint to help diagnose 403
    try {
      try {
        console.debug("UsuarioForm: submit", {
          endpoint: isEdit ? `${endpoint}/${id}` : endpoint,
          localStorageToken: localStorage.getItem("token"),
          axiosAuth: api?.defaults?.headers?.common?.Authorization,
        });
      } catch (e) {}

      const payloadBase = { nome: form.nome, email: form.email, senha: form.senha, nomeEmpresa: form.nomeEmpresa };

      if (form.tipo === 'colaboradores' && form.gestorId) payloadBase.gestorId = Number(form.gestorId);

      if (isEdit) {
        await api.put(`${endpoint}/${id}`, payloadBase);
        setSnackbar({ open: true, message: "Usuário atualizado.", severity: "success" });
      } else {
        await api.post(endpoint, payloadBase);
        setSnackbar({ open: true, message: "Usuário criado.", severity: "success" });
      }
      navigate("/usuarios");
    } catch (err) {
      console.error("Erro ao salvar usuário", err);
      setSnackbar({ open: true, message: "Erro ao salvar usuário.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => setSnackbar((s) => ({ ...s, open: false }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
      <DashboardNavbar />

      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-8 text-white">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{isEdit ? "Editar Usuário" : "Novo Usuário"}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TextField select label="Tipo de Usuário" fullWidth value={form.tipo} onChange={handleChange("tipo")}>
                <MenuItem value="colaboradores">Colaborador</MenuItem>
                <MenuItem value="gestores">Gestor</MenuItem>
                <MenuItem value="administradores">Administrador</MenuItem>
              </TextField>


              <TextField label="Nome" value={form.nome} onChange={handleChange("nome")} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />
              <TextField label="Email" type="email" value={form.email} onChange={handleChange("email")} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />

              <TextField label="Nome da Empresa" value={form.nomeEmpresa} onChange={handleChange("nomeEmpresa")} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} />

              {form.tipo === 'colaboradores' && (
                <TextField select label="Gestor" value={form.gestorId || ""} onChange={handleChange("gestorId")} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}>
                  <MenuItem value="">Sem Gestor</MenuItem>
                  {gestores.map(g => (
                    <MenuItem key={g.id} value={g.id}>{`${g.nome || g.email} ${g.tipo ? `(${g.tipo})` : ''}`}</MenuItem>
                  ))}
                </TextField>
              )}

              {!isEdit && (
                <TextField label="Senha" type="password" value={form.senha} onChange={handleChange("senha")} fullWidth variant="filled" InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }} autoComplete={isEdit ? "current-password" : "new-password"} />
              )}

              <div className="flex gap-3">
                <Button variant="contained" type="submit" className="flex-1">Salvar</Button>
                <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
              </div>
            </form>
          </div>

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
}
