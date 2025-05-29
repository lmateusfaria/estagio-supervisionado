package br.com.systemmanualdigital.domains.dtos.user;

import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import br.com.systemmanualdigital.domains.user.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class UsuarioDTO {

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

    public UsuarioDTO() {
    }

    public UsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.email = usuario.getEmail();
        this.senha = usuario.getSenha();
        this.nome = usuario.getNome();
        this.nomeEmpresa = usuario.getNomeEmpresa();
        this.dataCadastro = usuario.getDataCadastro();
        this.dataUltimoLogin = usuario.getDataUltimoLogin();

        usuario.getTipoUsuario().forEach(tipo ->
                this.tipoUsuario.add(tipo)
        );

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
        return tipoUsuario == null ? Collections.emptySet() :
                tipoUsuario.stream()
                        .map(TipoUsuario::toEnum)
                        .collect(Collectors.toSet());
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario.add(tipoUsuario.getId());
    }

}
