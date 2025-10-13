import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";


// Aceita idFluxo como prop opcional
const DocumentoForm = ({ onSubmit, loading, idFluxo }) => {
  const [form, setForm] = useState({
    nome: "",
    arquivo: "",
    versaoDoc: 1,
    statusDocumento: "NAOPREENCHIDO", // valor default, pode ser alterado conforme enum do backend
    descricao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome) return;
    // Se idFluxo vier como prop, inclui no payload
    const payload = idFluxo ? { ...form, idFluxo } : form;
    onSubmit(payload, () => setForm({ nome: "", descricao: "" }));
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-4 md:p-6 text-gray-100 max-w-2xl mx-auto w-full mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nome do documento"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          variant="filled"
          InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}
        />
        <TextField
          label="Arquivo (nome ou url)"
          name="arquivo"
          value={form.arquivo}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          variant="filled"
          InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}
        />
        <TextField
          label="Versão"
          name="versaoDoc"
          type="number"
          value={form.versaoDoc}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          variant="filled"
          InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}
          inputProps={{ min: 1 }}
        />
        <TextField
          label="Status"
          name="statusDocumento"
          value={form.statusDocumento}
          onChange={handleChange}
          required
          disabled={loading}
          fullWidth
          variant="filled"
          InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          disabled={loading}
          fullWidth
          variant="filled"
          InputProps={{ style: { background: 'rgba(255,255,255,0.9)' } }}
          multiline
          minRows={2}
        />
        <div className="flex gap-3">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || !form.nome || !form.arquivo}
            className="flex-1"
          >
            {loading ? <CircularProgress size={20} /> : "Cadastrar Documento"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentoForm;
