package br.com.systemmanualdigital.resources.doc;

import br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO;
import br.com.systemmanualdigital.services.doc.DocumentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/documentos")
public class DocumentoResource {

    @Autowired
    private DocumentoService documentoService;
    @Autowired
    private br.com.systemmanualdigital.services.doc.CampoService campoService;

    @GetMapping
    public ResponseEntity<List<DocumentoDTO>> findAll() {
        return ResponseEntity.ok(documentoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new DocumentoDTO(documentoService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody DocumentoDTO objDto) {
        var obj = documentoService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentoDTO> update(@PathVariable Long id, @Valid @RequestBody DocumentoDTO objDto) {
        var obj = documentoService.update(id, objDto);
        return ResponseEntity.ok(new DocumentoDTO(obj));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        documentoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/campos")
    public ResponseEntity<java.util.List<br.com.systemmanualdigital.domains.dtos.doc.CampoDTO>> findCamposByDocumento(@PathVariable Long id) {
        return ResponseEntity.ok().body(
                campoService.findByDocumentoId(id)
        );
    }
}