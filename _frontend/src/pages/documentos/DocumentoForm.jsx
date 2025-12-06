import React, { useState } from "react";
import { Button, TextField, CircularProgress, MenuItem } from "@mui/material";
import { FileText, FileType, Hash, AlignLeft, CheckCircle } from "lucide-react";

// Aceita idFluxo como prop opcional
const DocumentoForm = ({ onSubmit, loading, idFluxo }) => {
  const [form, setForm] = useState({
    nome: "",
    arquivo: "",
    versaoDoc: 1,
    statusDocumento: "NAOPREENCHIDO",
    descricao: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome) return;
    const payload = idFluxo ? { ...form, idFluxo } : form;
    onSubmit(payload, () => setForm({ nome: "", arquivo: "", versaoDoc: 1, statusDocumento: "NAOPREENCHIDO", descricao: "" }));
  };

  const statusOptions = [
    { value: "NAOPREENCHIDO", label: "Não Preenchido" },
    { value: "PREENCHIDO", label: "Preenchido" },
    { value: "APROVADO", label: "Aprovado" },
    { value: "REJEITADO", label: "Rejeitado" }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <FileText className="text-emerald-400" size={24} />
        Novo Documento
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nome */}
        <div>
          <label className="text-white font-medium mb-2 flex items-center gap-2">
            <FileText size={18} className="text-emerald-400" />
            Nome do Documento *
          </label>
          <TextField
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            disabled={loading}
            fullWidth
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
            name="arquivo"
            value={form.arquivo}
            onChange={handleChange}
            required
            disabled={loading}
            fullWidth
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

        {/* Versão e Status em Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Versão */}
          <div>
            <label className="text-white font-medium mb-2 flex items-center gap-2">
              <Hash size={18} className="text-purple-400" />
              Versão *
            </label>
            <TextField
              name="versaoDoc"
              type="number"
              value={form.versaoDoc}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
              InputProps={{
                sx: {
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#a855f7' },
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
              name="statusDocumento"
              value={form.statusDocumento}
              onChange={handleChange}
              required
              disabled={loading}
              fullWidth
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
            <AlignLeft size={18} className="text-cyan-400" />
            Descrição
          </label>
          <TextField
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            disabled={loading}
            fullWidth
            multiline
            rows={3}
            placeholder="Adicione uma descrição detalhada (opcional)"
            InputProps={{
              sx: {
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.5)' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(75, 85, 99, 0.8)' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#06b6d4' },
                backgroundColor: 'rgba(17, 24, 39, 0.5)'
              }
            }}
          />
        </div>

        {/* Botão Submit */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !form.nome || !form.arquivo}
          fullWidth
          className="!bg-emerald-600 hover:!bg-emerald-700 !text-white !py-3 !rounded-xl !font-semibold !mt-6"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <CircularProgress size={20} sx={{ color: 'white' }} />
              <span>Cadastrando...</span>
            </div>
          ) : (
            "Cadastrar Documento"
          )}
        </Button>
      </form>
    </div>
  );
};

export default DocumentoForm;