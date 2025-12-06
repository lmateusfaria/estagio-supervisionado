import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Snackbar, Alert, TextField, InputAdornment, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Plus, RefreshCw, Search, Eye, ExternalLink, Download, Calendar, User } from "lucide-react";

const DocumentosPage = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const navigate = useNavigate();

  const fetchDocumentos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/documentos");
      setDocumentos(data || []);
    } catch (err) {
      setSnackbar({ open: true, message: "Erro ao carregar documentos.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const handleClose = () => setSnackbar((s) => ({ ...s, open: false }));

  // Filtrar documentos baseado na busca
  const filteredDocumentos = documentos.filter((doc) => {
    const searchLower = searchTerm.toLowerCase();
    const nome = doc.nome || doc.titulo || "";
    const descricao = doc.descricao || "";
    return nome.toLowerCase().includes(searchLower) || descricao.toLowerCase().includes(searchLower);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getFileExtension = (url) => {
    if (!url) return 'DOC';
    const ext = url.split('.').pop().toUpperCase();
    return ext.length <= 4 ? ext : 'DOC';
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
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-500/10 rounded-xl">
                  <FileText className="text-emerald-400" size={28} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">Documentos</h1>
                  <p className="text-gray-400 text-sm mt-1">Gerencie todos os documentos do sistema</p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <Button
                  variant="contained"
                  onClick={() => navigate('/documentos/novo')}
                  className="!bg-gradient-to-r !from-emerald-600 !to-emerald-500 !text-white !px-6 !py-3 !rounded-xl !font-semibold hover:!from-emerald-700 hover:!to-emerald-600 !shadow-lg !shadow-emerald-500/20"
                  startIcon={<Plus size={20} />}
                >
                  Novo Documento
                </Button>
                <Button
                  variant="outlined"
                  onClick={fetchDocumentos}
                  disabled={loading}
                  className="!border-gray-600 !text-gray-300 !rounded-xl hover:!bg-gray-800"
                >
                  <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl p-1">
              <TextField
                fullWidth
                placeholder="Buscar por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={20} className="text-gray-400" />
                    </InputAdornment>
                  ),
                  sx: {
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden">
            {loading ? (
              <div className="p-12 text-center">
                <RefreshCw size={48} className="animate-spin text-emerald-400 mx-auto mb-4" />
                <p className="text-gray-400">Carregando documentos...</p>
              </div>
            ) : filteredDocumentos.length === 0 ? (
              <div className="p-12 text-center">
                <FileText size={48} className="text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  {searchTerm ? 'Nenhum documento encontrado para essa busca.' : 'Nenhum documento cadastrado.'}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50 border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Descrição</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tipo</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/50">
                      {filteredDocumentos.map((doc) => (
                        <motion.tr
                          key={doc.id}
                          variants={itemVariants}
                          className="hover:bg-gray-700/30 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-400">#{doc.id}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <FileText size={18} className="text-emerald-400" />
                              </div>
                              <span className="text-white font-medium">{doc.nome || doc.titulo || `Documento ${doc.id}`}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-300 line-clamp-2">{doc.descricao || '-'}</span>
                          </td>
                          <td className="px-6 py-4">
                            <Chip
                              label={getFileExtension(doc.url)}
                              size="small"
                              className="!bg-blue-500/10 !text-blue-400 !border-blue-500/20"
                              variant="outlined"
                            />
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex gap-2 justify-end">
                              <Button
                                size="small"
                                variant="outlined"
                                onClick={() => navigate(`/documentos/${doc.id}`)}
                                className="!border-emerald-500/30 !text-emerald-400 hover:!bg-emerald-500/10 !min-w-0 !px-3"
                              >
                                <Eye size={16} />
                              </Button>
                              {doc.url && (
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => window.open(doc.url, '_blank')}
                                  className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10 !min-w-0 !px-3"
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
                </div>

                {/* Mobile/Tablet Cards */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="lg:hidden p-4 space-y-4"
                >
                  {filteredDocumentos.map((doc) => (
                    <motion.div
                      key={doc.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-4 hover:border-emerald-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                            <FileText className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{doc.nome || doc.titulo || `Documento ${doc.id}`}</h3>
                            <p className="text-xs text-gray-500">ID: #{doc.id}</p>
                          </div>
                        </div>
                        <Chip
                          label={getFileExtension(doc.url)}
                          size="small"
                          className="!bg-blue-500/10 !text-blue-400 !border-blue-500/20"
                          variant="outlined"
                        />
                      </div>

                      {doc.descricao && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-300 line-clamp-2">{doc.descricao}</p>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          fullWidth
                          variant="outlined"
                          onClick={() => navigate(`/documentos/${doc.id}`)}
                          className="!border-emerald-500/30 !text-emerald-400 hover:!bg-emerald-500/10"
                          startIcon={<Eye size={16} />}
                        >
                          Ver Detalhes
                        </Button>
                        {doc.url && (
                          <Button
                            variant="outlined"
                            onClick={() => window.open(doc.url, '_blank')}
                            className="!border-blue-500/30 !text-blue-400 hover:!bg-blue-500/10 !min-w-0 !px-4"
                          >
                            <ExternalLink size={16} />
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
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
};

export default DocumentosPage;
