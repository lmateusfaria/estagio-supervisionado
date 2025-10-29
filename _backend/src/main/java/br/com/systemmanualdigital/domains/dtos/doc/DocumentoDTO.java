package br.com.systemmanualdigital.domains.dtos.doc;

import br.com.systemmanualdigital.domains.doc.Campo;
import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.enums.StatusDocumento;

import java.util.List;
import java.util.stream.Collectors;


public class DocumentoDTO {

    private Long id;
    private String nome;
    private String arquivo;
    private Integer versaoDoc;
    private StatusDocumento statusDocumento;
    private List<Long> campos;
    private Long idCriador;
    private String nomeCriador;
    private Long idFluxo; // novo campo para associação
    public Long getIdFluxo() {
        return idFluxo;
    }

    public void setIdFluxo(Long idFluxo) {
        this.idFluxo = idFluxo;
    }

    public DocumentoDTO() {
    }

    public DocumentoDTO(Documento documento) {
        this.id = documento.getId();
        this.nome = documento.getNome();
        this.arquivo = documento.getArquivo();
        this.versaoDoc = documento.getVersaoDoc();
        this.statusDocumento = documento.getStatusDocumento();
        this.campos = documento.getCampos().stream().map(x -> x.getId()).collect(Collectors.toList());
        this.idCriador = documento.getUsuario().getId();
        this.nomeCriador = documento.getUsuario().getNome();
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

    public List<Long> getCampos() {
        return campos;
    }

    public void setCampos(List<Long> campos) {
        this.campos = campos;
    }

    public Long getIdCriador() {
        return idCriador;
    }

    public void setIdCriador(Long idCriador) {
        this.idCriador = idCriador;
    }

    public String getNomeCriador() {
        return nomeCriador;
    }

    public void setNomeCriador(String nomeCriador) {
        this.nomeCriador = nomeCriador;
    }
}
