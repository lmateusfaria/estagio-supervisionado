import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Snackbar, Alert, MenuItem, TextField, Button, CircularProgress } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { motion } from "framer-motion";
import { FileText, Save, X, FileType, Hash, AlignLeft, CheckCircle, GitBranch } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const DocumentoFormPage = () => {
  const { id: fluxoId } = useParams(); // Para quando vier de /fluxos/:id/documentos/novo
  const navigate = useNavigate();
  const { user, authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fluxos, setFluxos] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  
  const [form, setForm] = useState({
    nome: "",
    arquivo: "",
    versaoDoc: 1,
    statusDocumento: "NAOPREENCHIDO",
    descricao: "",
    idFluxo: fluxoId || ""
  });

  // Carregar lista de fluxos
  useEffect(() => {
    const fetchFluxos = async () => {
      try {
        const { data } = await api.get("/api/fluxos");
        setFluxos(data || []);
      } catch (err) {
        console.error("Erro ao carregar fluxos:", err);
      }
    };
    fetchFluxos();
  }, []);

  // Se veio de um fluxo específico, já preenche o idFluxo
  useEffect(() => {
    if (fluxoId) {
      setForm(f => ({ ...f, idFluxo: fluxoId }));
    }
  }, [fluxoId]);

  const handleChange = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.nome || !form.arquivo) {
      setSnackbar({ open: true, message: "Preencha todos os campos obrigatórios.", severity: "warning" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        idFluxo: form.idFluxo || null,
        versaoDoc: parseInt(form.versaoDoc)
      };

      await api.post("/api/documentos", payload);
      
      setSnackbar({ 
        open: true, 
        message: "Documento cadastrado com sucesso!", 
        severity: "success" 
      });
      
      // Aguardar 1.5s antes de navegar
      setTimeout(() => {
        if (fluxoId) {
          navigate(`/fluxos/${fluxoId}/documentos`);
        } else {
          navigate("/documentos");
        }
      }, 1500);
    } catch (err) {
      console.error("Erro ao criar documento:", err);
      setSnackbar({ 
        open: true, 
        message: err.response?.data?.message || "Erro ao cadastrar documento.", 
        severity: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(s => ({ ...s, open: false }));
  };

  const statusOptions = [
    { value: "NAOPREENCHIDO", label: "Não Preenchido" },
    { value: "PREENCHIDO", label: "Preenchido" },
    { value: "APROVADO", label: "Aprovado" },
    { value: "REJEITADO", label: "Rejeitado" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Loading de autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 flex items-center justify-center">
        <div className="text-center">
          <CircularProgress sx={{ color: '#10b981' }} size={48} />
          <p className="text-white mt-4">Carregando usuário...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <FileText className="text-emerald-400" size={28} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Novo Documento
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Cadastre um novo documento no sistema
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl mx-auto"
          >
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <FileText size={18} className="text-emerald-400" />
                    Nome do Documento *
                  </label>
                  <TextField
                    fullWidth
                    value={form.nome}
                    onChange={handleChange('nome')}
                    required
                    disabled={loading}
                    placeholder="Digite o nome do documento"
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

                {/* Arquivo */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <FileType size={18} className="text-blue-400" />
                    Arquivo (nome ou URL) *
                  </label>
                  <TextField
                    fullWidth
                    value={form.arquivo}
                    onChange={handleChange('arquivo')}
                    required
                    disabled={loading}
                    placeholder="documento.pdf ou https://..."
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#3b82f6' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  />
                </div>

                {/* Fluxo (Select) */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <GitBranch size={18} className="text-purple-400" />
                    Fluxo Associado {!fluxoId && "*"}
                  </label>
                  <TextField
                    select
                    fullWidth
                    value={form.idFluxo}
                    onChange={handleChange('idFluxo')}
                    required={!fluxoId}
                    disabled={loading || !!fluxoId} // Desabilita se veio de um fluxo
                    placeholder="Selecione um fluxo"
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a855f7' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Selecione um fluxo</em>
                    </MenuItem>
                    {fluxos.map((fluxo) => (
                      <MenuItem key={fluxo.id} value={fluxo.id}>
                        {fluxo.nome} (v{fluxo.versaoDoc})
                      </MenuItem>
                    ))}
                  </TextField>
                  {fluxoId && (
                    <p className="text-xs text-gray-500 mt-1">
                      Este documento será vinculado automaticamente ao fluxo selecionado
                    </p>
                  )}
                </div>

                {/* Versão e Status em Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Versão */}
                  <div>
                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                      <Hash size={18} className="text-cyan-400" />
                      Versão *
                    </label>
                    <TextField
                      fullWidth
                      type="number"
                      value={form.versaoDoc}
                      onChange={handleChange('versaoDoc')}
                      required
                      disabled={loading}
                      InputProps={{
                        sx: {
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#06b6d4' },
                          backgroundColor: 'rgba(17, 24, 39, 0.5)'
                        },
                        inputProps: { min: 1 }
                      }}
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="text-white font-medium mb-2 flex items-center gap-2">
                      <CheckCircle size={18} className="text-orange-400" />
                      Status *
                    </label>
                    <TextField
                      select
                      fullWidth
                      value={form.statusDocumento}
                      onChange={handleChange('statusDocumento')}
                      required
                      disabled={loading}
                      InputProps={{
                        sx: {
                          color: 'white',
                          '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#fb923c' },
                          backgroundColor: 'rgba(17, 24, 39, 0.5)'
                        }
                      }}
                    >
                      {statusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label className="text-white font-medium mb-2 flex items-center gap-2">
                    <AlignLeft size={18} className="text-yellow-400" />
                    Descrição
                  </label>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={form.descricao}
                    onChange={handleChange('descricao')}
                    disabled={loading}
                    placeholder="Adicione uma descrição detalhada (opcional)"
                    InputProps={{
                      sx: {
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#eab308' },
                        backgroundColor: 'rgba(17, 24, 39, 0.5)'
                      }
                    }}
                  />
                </div>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <Save size={20} />}
                    className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !px-8 !py-3 !rounded-xl !font-semibold flex-1"
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar Documento'}
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
            <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
};

export default DocumentoFormPage;
