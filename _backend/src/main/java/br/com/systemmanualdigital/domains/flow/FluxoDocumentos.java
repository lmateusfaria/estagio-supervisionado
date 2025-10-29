package br.com.systemmanualdigital.domains.flow;

import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.user.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fluxoDocumentos")
public class FluxoDocumentos {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_fluxodocumentos")
    private Long id;

    @NotBlank
    @NotNull
    private String nome;

    @NotBlank
    @NotNull
    private String descricaoFluxo;

    @NotNull
    private Integer versaoDoc;

    @JsonIgnore
    @OneToMany(mappedBy = "fluxoDocumentos")
    private List<Documento> documentos = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "criado_por_id")
    private Usuario criadoPor;

    @ManyToOne
    @JoinColumn(name = "atualizado_por_id")
    private Usuario atualizadoPor;

    public FluxoDocumentos() {
    }


    public FluxoDocumentos(Long id, String nome, String descricaoFluxo, Integer versaoDoc, Usuario criadoPor, Usuario atualizadoPor) {
        this.id = id;
        this.nome = nome;
        this.descricaoFluxo = descricaoFluxo;
        this.versaoDoc = versaoDoc;
        this.criadoPor = criadoPor;
        this.atualizadoPor = atualizadoPor;
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

    public String getDescricaoFluxo() {
        return descricaoFluxo;
    }

    public void setDescricaoFluxo(String ordemServico) {
        this.descricaoFluxo = ordemServico;
    }

    public Integer getVersaoDoc() {
        return versaoDoc;
    }

    public void setVersaoDoc(Integer versao) {
        this.versaoDoc = versao;
    }

    public List<Documento> getDocumentos() {
        return documentos;
    }

    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }


    public Usuario getCriadoPor() {
        return criadoPor;
    }

    public void setCriadoPor(Usuario criadoPor) {
        this.criadoPor = criadoPor;
    }

    public Usuario getAtualizadoPor() {
        return atualizadoPor;
    }

    public void setAtualizadoPor(Usuario atualizadoPor) {
        this.atualizadoPor = atualizadoPor;
    }
}
