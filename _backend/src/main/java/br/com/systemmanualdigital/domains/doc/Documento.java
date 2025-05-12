package br.com.systemmanualdigital.domains.doc;

import br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO;
import br.com.systemmanualdigital.domains.enums.StatusDocumento;
import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import br.com.systemmanualdigital.domains.user.Usuario;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "documentos")
public class Documento {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_documento")
    private Long id;

    @NotBlank
    @NotNull
    private String nome;

    @NotBlank
    @NotNull
    private String arquivo;

    @NotNull
    private Integer versaoDoc;

    @Enumerated(EnumType.ORDINAL)
    @JoinColumn(name = "statusDocumento")
    private StatusDocumento statusDocumento;

    @OneToMany(mappedBy = "documento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Campo> campos;

    @ManyToOne//relacao de * para 1
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

    @ManyToOne//relacao de * para 1
    @JoinColumn(name="idFluxoDocumentos")
    private FluxoDocumentos fluxoDocumentos;

    public Documento() {
    }

    // Construtor completo (caso necessário)
    public Documento(Long id,String nome, String arquivo, Integer versaoDoc, Usuario usuario, FluxoDocumentos fluxoDocumentos) {
        this.id = id;
        this.nome = nome;
        this.arquivo = arquivo;
        this.versaoDoc = versaoDoc;
        this.usuario = usuario;
        this.fluxoDocumentos = fluxoDocumentos;
        this.statusDocumento = StatusDocumento.NAOPREENCHIDO;
    }

    public Documento(DocumentoDTO objDto) {
        this.id = objDto.getId();
        this.nome = objDto.getNome();
        this.arquivo = objDto.getArquivo();
        this.versaoDoc = objDto.getVersaoDoc();
        this.statusDocumento = objDto.getStatusDocumento();
        this.campos = new ArrayList<>();
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public FluxoDocumentos getFluxoDocumentos() {
        return fluxoDocumentos;
    }

    public void setFluxoDocumentos(FluxoDocumentos fluxoDocumentos) {
        this.fluxoDocumentos = fluxoDocumentos;
    }
}
