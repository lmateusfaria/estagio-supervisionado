import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, List, ListItem, ListItemText, CircularProgress, Snackbar, Alert } from "@mui/material";
import DocumentoForm from "../documentos/DocumentoForm";


const FluxoDocumentos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Estado do formulário de criação
  const [formLoading, setFormLoading] = useState(false);
  const handleDocumentoSubmit = async (form, resetForm) => {
    setFormLoading(true);
    try {
      await api.post("/api/documentos", form);
      setSnackbar({ open: true, message: "Documento cadastrado e vinculado ao fluxo!", severity: "success" });
      resetForm();
      // Atualizar lista
      const { data } = await api.get(`/api/fluxos/${id}/documentos`);
      setDocumentos(data || []);
    } catch (err) {
      setSnackbar({ open: true, message: "Erro ao cadastrar documento.", severity: "error" });
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    const fetchDocumentos = async () => {
      setLoading(true);
      try {
        // Assumed endpoint: GET /api/fluxos/{id}/documentos
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-950 via-emerald-800 to-green-600 bg-[length:200%_200%] animate-gradient-slow">
      <DashboardNavbar />
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 md:p-8 text-white">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100 w-full md:max-w-2xl md:mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">Documentos vinculados</h1>
              <div className="flex gap-2 mb-2">
                <Button variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
                <Button variant="contained" onClick={() => navigate(`/fluxos/${id}/editar`)}>Editar Fluxo</Button>
                <Button variant="contained" color="success" onClick={() => navigate(`/fluxos/${id}/documentos/novo`)}>
                  Cadastrar Documento
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress color="inherit" />
              </div>
            ) : documentos.length === 0 ? (
              <p>Nenhum documento vinculado a este fluxo.</p>
            ) : (
              <List>
                {documentos.map((doc) => (
                  <ListItem key={doc.id} divider>
                    <ListItemText primary={doc.nome || doc.titulo || `Documento ${doc.id}`} secondary={doc.descricao || ''} />
                    <div className="flex gap-2">
                      <Button variant="outlined" size="small" onClick={() => window.open(doc.url || '#', '_blank')}>Abrir</Button>
                      <Button variant="contained" size="small" onClick={() => navigate(`/documentos/${doc.id}`)}>Detalhes</Button>
                    </div>
                  </ListItem>
                ))}
              </List>
            )}
          </div>
          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
          </Snackbar>
        </main>
      </div>
    </div>
  );
}

export default FluxoDocumentos;
