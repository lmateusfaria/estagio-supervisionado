package br.com.systemmanualdigital.domains.dtos.flow;

import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;

public class FluxoDocumentosDTO {

    private Long id;
    private String nome;
    private String ordemServico;
    private Integer versaoDoc;


    public FluxoDocumentosDTO() {
    }

    public FluxoDocumentosDTO(FluxoDocumentos fluxo) {
        this.id = fluxo.getId();
        this.nome = fluxo.getNome();
        this.ordemServico = fluxo.getDescricaoFluxo();
        this.versaoDoc = fluxo.getVersaoDoc();
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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