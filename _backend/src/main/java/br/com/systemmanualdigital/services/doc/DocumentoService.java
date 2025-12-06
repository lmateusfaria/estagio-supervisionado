package br.com.systemmanualdigital.services.doc;

import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO;
import br.com.systemmanualdigital.repositories.doc.DocumentoRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentoService {

    @Autowired
    private DocumentoRepository documentoRepo;

    @Autowired
    private br.com.systemmanualdigital.repositories.flow.FluxoDocumentosRepository fluxoDocumentosRepository;

    @Autowired
    private br.com.systemmanualdigital.repositories.user.UsuarioRepository usuarioRepository;

    public List<DocumentoDTO> findAll() {
        return documentoRepo.findAll().stream()
                .map(DocumentoDTO::new)
                .collect(Collectors.toList());
    }

    public Documento findById(Long id) {
        Optional<Documento> obj = documentoRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Documento não encontrado! ID: " + id));
    }

    public java.util.List<DocumentoDTO> findByFluxoId(Long fluxoId) {
        return documentoRepo.findByFluxoDocumentosId(fluxoId).stream()
                .map(DocumentoDTO::new)
                .collect(java.util.stream.Collectors.toList());
    }

    public Documento create(DocumentoDTO objDto) {
        objDto.setId(null);
        Documento obj = new Documento(objDto);
        
        // Associar fluxo se idFluxo vier preenchido
        if (objDto.getIdFluxo() != null) {
            var fluxo = fluxoDocumentosRepository.findById(objDto.getIdFluxo())
                .orElseThrow(() -> new ObjectNotFoundException("Fluxo não encontrado! ID: " + objDto.getIdFluxo()));
            obj.setFluxoDocumentos(fluxo);
        }
        
        // Buscar usuário logado pelo SecurityContext
        String emailUsuarioLogado = SecurityContextHolder.getContext().getAuthentication().getName();
        var usuario = usuarioRepository.findByEmail(emailUsuarioLogado)
            .orElseThrow(() -> new ObjectNotFoundException("Usuário logado não encontrado: " + emailUsuarioLogado));
        obj.setUsuario(usuario);
        
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