package br.com.systemmanualdigital.repositories.user;

import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.domains.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GestorRepository extends JpaRepository<Gestor, Long> {
    Optional<Gestor> findByNomeEmpresa(String nomeEmpresa);
    Optional<Gestor> findByEmail(String email);
    Optional<Gestor> findByNome(String nome);
//    Optional<Usuario> findByDataCadastro(LocalDate dataCadastro);
}
