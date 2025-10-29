package br.com.systemmanualdigital.domains.user;


import br.com.systemmanualdigital.domains.dtos.user.GestorDTO;
import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Entity
@Table(name = "gestores")
@PrimaryKeyJoinColumn(name = "usuario_id")  // Chave estrangeira para a tabela "persons"

//@Getter
//@Setter
public class Gestor extends Usuario {

    @JsonIgnore
    @OneToMany(mappedBy = "gestor") // "gestor" corresponde ao atributo no Colaborador
    private List<Colaborador> colaboradores = new ArrayList<>();

    // gestor moved to base class Usuario

    public Gestor() {
        super();
        addTipoUsuario(TipoUsuario.COLABORADOR);
        addTipoUsuario(TipoUsuario.GESTOR);
    }

    public Gestor(Long id, String email, String senha, String nome, String nomeEmpresa) {
        super(id, email, senha, nome, nomeEmpresa);
        addTipoUsuario(TipoUsuario.COLABORADOR);
        addTipoUsuario(TipoUsuario.GESTOR);
    }

    public Gestor(Long id, String email, String senha, String nome, String nomeEmpresa, Usuario gestor) {
        super(id, email, senha, nome, nomeEmpresa);
        this.setGestor(gestor);
        addTipoUsuario(TipoUsuario.COLABORADOR);
        addTipoUsuario(TipoUsuario.GESTOR);
    }

    public Gestor(GestorDTO obj){
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
        addTipoUsuario(TipoUsuario.GESTOR);
    }

    public Gestor(GestorDTO obj, Usuario gestor) {
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
        addTipoUsuario(TipoUsuario.GESTOR);
        this.setGestor(gestor);
    }

    public List<Colaborador> getColaboradores() {
        return colaboradores;
    }

    public void setColaboradores(List<Colaborador> colaboradores) {
        this.colaboradores = colaboradores;
    }

    // gestor getter/setter inherited from Usuario
}