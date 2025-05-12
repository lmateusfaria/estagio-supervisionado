package br.com.systemmanualdigital.repositories.flow;

import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FluxoDocumentosRepository extends JpaRepository<FluxoDocumentos, Long> {
    // Adicionar métodos customizados, se necessário
}