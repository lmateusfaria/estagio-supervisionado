package br.com.systemmanualdigital.domains.dtos.user;

import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.domains.user.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class ColaboradorDTO {

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

    private Set<Integer> tipoUsuario = new HashSet<>();

    private Long gestorId; // Adiciona um ID para o Gestor associado
    private String nomeGestor; // Adiciona o nome do Gestor associado

    public ColaboradorDTO() {
    }

    public ColaboradorDTO(Colaborador colaborador) {
        this.id = colaborador.getId();
        this.email = colaborador.getEmail();
        this.senha = colaborador.getSenha();
        this.nome = colaborador.getNome();
        this.nomeEmpresa = colaborador.getNomeEmpresa();
        this.dataCadastro = colaborador.getDataCadastro();
        this.dataUltimoLogin = colaborador.getDataUltimoLogin();

        colaborador.getTipoUsuario().forEach(tipo ->
                this.tipoUsuario.add(tipo)
        );

        this.gestorId = colaborador.getGestor().getId();
        this.nomeGestor = colaborador.getGestor().getNome();

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

    public Long getGestorId() {
        return gestorId;
    }

    public void setGestorId(Long gestorId) {
        this.gestorId = gestorId;
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


    public String getNomeGestor() {
        return nomeGestor;
    }

    public void setNomeGestor(String nomeGestor) {
        this.nomeGestor = nomeGestor;
    }
}
