package br.com.systemmanualdigital.services.flow;

import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import br.com.systemmanualdigital.domains.dtos.flow.FluxoDocumentosDTO;
import br.com.systemmanualdigital.repositories.flow.FluxoDocumentosRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
public class FluxoDocumentosService {

    @Autowired
    private FluxoDocumentosRepository fluxoRepo;

    @Autowired
    private br.com.systemmanualdigital.services.doc.DocumentoService documentoService;

    @Autowired
    private UsuarioRepository usuarioRepository;

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
        // Associação obrigatória do usuário criador
        if (objDto.getIdUsuarioCriador() == null) {
            throw new ObjectNotFoundException("É obrigatório informar o id do usuário criador!");
        }
        Usuario usuarioCriador = usuarioRepository.findById(objDto.getIdUsuarioCriador())
            .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! ID: " + objDto.getIdUsuarioCriador()));
        fluxo.setCriadoPor(usuarioCriador);
        // Se não vier idUsuarioAtualizador, assume o criador como atualizador inicial
        if (objDto.getIdUsuarioAtualizador() != null) {
            Usuario usuarioAtualizador = usuarioRepository.findById(objDto.getIdUsuarioAtualizador())
                .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! ID: " + objDto.getIdUsuarioAtualizador()));
            fluxo.setAtualizadoPor(usuarioAtualizador);
        } else {
            fluxo.setAtualizadoPor(usuarioCriador);
        }
        return fluxoRepo.save(fluxo);
    }

    public FluxoDocumentos update(Long id, FluxoDocumentosDTO objDto) {
        FluxoDocumentos existingFluxo = findById(id);
        existingFluxo.setNome(objDto.getNome());
        existingFluxo.setDescricaoFluxo(objDto.getOrdemServico());
        existingFluxo.setVersaoDoc(objDto.getVersaoDoc());
        if (objDto.getIdUsuarioAtualizador() == null) {
            throw new ObjectNotFoundException("É obrigatório informar o id do usuário atualizador!");
        }
        Usuario usuarioAtualizador = usuarioRepository.findById(objDto.getIdUsuarioAtualizador())
            .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado! ID: " + objDto.getIdUsuarioAtualizador()));
        existingFluxo.setAtualizadoPor(usuarioAtualizador);
        return fluxoRepo.save(existingFluxo);
    }

    public void delete(Long id) {
        FluxoDocumentos obj = findById(id);
        if (!obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Fluxo de Documentos não pode ser deletado! Possui documento vinculado.");
        }
        fluxoRepo.deleteById(id);
    }

    public java.util.List<br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO> findDocumentosByFluxoId(Long fluxoId) {
        // delega para DocumentoService que já transforma em DTO
        return documentoService.findByFluxoId(fluxoId);
    }
}