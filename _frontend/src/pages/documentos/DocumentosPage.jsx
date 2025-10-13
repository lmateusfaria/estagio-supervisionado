import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, List, ListItem, ListItemText, CircularProgress, Snackbar, Alert } from "@mui/material";
import DocumentoForm from "./DocumentoForm";
import { useNavigate } from "react-router-dom";

const DocumentosPage = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
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

  const handleDocumentoSubmit = async (form, resetForm) => {
    setFormLoading(true);
    try {
      await api.post("/api/documentos", form);
      setSnackbar({ open: true, message: "Documento cadastrado com sucesso!", severity: "success" });
      resetForm();
      fetchDocumentos();
    } catch (err) {
      setSnackbar({ open: true, message: "Erro ao cadastrar documento.", severity: "error" });
    } finally {
      setFormLoading(false);
    }
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
            <h1 className="text-2xl md:text-3xl font-bold">Documentos</h1>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100">
            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress color="inherit" />
              </div>
            ) : documentos.length === 0 ? (
              <p>Nenhum documento cadastrado.</p>
            ) : (
              <>
                {/* Cards para mobile */}
                <div className="md:hidden space-y-3">
                  {documentos.map((doc) => (
                    <div key={doc.id} className="bg-white/5 p-4 rounded-lg shadow-inner">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold">{doc.nome || doc.titulo || `Documento ${doc.id}`}</div>
                          <div className="text-xs text-gray-200">{doc.descricao || ''}</div>
                        </div>
                        <div className="text-right text-xs text-gray-300">ID: {doc.id}</div>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Button size="small" variant="outlined" onClick={() => window.open(doc.url || '#', '_blank')} fullWidth>
                          Abrir
                        </Button>
                        <Button size="small" variant="contained" onClick={() => navigate(`/documentos/${doc.id}`)} fullWidth>
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Tabela para desktop */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full table-auto text-left">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">ID</th>
                        <th className="px-4 py-2">Nome</th>
                        <th className="px-4 py-2">Descrição</th>
                        <th className="px-4 py-2">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {documentos.map((doc) => (
                        <tr key={doc.id} className="border-t border-white/10">
                          <td className="px-4 py-3">{doc.id}</td>
                          <td className="px-4 py-3">{doc.nome || doc.titulo || `Documento ${doc.id}`}</td>
                          <td className="px-4 py-3">{doc.descricao || ''}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="small" variant="outlined" onClick={() => window.open(doc.url || '#', '_blank')}>
                                Abrir
                              </Button>
                              <Button size="small" variant="contained" onClick={() => navigate(`/documentos/${doc.id}`)}>
                                Detalhes
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
};

export default DocumentosPage;
