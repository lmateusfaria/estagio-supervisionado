package br.com.systemmanualdigital.services.flow;

import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import br.com.systemmanualdigital.domains.dtos.flow.FluxoDocumentosDTO;
import br.com.systemmanualdigital.repositories.flow.FluxoDocumentosRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FluxoDocumentosService {

    @Autowired
    private FluxoDocumentosRepository fluxoRepo;

    public List<FluxoDocumentosDTO> findAll() {
        return fluxoRepo.findAll().stream()
                .map(FluxoDocumentosDTO::new)
                .collect(Collectors.toList());
    }

    public FluxoDocumentos findById(Long id) {
        Optional<FluxoDocumentos> obj = fluxoRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Fluxo de Documentos não encontrado! ID: " + id));
    }

    public FluxoDocumentos create(FluxoDocumentosDTO objDto) {
        FluxoDocumentos fluxo = new FluxoDocumentos();
        fluxo.setNome(objDto.getNome());
        fluxo.setDescricaoFluxo(objDto.getOrdemServico());
        fluxo.setVersaoDoc(objDto.getVersaoDoc());
        return fluxoRepo.save(fluxo);
    }

    public FluxoDocumentos update(Long id, FluxoDocumentosDTO objDto) {
        FluxoDocumentos existingFluxo = findById(id);
        existingFluxo.setNome(objDto.getNome());
        existingFluxo.setDescricaoFluxo(objDto.getOrdemServico());
        existingFluxo.setVersaoDoc(objDto.getVersaoDoc());
        return fluxoRepo.save(existingFluxo);
    }

    public void delete(Long id) {
        findById(id);
        fluxoRepo.deleteById(id);
    }
}