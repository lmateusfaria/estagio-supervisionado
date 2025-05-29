package br.com.systemmanualdigital.domains.user;


import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import br.com.systemmanualdigital.repositories.user.GestorRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "colaboradores")
@PrimaryKeyJoinColumn(name = "usuario_id")  // Chave estrangeira para a tabela "persons"

//@Getter
//@Setter
public class Colaborador extends Usuario {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_gestor", nullable = false) // Associando ao gestor
    private Gestor gestor;

    public Colaborador() {
        super();
        addTipoUsuario(TipoUsuario.COLABORADOR);
    }

    public Colaborador(Long id, String email, String senha, String nome, String nomeEmpresa, Gestor gestor) {
        super(id, email, senha, nome, nomeEmpresa);
        this.gestor = gestor;
        addTipoUsuario(TipoUsuario.COLABORADOR);
    }

    public Colaborador(ColaboradorDTO obj, Gestor gestor) {
        this.id = obj.getId();
        this.email = obj.getEmail();
        this.senha = obj.getSenha();
        this.nome = obj.getNome();
        this.nomeEmpresa = obj.getNomeEmpresa();
        this.dataCadastro = obj.getDataCadastro();
        this.dataUltimoLogin = obj.getDataUltimoLogin();
        this.tipoUsuario = obj.getTipoUsuario().stream()
                        .map(x -> x.getId()).collect(Collectors.toSet());
        addTipoUsuario(TipoUsuario.COLABORADOR);

        this.gestor = gestor;
    }

    public Gestor getGestor() {
        return gestor;
    }

    public void setGestor(Gestor gestor) {
        this.gestor = gestor;
    }
}
