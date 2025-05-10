package br.com.systemmanualdigital.repositories.user;

import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByNomeEmpresa(String nomeEmpresa);
    Optional<Administrador> findByEmail(String email);
    Optional<Administrador> findByNome(String nome);
//    Optional<Usuario> findByDataCadastro(LocalDate dataCadastro);
}
