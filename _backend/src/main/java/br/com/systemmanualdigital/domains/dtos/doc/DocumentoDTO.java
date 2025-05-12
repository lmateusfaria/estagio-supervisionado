package br.com.systemmanualdigital.domains.dtos.doc;

import br.com.systemmanualdigital.domains.doc.Campo;
import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.enums.StatusDocumento;

import java.util.List;

public class DocumentoDTO {

    private Long id;
    private String nome;
    private String arquivo;
    private Integer versaoDoc;
    private StatusDocumento statusDocumento;
    private List<Campo> campos;

    public DocumentoDTO() {
    }

    public DocumentoDTO(Documento documento) {
        this.id = documento.getId();
        this.nome = documento.getNome();
        this.arquivo = documento.getArquivo();
        this.versaoDoc = documento.getVersaoDoc();
        this.statusDocumento = documento.getStatusDocumento();
        this.campos = documento.getCampos();
    }

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

    public String getArquivo() {
        return arquivo;
    }

    public void setArquivo(String arquivo) {
        this.arquivo = arquivo;
    }

    public Integer getVersaoDoc() {
        return versaoDoc;
    }

    public void setVersaoDoc(Integer versaoDoc) {
        this.versaoDoc = versaoDoc;
    }

    public StatusDocumento getStatusDocumento() {
        return statusDocumento;
    }

    public void setStatusDocumento(StatusDocumento statusDocumento) {
        this.statusDocumento = statusDocumento;
    }

    public List<Campo> getCampos() {
        return campos;
    }

    public void setCampos(List<Campo> campos) {
        this.campos = campos;
    }
}
