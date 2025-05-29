package br.com.systemmanualdigital.resources.user;

import br.com.systemmanualdigital.domains.dtos.user.GestorDTO;
import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.services.user.GestorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api/gestor")
@Tag(name = "Gestor Resource", description = "API para gerenciamento de Gestores")
public class GestorResource {

    @Autowired
    private GestorService gestorService;

    @Operation(summary = "Retorna todos os gestores", description = "Busca todos os gestores cadastrados no sistema.")
    @GetMapping
    public ResponseEntity<List<GestorDTO>> findAll() {
        return ResponseEntity.ok().body(gestorService.findAll());
    }

    @Operation(summary = "Busca um gestor por ID", description = "Retorna as informações específicas de um gestor através do ID.")
    @GetMapping(value = "/{id}")
    public ResponseEntity<GestorDTO> findById(
            @Parameter(description = "ID do gestor a ser buscado", example = "1", required = true)
            @PathVariable Long id) {
        Gestor obj = gestorService.findbyId(id);
        return ResponseEntity.ok().body(new GestorDTO(obj));
    }

    @Operation(summary = "Busca um gestor por e-mail", description = "Retorna as informações específicas de um gestor através do e-mail.")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<GestorDTO> findByEmail(
            @Parameter(description = "E-mail do gestor a ser buscado", example = "exemplo@gmail.com", required = true)
            @PathVariable String email) {
        Gestor obj = gestorService.findbyEmail(email);
        return ResponseEntity.ok().body(new GestorDTO(obj));
    }

    @Operation(summary = "Cadastrar novo gestor", description = "Cadastra um novo gestor no sistema.")
    @PostMapping
    public ResponseEntity<GestorDTO> create(
            @Parameter(description = "Dados do novo gestor", required = true)
            @Valid @RequestBody GestorDTO objDto) {

        Gestor gestor = gestorService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(gestor.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }


    @Operation(summary = "Atualizar gestor por ID", description = "Atualiza as informações de um gestor específico.")
    @PutMapping(value = "/{id}")
    public ResponseEntity<GestorDTO> update(
            @Parameter(description = "ID do gestor a ser atualizado", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novos dados do gestor", required = true)
            @Valid @RequestBody GestorDTO objDto) {
        Gestor gestor = gestorService.update(id, objDto);
        return ResponseEntity.ok().body(new GestorDTO(gestor));
    }

    @Operation(summary = "Excluir gestor por ID", description = "Remove um gestor do sistema através do ID informado.")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID do gestor a ser removido", example = "1", required = true)
            @PathVariable Long id) {
        gestorService.delete(id);
        return ResponseEntity.noContent().build();
    }
}