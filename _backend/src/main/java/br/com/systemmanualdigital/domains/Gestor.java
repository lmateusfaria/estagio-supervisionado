package br.com.systemmanualdigital.domains;


import br.com.systemmanualdigital.domains.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Entity
@Table(name = "gestores")
//@Getter
//@Setter
public class Gestor extends Usuario {

    @JsonIgnore
    @OneToMany(mappedBy = "gestor") // "gestor" corresponde ao atributo no Colaborador
    private List<Colaborador> colaboradores = new ArrayList<>();

    public Gestor() {
        super();
    }

    public Gestor(Long id, String email, String senha, String nome, String nomeEmpresa, LocalDate dataCadastro, LocalDate dataUltimoLogin, TipoUsuario tipoUsuario) {
        super(id, email, senha, nome, nomeEmpresa, dataCadastro, dataUltimoLogin, tipoUsuario);
    }

    public List<Colaborador> getColaboradores() {
        return colaboradores;
    }

    public void setColaboradores(List<Colaborador> colaboradores) {
        this.colaboradores = colaboradores;
    }
}