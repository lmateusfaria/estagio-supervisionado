package br.com.systemmanualdigital.resources.user;

import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.services.user.ColaboradorService;
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
@RequestMapping(value = "/api/colaborador")
@Tag(name = "Colaborador Resource", description = "API para gerenciamento de Colaboradores")
public class ColaboradorResource {

    @Autowired
    private ColaboradorService colaboradorService;

    @Operation(summary = "Retorna todos os colaboradores", description = "Busca todos os colaboradores cadastrados no sistema.")
    @GetMapping
    public ResponseEntity<List<ColaboradorDTO>> findAll() {
        return ResponseEntity.ok().body(colaboradorService.findAll());
    }

    @Operation(summary = "Busca um colaborador por ID", description = "Retorna as informações específicas de um colaborador através do ID.")
    @GetMapping(value = "/{id}")
    public ResponseEntity<ColaboradorDTO> findById(
            @Parameter(description = "ID do colaborador a ser buscado", example = "1", required = true)
            @PathVariable Long id) {
        Colaborador obj = colaboradorService.findbyId(id);
        return ResponseEntity.ok().body(new ColaboradorDTO(obj));
    }

    @Operation(summary = "Busca um colaborador por e-mail", description = "Retorna as informações específicas de um colaborador através do e-mail.")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<ColaboradorDTO> findByEmail(
            @Parameter(description = "E-mail do colaborador a ser buscado", example = "exemplo@gmail.com", required = true)
            @PathVariable String email) {
        Colaborador obj = colaboradorService.findbyEmail(email);
        return ResponseEntity.ok().body(new ColaboradorDTO(obj));
    }

    @Operation(summary = "Cadastrar novo colaborador", description = "Cadastra um novo colaborador no sistema.")
    @PostMapping
    public ResponseEntity<ColaboradorDTO> create(
            @Parameter(description = "Dados do novo colaborador", required = true)
            @Valid @RequestBody ColaboradorDTO objDto) {

        Colaborador colaborador = colaboradorService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(colaborador.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @Operation(summary = "Atualizar colaborador por ID", description = "Atualiza as informações de um colaborador específico.")
    @PutMapping(value = "/{id}")
    public ResponseEntity<ColaboradorDTO> update(
            @Parameter(description = "ID do colaborador a ser atualizado", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novos dados do colaborador", required = true)
            @Valid @RequestBody ColaboradorDTO objDto) {
        Colaborador colaborador = colaboradorService.update(id, objDto);
        return ResponseEntity.ok().body(new ColaboradorDTO(colaborador));
    }

    @Operation(summary = "Excluir colaborador por ID", description = "Remove um colaborador do sistema através do ID informado.")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID do colaborador a ser removido", example = "1", required = true)
            @PathVariable Long id) {
        colaboradorService.delete(id);
        return ResponseEntity.noContent().build();
    }

}