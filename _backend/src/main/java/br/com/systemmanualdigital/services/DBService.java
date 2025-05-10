package br.com.systemmanualdigital.services;

import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.repositories.user.AdministradorRepository;
import br.com.systemmanualdigital.repositories.user.ColaboradorRepository;
import br.com.systemmanualdigital.repositories.user.GestorRepository;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DBService {

    @Autowired
    private UsuarioRepository usuarioRepo;
    @Autowired
    private AdministradorRepository administradorRepo;
    @Autowired
    private GestorRepository gestorRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public void initDB() {

        Administrador administrador01 = new Administrador(null, "admin@email.com.br", "senha1234", "Nome Administrador", "Nome Empresa");

        Gestor gestor01 = new Gestor(null, "gestor@email.com.br", "senha1234", "Nome Gestor", "Nome Empresa");

        Colaborador colaborador01 = new Colaborador(null, "colaborador@email.com.br", "senha1234", "Nome Colaborador", "Nome Empresa", gestor01);

        administradorRepo.save(administrador01);
        gestorRepository.save(gestor01);
        colaboradorRepository.save(colaborador01);

        System.out.println("DB Inicializada!");

    }

}
