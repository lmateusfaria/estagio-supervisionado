package br.com.systemmanualdigital.resources.flow;

import br.com.systemmanualdigital.domains.dtos.flow.FluxoDocumentosDTO;
import br.com.systemmanualdigital.services.flow.FluxoDocumentosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/fluxos")
public class FluxoDocumentosResource {

    @Autowired
    private FluxoDocumentosService fluxoService;

    @GetMapping
    public ResponseEntity<List<FluxoDocumentosDTO>> findAll() {
        return ResponseEntity.ok().body(fluxoService.findAll());
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<FluxoDocumentosDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(new FluxoDocumentosDTO(fluxoService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody FluxoDocumentosDTO objDto) {
        var obj = fluxoService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<FluxoDocumentosDTO> update(@PathVariable Long id, @RequestBody FluxoDocumentosDTO objDto) {
        var obj = fluxoService.update(id, objDto);
        return ResponseEntity.ok().body(new FluxoDocumentosDTO(obj));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        fluxoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(value = "/{id}/documentos")
    public ResponseEntity<java.util.List<br.com.systemmanualdigital.domains.dtos.doc.DocumentoDTO>> findDocumentosByFluxo(@PathVariable Long id) {
        return ResponseEntity.ok().body(
                fluxoService.findDocumentosByFluxoId(id)
        );
    }
}