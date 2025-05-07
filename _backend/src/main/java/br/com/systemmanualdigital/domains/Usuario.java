package br.com.systemmanualdigital.domains;


import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Estratégia de herança
@Table(name = "usuarios")
//@Getter
//@Setter
public abstract class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuarios")
    private Long id;

    @NotBlank
    @NotNull
    private String email;

    @NotBlank
    @NotNull
    private String senha;

    @NotBlank
    @NotNull
    private String nome;

    @NotBlank
    @NotNull
    private String nomeEmpresa;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataUltimoLogin;

    @Enumerated(EnumType.STRING) // Alterado para STRING para maior legibilidade
    @Column(name = "tipo_usuario")
    private TipoUsuario tipoUsuario;

    @JsonIgnore
    @ManyToMany(mappedBy = "usuarios") // Relacionamento inverso com FluxoDocumentos
    private List<FluxoDocumentos> fluxoDocumentos = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "usuarios_documentos", // Nome da tabela intermediária
            joinColumns = @JoinColumn(name = "usuario_id"), // Chave desta entidade
            inverseJoinColumns = @JoinColumn(name = "documento_id") // Chave da entidade Documento
    )
    private List<Documento> documentos = new ArrayList<>();

    public Usuario() {
    }

    public Usuario(Long id, String email, String senha, String nome, String nomeEmpresa, LocalDate dataCadastro, LocalDate dataUltimoLogin, TipoUsuario tipoUsuario) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.nomeEmpresa = nomeEmpresa;
        this.dataCadastro = dataCadastro;
        this.dataUltimoLogin = dataUltimoLogin;
        this.tipoUsuario = tipoUsuario;
    }

    //    public Usuario(PokemonDTO dto) {
//        this.id = dto.getId();
//        this.nome = dto.getNome();
//        this.tipoPokemon = TipoPokemon.toEnum(dto.getTipoPokemon());
//        this.nivelPokemon = NivelPokemon.toEnum(dto.getNivelPokemon());
//        this.pontosDeVida = dto.getPontosDeVida();
//        this.ataque = dto.getAtaque();
//        this.defesa = dto.getDefesa();
//        this.velocidade = dto.getVelocidade();
//        this.dataCaptura = dto.getDataCaptura();
//        this.cpfPokemon = dto.getCpfPokemon();
//    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDate getDataUltimoLogin() {
        return dataUltimoLogin;
    }

    public void setDataUltimoLogin(LocalDate dataUltimoLogin) {
        this.dataUltimoLogin = dataUltimoLogin;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public List<FluxoDocumentos> getFluxoDocumentos() {
        return fluxoDocumentos;
    }

    public void setFluxoDocumentos(List<FluxoDocumentos> fluxoDocumentos) {
        this.fluxoDocumentos = fluxoDocumentos;
    }

    public List<Documento> getDocumentos() {
        return documentos;
    }

    public void setDocumentos(List<Documento> documentos) {
        this.documentos = documentos;
    }
}