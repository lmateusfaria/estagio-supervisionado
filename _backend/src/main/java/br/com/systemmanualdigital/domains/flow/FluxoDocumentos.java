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
    private String ordemServico;

    @NotBlank
    @NotNull
    private Integer versao;

    @JsonIgnore
    @OneToMany(mappedBy = "fluxoDocumentos")
    private List<Documento> documentos = new ArrayList<>();

    @ManyToOne//relacao de * para 1
    @JoinColumn(name="idUsuario")
    private Usuario usuario;

}
