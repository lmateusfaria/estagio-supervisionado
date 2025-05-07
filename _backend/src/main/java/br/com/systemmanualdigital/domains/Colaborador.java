package br.com.systemmanualdigital.domains;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "colaboradores")
//@Getter
//@Setter
public class Colaborador extends Usuario {

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_gestor", nullable = false) // Associando ao gestor
    private Gestor gestor;

    public Colaborador() {
        super();
    }

    public Gestor getGestor() {
        return gestor;
    }

    public void setGestor(Gestor gestor) {
        this.gestor = gestor;
    }
}
