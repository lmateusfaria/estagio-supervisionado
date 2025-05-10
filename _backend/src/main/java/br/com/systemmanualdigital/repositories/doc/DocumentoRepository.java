package br.com.systemmanualdigital.repositories.doc;

import br.com.systemmanualdigital.domains.doc.Documento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentoRepository extends JpaRepository<Documento, Long> {
    // Caso necessário, implementar métodos de busca customizados
}