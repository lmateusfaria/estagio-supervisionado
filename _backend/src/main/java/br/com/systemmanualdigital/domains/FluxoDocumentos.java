package br.com.systemmanualdigital.domains;

import br.com.systemmanualdigital.domains.enums.StatusDocumento;
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
    private String ordemServico;

    @NotBlank
    @NotNull
    private Integer versao;

    @JsonIgnore
    @OneToMany(mappedBy = "fluxoDocumentos")
    private List<Documento> documentos = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "fluxo_documentos_usuarios", // Nome da tabela intermediária
            joinColumns = @JoinColumn(name = "fluxo_documentos_id"), // Chave desta classe
            inverseJoinColumns = @JoinColumn(name = "usuario_id") // Chave da outra classe
    )
    private List<Usuario> usuarios = new ArrayList<>();

}
