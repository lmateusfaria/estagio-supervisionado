package br.com.systemmanualdigital.services.doc;

import br.com.systemmanualdigital.domains.doc.Campo;
import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.dtos.doc.CampoDTO;
import br.com.systemmanualdigital.repositories.doc.CampoRepository;
import br.com.systemmanualdigital.repositories.doc.DocumentoRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CampoService {

    @Autowired
    private CampoRepository campoRepo;
    @Autowired
    private DocumentoRepository documentoRepository;

    public List<CampoDTO> findAll() {
        return campoRepo.findAll().stream()
                .map(CampoDTO::new)
                .collect(Collectors.toList());
    }

    public Campo findById(Long id) {
        Optional<Campo> obj = campoRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Campo não encontrado! ID: " + id));
    }

    public java.util.List<CampoDTO> findByDocumentoId(Long documentoId) {
        return campoRepo.findByDocumentoId(documentoId).stream()
                .map(CampoDTO::new)
                .collect(java.util.stream.Collectors.toList());
    }

    public Campo create(CampoDTO objDto) {
        Documento doc = documentoRepository.getReferenceById(objDto.getDocumentoId());
        Campo campo = new Campo(objDto.getId(), objDto.getNome(), objDto.getConteudo(), objDto.getPosicaoX(),
                objDto.getPosicaoY(), objDto.getPagina(), doc);
        return campoRepo.save(campo);
    }

    public Campo update(Long id, CampoDTO objDto) {
        Campo existingCampo = findById(id);
        existingCampo.setNome(objDto.getNome());
        existingCampo.setConteudo(objDto.getConteudo());
        existingCampo.setPosicaoX(objDto.getPosicaoX());
        existingCampo.setPosicaoY(objDto.getPosicaoY());
        existingCampo.setPagina(objDto.getPagina());
        return campoRepo.save(existingCampo);
    }

    public void delete(Long id) {
        // ensure exists (will throw if not found)
        findById(id);
        campoRepo.deleteById(id);
    }
}