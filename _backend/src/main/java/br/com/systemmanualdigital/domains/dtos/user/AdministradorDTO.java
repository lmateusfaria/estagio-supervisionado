package br.com.systemmanualdigital.domains.dtos.user;

import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class AdministradorDTO {

    private Long id;

    @NotNull(message = "O campo email não pode ser nulo!")
    @NotBlank(message = "O campo email não pode estar vazio!")
    private String email;

    @NotNull(message = "O campo senha não pode ser nulo!")
    @NotBlank(message = "O campo senha não pode estar vazio!")
    private String senha;

    @NotNull(message = "O campo nome não pode ser nulo!")
    @NotBlank(message = "O campo nome não pode estar vazio!")
    private String nome;

    @NotNull(message = "O campo nome da empresa não pode ser nulo!")
    @NotBlank(message = "O campo nome da empresa não pode estar vazio!")
    private String nomeEmpresa;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCadastro;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataUltimoLogin;

    private Set<Integer> tipoUsuario = new HashSet<>();

    public AdministradorDTO() {
    }

    public AdministradorDTO(Administrador administrador) {
        this.id = administrador.getId();
        this.email = administrador.getEmail();
        this.senha = administrador.getSenha();
        this.nome = administrador.getNome();
        this.nomeEmpresa = administrador.getNomeEmpresa();
        this.dataCadastro = administrador.getDataCadastro();
        this.dataUltimoLogin = administrador.getDataUltimoLogin();
        this.tipoUsuario.stream().map(TipoUsuario::toEnum).collect(Collectors.toSet());
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

    public Set<TipoUsuario> getTipoUsuario() {
        if (tipoUsuario == null) {
            return Collections.emptySet();
        }
        return tipoUsuario.stream()
                .map(TipoUsuario::toEnum)
                .collect(Collectors.toSet());
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario.add(tipoUsuario.getId());
    }

}
