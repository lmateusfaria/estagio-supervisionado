package br.com.systemmanualdigital.domains.doc;

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

    @NotBlank
    @NotNull
    private Integer versao;

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
    public Documento(String nome, String arquivo, Integer versao, StatusDocumento statusDocumento, List<Campo> campos) {
        this.nome = nome;
        this.arquivo = arquivo;
        this.versao = versao;
        this.statusDocumento = statusDocumento;
        this.campos = campos;
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

    public Integer getVersao() {
        return versao;
    }

    public void setVersao(Integer versao) {
        this.versao = versao;
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
