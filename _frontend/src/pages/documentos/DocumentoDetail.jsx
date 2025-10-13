import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import DashboardNavbar from "../../components/navbar/DashboardNavbar";
import api from "../../api/api";
import { Button, Card, CardContent, Typography, CircularProgress, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

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
        // buscar todos os campos de uma vez via novo endpoint
        try {
          const res = await api.get(`/api/documentos/${id}/campos`);
          setCampos(res.data || []);
        } catch (err) {
          // fallback: se endpoint não existir, manter campos vazios
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
      // atualizar lista localmente
      setCampos((prev) => prev.map((p) => (p.id === data.id ? data : p)));
      setEditingCampo(null);
      setSnackbar({ open: true, message: 'Campo atualizado.', severity: 'success' });
    } catch (err) {
      console.error('Erro ao salvar campo', err);
      setSnackbar({ open: true, message: 'Erro ao salvar campo.', severity: 'error' });
    }
  };

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
              <h1 className="text-2xl font-bold">Detalhes do Documento</h1>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <CircularProgress color="inherit" />
              </div>
            ) : !documento ? (
              <p>Documento não encontrado.</p>
            ) : (
              <>

                <Card className="bg-white/5">
                  <CardContent>
                    <Typography variant="h6" className="font-bold mb-2">{documento.nome || documento.titulo}</Typography>
                    <Typography variant="body2" className="mb-2">ID: {documento.id}</Typography>
                    <Typography variant="body2" className="mb-2">Versão: {documento.versaoDoc}</Typography>
                    <Typography variant="body2" className="mb-2">Status: {documento.statusDocumento}</Typography>
                    <Typography variant="body2" className="mb-2">Descrição: {documento.descricao}</Typography>
                    {documento.url && (
                      <Button variant="contained" onClick={() => window.open(documento.url, '_blank')}>Abrir arquivo</Button>
                    )}
                  </CardContent>
                </Card>
                <div className="flex justify-end mt-6">
                  <Button variant="contained" onClick={() => navigate(-1)}>Voltar</Button>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Campos do documento</h2>
                  {campos.length === 0 ? (
                    <p className="text-sm">Nenhum campo encontrado para este documento.</p>
                  ) : (
                    <div className="space-y-3">
                      {campos.map((c) => (
                        <div key={c.id} className="bg-white/5 p-3 rounded-lg">
                          <div className="text-sm font-semibold">{c.nome}</div>
                          <div className="text-xs text-gray-200">Conteúdo: {c.conteudo}</div>
                          <div className="text-xs text-gray-200">Página: {c.pagina} — PosX: {c.posicaox} PosY: {c.posicaoy}</div>
                          <div className="mt-2 flex gap-2">
                            <Button size="small" variant="outlined" onClick={() => {
                              setEditingCampo(c);
                              setEditValues({ nome: c.nome || '', conteudo: c.conteudo || '', pagina: c.pagina || 1, posicaox: c.posicaox || 0, posicaoy: c.posicaoy || 0 });
                            }}>Editar</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
          </Snackbar>
          <Dialog open={Boolean(editingCampo)} onClose={() => setEditingCampo(null)}>
            <DialogTitle>Editar Campo</DialogTitle>
            <DialogContent className="space-y-3 w-96">
              <TextField label="Nome" fullWidth value={editValues.nome} onChange={handleEditChange('nome')} />
              <TextField label="Conteúdo" fullWidth value={editValues.conteudo} onChange={handleEditChange('conteudo')} />
              <TextField label="Página" type="number" fullWidth value={editValues.pagina} onChange={handleEditChange('pagina')} />
              <TextField label="Posição X" fullWidth value={editValues.posicaox} onChange={handleEditChange('posicaox')} />
              <TextField label="Posição Y" fullWidth value={editValues.posicaoy} onChange={handleEditChange('posicaoy')} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditingCampo(null)}>Cancelar</Button>
              <Button variant="contained" onClick={handleSaveCampo}>Salvar</Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default DocumentoDetail;
