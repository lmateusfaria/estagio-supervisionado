package br.com.systemmanualdigital.repositories.doc;

import br.com.systemmanualdigital.domains.doc.Campo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampoRepository extends JpaRepository<Campo, Long> {
    // Caso necessário, implementar métodos de busca customizados
    java.util.List<Campo> findByDocumentoId(Long documentoId);
}