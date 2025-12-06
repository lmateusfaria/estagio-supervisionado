import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, CircularProgress, Snackbar, Alert, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Edit, ExternalLink, Eye, FolderOpen, Plus } from "lucide-react";

const FluxoDocumentos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    const fetchDocumentos = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/api/fluxos/${id}/documentos`);
        setDocumentos(data || []);
      } catch (err) {
        console.error("Erro ao carregar documentos do fluxo", err);
        setSnackbar({ open: true, message: "Erro ao carregar documentos.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchDocumentos();
  }, [id]);

  const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

  const getFileExtension = (filename) => {
    if (!filename) return "file";
    const ext = filename.split('.').pop().toLowerCase();
    return ext || "file";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
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
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <FolderOpen className="text-emerald-400" size={28} />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white">Documentos Vinculados</h1>
                <p className="text-gray-400 text-sm mt-1">Gerencie os documentos associados a este fluxo</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  startIcon={<Edit size={18} />}
                  onClick={() => navigate(`/fluxos/${id}/editar`)}
                  className="!border-purple-500 !text-purple-400 hover:!bg-purple-500/10 !rounded-lg"
                >
                  Editar Fluxo
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  onClick={() => navigate(`/fluxos/${id}/documentos/novo`)}
                  className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-lg"
                >
                  Novo Documento
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <CircularProgress sx={{ color: '#10b981' }} />
              </div>
            ) : documentos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-12">
                  <FileText className="mx-auto text-gray-600 mb-4" size={64} />
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum documento vinculado</h3>
                  <p className="text-gray-400 mb-6">Comece adicionando documentos a este fluxo</p>
                  <Button
                    variant="contained"
                    startIcon={<Plus size={18} />}
                    onClick={() => navigate(`/fluxos/${id}/documentos/novo`)}
                    className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !rounded-lg"
                  >
                    Adicionar Documento
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                {/* Lista para Desktop */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="hidden lg:block bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden"
                >
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="text-left p-4 text-gray-400 font-semibold">Nome</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Tipo</th>
                        <th className="text-left p-4 text-gray-400 font-semibold">Descrição</th>
                        <th className="text-right p-4 text-gray-400 font-semibold">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentos.map((doc, index) => (
                        <motion.tr
                          key={doc.id}
                          variants={itemVariants}
                          className="border-t border-gray-700/30 hover:bg-gray-700/20 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <FileText className="text-emerald-400" size={20} />
                              </div>
                              <span className="text-white font-medium">
                                {doc.nome || doc.titulo || `Documento ${doc.id}`}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Chip
                              label={getFileExtension(doc.arquivo).toUpperCase()}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                color: '#3b82f6',
                                fontWeight: 'bold',
                                border: '1px solid rgba(59, 130, 246, 0.3)'
                              }}
                            />
                          </td>
                          <td className="p-4">
                            <span className="text-gray-400 text-sm">
                              {doc.descricao || '-'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate(`/documentos/${doc.id}`)}
                                className="!border-gray-600 !text-gray-300 !min-w-0 !p-2"
                              >
                                <Eye size={16} />
                              </Button>
                              {doc.url && (
                                <Button
                                  variant="outlined"
                                  size="small"
                                  onClick={() => window.open(doc.url, '_blank')}
                                  className="!border-gray-600 !text-gray-300 !min-w-0 !p-2"
                                >
                                  <ExternalLink size={16} />
                                </Button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>

                {/* Cards para Mobile */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:hidden space-y-4"
                >
                  {documentos.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      variants={itemVariants}
                      className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl">
                          <FileText className="text-white" size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold mb-1">
                            {doc.nome || doc.titulo || `Documento ${doc.id}`}
                          </h3>
                          <Chip
                            label={getFileExtension(doc.arquivo).toUpperCase()}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(59, 130, 246, 0.1)',
                              color: '#3b82f6',
                              fontWeight: 'bold',
                              fontSize: '0.7rem'
                            }}
                          />
                        </div>
                      </div>
                      {doc.descricao && (
                        <p className="text-gray-400 text-sm mb-3">{doc.descricao}</p>
                      )}
                      <div className="flex gap-2">
                        <Button
                          variant="outlined"
                          size="small"
                          fullWidth
                          startIcon={<Eye size={16} />}
                          onClick={() => navigate(`/documentos/${doc.id}`)}
                          className="!border-gray-600 !text-gray-300 !rounded-lg"
                        >
                          Detalhes
                        </Button>
                        {doc.url && (
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            startIcon={<ExternalLink size={16} />}
                            onClick={() => window.open(doc.url, '_blank')}
                            className="!border-gray-600 !text-gray-300 !rounded-lg"
                          >
                            Abrir
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}

            {/* Botão Voltar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
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
          </div>

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
}

export default FluxoDocumentos;