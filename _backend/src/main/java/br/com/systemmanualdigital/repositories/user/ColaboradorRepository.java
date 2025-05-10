package br.com.systemmanualdigital.repositories.user;

import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.domains.user.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
    Optional<Colaborador> findByNomeEmpresa(String nomeEmpresa);
    Optional<Colaborador> findByEmail(String email);
    Optional<Colaborador> findByNome(String nome);
//    Optional<Usuario> findByDataCadastro(LocalDate dataCadastro);
}
