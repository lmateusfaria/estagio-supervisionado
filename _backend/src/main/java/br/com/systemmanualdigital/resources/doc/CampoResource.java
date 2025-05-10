package br.com.systemmanualdigital.resources.doc;

import br.com.systemmanualdigital.domains.dtos.doc.CampoDTO;
import br.com.systemmanualdigital.services.doc.CampoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/campos")
public class CampoResource {

    @Autowired
    private CampoService campoService;

    @GetMapping
    public ResponseEntity<List<CampoDTO>> findAll() {
        return ResponseEntity.ok(campoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CampoDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(new CampoDTO(campoService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<Void> create(@Valid @RequestBody CampoDTO objDto) {
        var obj = campoService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<CampoDTO> update(@PathVariable Long id, @Valid @RequestBody CampoDTO objDto) {
        var obj = campoService.update(id, objDto);
        return ResponseEntity.ok(new CampoDTO(obj));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        campoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}