package br.com.systemmanualdigital.domains.user;


import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.dtos.user.UsuarioDTO;
import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Inheritance(strategy = InheritanceType.JOINED) // Estratégia de herança
@Table(name = "usuarios")
//@Getter
//@Setter
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_usuarios")
    protected Long id;

    @NotBlank
    @NotNull
    protected String email;

    @NotBlank
    @NotNull
    protected String senha;

    @NotBlank
    @NotNull
    protected String nome;

    @NotBlank
    @NotNull
    protected String nomeEmpresa;

    @JsonFormat(pattern = "dd/MM/yyyy")
    protected LocalDate dataCadastro = LocalDate.now();

    @JsonFormat(pattern = "dd/MM/yyyy")
    protected LocalDate dataUltimoLogin = LocalDate.now();


    @ElementCollection(fetch = FetchType.LAZY) // ou LAZY, conforme o uso
    @CollectionTable(name = "usuario_tipo", joinColumns = @JoinColumn(name = "usuario_id"))
    @Column(name = "tipo_usuario_id")
    protected Set<Integer> tipoUsuario = new HashSet<>();


//    @Enumerated(EnumType.STRING) // Alterado para STRING para maior legibilidade
//    @Column(name = "tipo_usuario")
//    protected TipoUsuario tipoUsuario;

    @JsonIgnore
    @OneToMany(mappedBy = "usuario") // Relacionamento inverso com FluxoDocumentos
    protected List<FluxoDocumentos> fluxoDocumentos = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    protected List<Documento> documentos = new ArrayList<>();

    public Usuario() {
        addTipoUsuario(TipoUsuario.COLABORADOR);
    }

    public Usuario(Long id, String email, String senha, String nome, String nomeEmpresa) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.nomeEmpresa = nomeEmpresa;
        addTipoUsuario(TipoUsuario.COLABORADOR);
    }

    public Usuario(UsuarioDTO obj) {
        this.id = obj.getId();
        this.email = obj.getEmail();
        this.senha = obj.getSenha();
        this.nome = obj.getNome();
        this.nomeEmpresa = obj.getNomeEmpresa();
        this.dataCadastro = obj.getDataCadastro();
        this.dataUltimoLogin = obj.getDataUltimoLogin();
        this.tipoUsuario = obj.getTipoUsuario().stream()
                .map(TipoUsuario::getId).collect(Collectors.toSet());
        addTipoUsuario(TipoUsuario.COLABORADOR);
    }

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

    public Set<Integer> getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(Set<Integer> tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public void addTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario.add(tipoUsuario.getId());
    }
}