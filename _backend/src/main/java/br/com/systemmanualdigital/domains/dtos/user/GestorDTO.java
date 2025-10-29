package br.com.systemmanualdigital.domains.dtos.user;

import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.domains.user.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class GestorDTO {

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
    private LocalDate dataCadastro = LocalDate.now();

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataUltimoLogin = LocalDate.now();

    private final Set<Integer> tipoUsuario = new HashSet<>();
    private Long gestorId;
    private String nomeGestor;

    public GestorDTO() {
    }

    public GestorDTO(Gestor gestor) {
        this.id = gestor.getId();
        this.email = gestor.getEmail();
        this.senha = gestor.getSenha();
        this.nome = gestor.getNome();
        this.nomeEmpresa = gestor.getNomeEmpresa();
        if (gestor.getGestor() != null) {
            this.gestorId = gestor.getGestor().getId();
            this.nomeGestor = gestor.getGestor().getNome();
        }
        gestor.getTipoUsuario().forEach(tipo ->
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
        return tipoUsuario.stream()
                .map(TipoUsuario::toEnum)
                .collect(Collectors.toSet());
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario.add(tipoUsuario.getId());
    }

    public Long getGestorId() {
        return gestorId;
    }

    public void setGestorId(Long gestorId) {
        this.gestorId = gestorId;
    }

    public String getNomeGestor() {
        return nomeGestor;
    }

    public void setNomeGestor(String nomeGestor) {
        this.nomeGestor = nomeGestor;
    }

}
