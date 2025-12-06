import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { 
    Button, CircularProgress, Snackbar, Alert, Dialog, 
    DialogTitle, DialogContent, DialogActions, TextField, Chip 
} from "@mui/material";
import { motion } from "framer-motion";
import { 
    FileText, ArrowLeft, ExternalLink, Edit, Hash, 
    AlignLeft, FileType, MapPin, Tag 
} from "lucide-react";

const DocumentoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [campos, setCampos] = useState([]);
  const [editingCampo, setEditingCampo] = useState(null);
  const [editValues, setEditValues] = useState({ nome: "", conteudo: "", pagina: 1, posicaox: 0, posicaoy: 0 });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchDocumento = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/documentos/${id}`);
        setDocumento(data);
        try {
          const res = await api.get(`/api/documentos/${id}/campos`);
          setCampos(res.data || []);
        } catch (err) {
          console.error("Erro ao carregar campos do documento via endpoint único", err);
          setCampos([]);
        }
      } catch (err) {
        console.error("Erro ao carregar documento", err);
        setSnackbar({ open: true, message: "Erro ao carregar documento.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchDocumento();
  }, [id]);

  const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

  const handleEditChange = (field) => (e) => setEditValues((s) => ({ ...s, [field]: e.target.value }));

  const handleSaveCampo = async () => {
    if (!editingCampo) return;
    try {
      const payload = {
        id: editingCampo.id,
        nome: editValues.nome,
        conteudo: editValues.conteudo,
        posicaoX: editValues.posicaox,
        posicaoY: editValues.posicaoy,
        pagina: Number(editValues.pagina),
        documentoId: editingCampo.documentoId || documento.id,
      };
      const { data } = await api.put(`/api/campos/${editingCampo.id}`, payload);
      setCampos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      setEditingCampo(null);
      setSnackbar({ open: true, message: 'Campo atualizado.', severity: 'success' });
    } catch (err) {
      console.error('Erro ao salvar campo', err);
      setSnackbar({ open: true, message: 'Erro ao salvar campo.', severity: 'error' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <FileText className="text-emerald-400" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Detalhes do Documento</h1>
                <p className="text-gray-400 text-sm mt-1">Informações completas e campos associados</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <CircularProgress sx={{ color: '#10b981' }} />
            </div>
          ) : !documento ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="mx-auto text-gray-600 mb-4" size={64} />
              <p className="text-gray-400 text-lg">Documento não encontrado</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-5xl mx-auto space-y-6"
            >
              {/* Card Principal */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{documento.nome || documento.titulo}</h2>
                    <div className="flex flex-wrap gap-2">
                      <Chip 
                        label={documento.statusDocumento || "N/A"}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          color: '#10b981',
                          fontWeight: 'bold',
                          border: '1px solid rgba(16, 185, 129, 0.3)'
                        }}
                      />
                      <Chip 
                        label={`Versão ${documento.versaoDoc}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(59, 130, 246, 0.1)',
                          color: '#3b82f6',
                          fontWeight: 'bold',
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}
                      />
                    </div>
                  </div>
                  {documento.url && (
                    <Button
                      variant="contained"
                      startIcon={<ExternalLink size={18} />}
                      onClick={() => window.open(documento.url, '_blank')}
                      className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-lg"
                    >
                      Abrir Arquivo
                    </Button>
                  )}
                </div>

                {documento.descricao && (
                  <div className="bg-gray-900/30 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">Descrição</p>
                    <p className="text-white">{documento.descricao}</p>
                  </div>
                )}
              </motion.div>

              {/* Informações do Documento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Hash size={20} className="text-emerald-400" />
                    Identificação
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-sm mb-1">ID</p>
                      <p className="text-white font-medium">{documento.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm mb-1">Versão</p>
                      <p className="text-white font-medium">{documento.versaoDoc}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileType size={20} className="text-blue-400" />
                    Status
                  </h3>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Status do Documento</p>
                    <p className="text-white font-medium">{documento.statusDocumento || 'Não informado'}</p>
                  </div>
                </motion.div>
              </div>

              {/* Campos do Documento */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Tag size={20} className="text-purple-400" />
                  Campos do Documento ({campos.length})
                </h3>
                
                {campos.length === 0 ? (
                  <div className="text-center py-8">
                    <Tag className="mx-auto text-gray-600 mb-3" size={48} />
                    <p className="text-gray-400">Nenhum campo encontrado para este documento</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {campos.map((c) => (
                      <div key={c.id} className="bg-gray-900/30 rounded-xl p-4 border border-gray-700/30">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-white font-semibold mb-1">{c.nome}</h4>
                            <p className="text-gray-400 text-sm">{c.conteudo}</p>
                          </div>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => {
                              setEditingCampo(c);
                              setEditValues({ 
                                nome: c.nome || '', 
                                conteudo: c.conteudo || '', 
                                pagina: c.pagina || 1, 
                                posicaox: c.posicaox || 0, 
                                posicaoy: c.posicaoy || 0 
                              });
                            }}
                            className="!border-gray-600 !text-gray-300 !min-w-0 !p-1.5"
                          >
                            <Edit size={14} />
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <FileText size={12} />
                            Pág. {c.pagina}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            X: {c.posicaox}, Y: {c.posicaoy}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Botão Voltar */}
              <motion.div
                variants={itemVariants}
                className="flex justify-start"
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowLeft size={18} />}
                  onClick={() => navigate(-1)}
                  className="!border-gray-600 !text-gray-300 !rounded-lg hover:!bg-gray-800"
                >
                  Voltar
                </Button>
              </motion.div>
            </motion.div>
          )}

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>

          {/* Dialog Editar Campo */}
          <Dialog 
            open={Boolean(editingCampo)} 
            onClose={() => setEditingCampo(null)}
            PaperProps={{
              sx: {
                backgroundColor: '#1f2937',
                borderRadius: '16px',
                border: '1px solid rgba(75, 85, 99, 0.5)'
              }
            }}
          >
            <DialogTitle sx={{ color: 'white', borderBottom: '1px solid rgba(75, 85, 99, 0.3)' }}>
              Editar Campo
            </DialogTitle>
            <DialogContent className="space-y-4 !pt-6" sx={{ minWidth: '400px' }}>
              <TextField 
                label="Nome" 
                fullWidth 
                value={editValues.nome} 
                onChange={handleEditChange('nome')}
                InputProps={{
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                  }
                }}
                InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
              />
              <TextField 
                label="Conteúdo" 
                fullWidth 
                value={editValues.conteudo} 
                onChange={handleEditChange('conteudo')}
                InputProps={{
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                  }
                }}
                InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
              />
              <TextField 
                label="Página" 
                type="number" 
                fullWidth 
                value={editValues.pagina} 
                onChange={handleEditChange('pagina')}
                InputProps={{
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                  }
                }}
                InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
              />
              <div className="grid grid-cols-2 gap-4">
                <TextField 
                  label="Posição X" 
                  fullWidth 
                  value={editValues.posicaox} 
                  onChange={handleEditChange('posicaox')}
                  InputProps={{
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                    }
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                />
                <TextField 
                  label="Posição Y" 
                  fullWidth 
                  value={editValues.posicaoy} 
                  onChange={handleEditChange('posicaoy')}
                  InputProps={{
                    sx: {
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#10b981' },
                    }
                  }}
                  InputLabelProps={{ sx: { color: 'rgba(156, 163, 175, 1)' } }}
                />
              </div>
            </DialogContent>
            <DialogActions sx={{ borderTop: '1px solid rgba(75, 85, 99, 0.3)', padding: '16px 24px' }}>
              <Button 
                onClick={() => setEditingCampo(null)}
                className="!text-gray-300"
              >
                Cancelar
              </Button>
              <Button 
                variant="contained" 
                onClick={handleSaveCampo}
                className="!bg-emerald-600 hover:!bg-emerald-700"
              >
                Salvar
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default DocumentoDetail;