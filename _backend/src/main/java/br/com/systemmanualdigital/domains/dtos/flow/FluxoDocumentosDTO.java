package br.com.systemmanualdigital.domains.dtos.flow;

import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;

public class FluxoDocumentosDTO {

    private Long id;
    private String nome;
    private String ordemServico;
    private Integer versaoDoc;
    private Long idUsuarioCriador;
    private String nomeUsuarioCriador;
    private Long idUsuarioAtualizador;
    private String nomeUsuarioAtualizador;
    
    public FluxoDocumentosDTO() {
    }

    public FluxoDocumentosDTO(FluxoDocumentos fluxo) {
        this.id = fluxo.getId();
        this.nome = fluxo.getNome();
        this.ordemServico = fluxo.getDescricaoFluxo();
        this.versaoDoc = fluxo.getVersaoDoc();
        if (fluxo.getCriadoPor() != null) {
            this.idUsuarioCriador = fluxo.getCriadoPor().getId();
            this.nomeUsuarioCriador = fluxo.getCriadoPor().getNome();
        }
        if (fluxo.getAtualizadoPor() != null) {
            this.idUsuarioAtualizador = fluxo.getAtualizadoPor().getId();
            this.nomeUsuarioAtualizador = fluxo.getAtualizadoPor().getNome();
        }
    }
    public Long getIdUsuarioCriador() {
        return idUsuarioCriador;
    }

    public void setIdUsuarioCriador(Long idUsuarioCriador) {
        this.idUsuarioCriador = idUsuarioCriador;
    }

    public String getNomeUsuarioCriador() {
        return nomeUsuarioCriador;
    }

    public void setNomeUsuarioCriador(String nomeUsuarioCriador) {
        this.nomeUsuarioCriador = nomeUsuarioCriador;
    }

    public Long getIdUsuarioAtualizador() {
        return idUsuarioAtualizador;
    }

    public void setIdUsuarioAtualizador(Long idUsuarioAtualizador) {
        this.idUsuarioAtualizador = idUsuarioAtualizador;
    }

    public String getNomeUsuarioAtualizador() {
        return nomeUsuarioAtualizador;
    }

    public void setNomeUsuarioAtualizador(String nomeUsuarioAtualizador) {
        this.nomeUsuarioAtualizador = nomeUsuarioAtualizador;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // Removido ultimaAtualizacaoPor, agora usamos nomeUsuarioAtualizador

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getOrdemServico() {
        return ordemServico;
    }

    public void setOrdemServico(String ordemServico) {
        this.ordemServico = ordemServico;
    }

    public Integer getVersaoDoc() {
        return versaoDoc;
    }

    public void setVersaoDoc(Integer versaoDoc) {
        this.versaoDoc = versaoDoc;
    }
}