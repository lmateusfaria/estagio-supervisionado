package br.com.systemmanualdigital.domains;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "administradores")
public class Administrador extends Usuario {

    public Administrador() {
        super();
    }
}
