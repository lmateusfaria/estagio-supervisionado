package br.com.systemmanualdigital.domains;

import br.com.systemmanualdigital.domains.enums.StatusDocumento;
import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    // Relacionamento muitos para muitos com usuários
    @ManyToMany(mappedBy = "documentos") // Referência para o lado "usuario"
    private List<Usuario> usuarios = new ArrayList<>();

    @ManyToOne
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


}
