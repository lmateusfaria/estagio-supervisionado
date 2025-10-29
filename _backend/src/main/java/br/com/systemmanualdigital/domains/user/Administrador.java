package br.com.systemmanualdigital.domains.user;


import br.com.systemmanualdigital.domains.dtos.user.AdministradorDTO;
import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Table(name = "administradores")
@PrimaryKeyJoinColumn(name = "usuario_id")  // Chave estrangeira para a tabela "persons"

public class Administrador extends Usuario {
    // gestor is inherited from Usuario (no duplicate mapping)

    public Administrador() {
        super();
        addTipoUsuario(TipoUsuario.COLABORADOR);
        addTipoUsuario(TipoUsuario.GESTOR);
        addTipoUsuario(TipoUsuario.ADMINISTRADOR);
    }

    public Administrador(Long id, String email, String senha, String nome, String nomeEmpresa) {
        super(id, email, senha, nome, nomeEmpresa);
        addTipoUsuario(TipoUsuario.COLABORADOR);
        addTipoUsuario(TipoUsuario.GESTOR);
        addTipoUsuario(TipoUsuario.ADMINISTRADOR);
    }

    public Administrador(AdministradorDTO obj) {
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
        addTipoUsuario(TipoUsuario.ADMINISTRADOR);
    }

}
