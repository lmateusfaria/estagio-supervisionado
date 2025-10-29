package br.com.systemmanualdigital.repositories.user;

import br.com.systemmanualdigital.domains.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNomeEmpresa(String nomeEmpresa);
    Optional<Usuario> findByEmailIgnoreCase(String email);
    Optional<Usuario> findByEmail(String email);
    Optional<Usuario> findByNome(String nome);
    Optional<Usuario> findByNomeIgnoreCase(String nome);
//    Optional<Usuario> findByDataCadastro(LocalDate dataCadastro);
}
