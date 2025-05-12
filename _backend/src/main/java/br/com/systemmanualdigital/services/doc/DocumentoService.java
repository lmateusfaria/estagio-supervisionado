package br.com.systemmanualdigital.services.doc;

import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO;
import br.com.systemmanualdigital.repositories.doc.DocumentoRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepo;

    public List<DocumentoDTO> findAll() {
        return documentoRepo.findAll().stream()
                .map(DocumentoDTO::new)
                .collect(Collectors.toList());
    }

    public Documento findById(Long id) {
        Optional<Documento> obj = documentoRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Documento não encontrado! ID: " + id));
    }

    public Documento create(DocumentoDTO objDto) {
        objDto.setId(null);
//        validaAdministrador(objDto);
        Documento obj = new Documento(objDto);

        return documentoRepo.save(obj);
    }

    public Documento update(Long id, DocumentoDTO objDto) {
        Documento existingDocumento = findById(id);
        existingDocumento.setNome(objDto.getNome());
        existingDocumento.setArquivo(objDto.getArquivo());
        existingDocumento.setVersaoDoc(objDto.getVersaoDoc());
        existingDocumento.setStatusDocumento(objDto.getStatusDocumento());
        return documentoRepo.save(existingDocumento);
    }

    public void delete(Long id) {
        Documento obj = findById(id);
        if (!obj.getCampos().isEmpty()) {
            throw new DataIntegrityViolationException("Documento não pode ser deletado! Possui campos vinculados.");
        }
        documentoRepo.deleteById(id);
    }
}