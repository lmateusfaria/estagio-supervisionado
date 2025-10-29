package br.com.systemmanualdigital.resources.user;

import br.com.systemmanualdigital.domains.dtos.user.AdministradorDTO;
import br.com.systemmanualdigital.domains.dtos.user.UsuarioDTO;
import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.services.user.AdministradorService;
import br.com.systemmanualdigital.services.user.UsuarioService;
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
@RequestMapping(value = "/api/admin")
@Tag(name = "Administrador Resource", description = "API para gerenciamento de Administradores") // Agrupamento no Swagger
public class AdministradorResource {

    @Autowired
    private AdministradorService adminService;

    @Autowired
    private UsuarioService usuarioService;


    @Operation(summary = "Retorna todos os administradores", description = "Busca todos os administradores cadastrados no sistema.")
    @GetMapping
    public ResponseEntity<List<AdministradorDTO>> findAll() {
        return ResponseEntity.ok().body(adminService.findAll());
    }

    @Operation(summary = "Retorna todos os usuários", description = "Busca todos os usuários cadastrados no sistema.")
    @GetMapping(value = "/listarUsuarios")
    public ResponseEntity<List<UsuarioDTO>> findAllUsers() {
        return ResponseEntity.ok().body(usuarioService.findAll());
    }

    @Operation(summary = "Busca um usuario por ID", description = "Retorna as informações específicas de um usuario através do ID.")
    @GetMapping(value = "/listarUsuario/{id}")
    public ResponseEntity<UsuarioDTO> findByIdUser(
            @Parameter(description = "ID do usuario a ser buscado", example = "1", required = true)
            @PathVariable Long id) {
        Usuario obj = this.usuarioService.findbyId(id);
        return ResponseEntity.ok().body(new UsuarioDTO(obj));
    }

    @DeleteMapping(value = "/excluirUsuario/{id}")
    public ResponseEntity<UsuarioDTO> excluirUsuario(
            @Parameter(description = "ID do usuario a ser removido", example = "1", required = true)
            @PathVariable Long id
    ){
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Busca um administrador por ID", description = "Retorna as informações específicas de um administrador através do ID.")
    @GetMapping(value = "/{id}")
    public ResponseEntity<AdministradorDTO> findById(
            @Parameter(description = "ID do administrador a ser buscado", example = "1", required = true)
            @PathVariable Long id) {
        Administrador obj = this.adminService.findbyId(id);
        return ResponseEntity.ok().body(new AdministradorDTO(obj));
    }

    @Operation(summary = "Busca um administrador por e-mail", description = "Retorna as informações específicas de um administrador através do e-mail.")
    @GetMapping(value = "/email/{email}")
    public ResponseEntity<AdministradorDTO> findByEmail(
            @Parameter(description = "E-mail do administrador a ser buscado", example = "exemplo@gmail.com", required = true)
            @PathVariable String email) {
        Administrador obj = this.adminService.findbyEmail(email);
        return ResponseEntity.ok().body(new AdministradorDTO(obj));
    }

    @Operation(summary = "Cadastrar novo administrador", description = "Cadastra um novo administrador no sistema.")
    @PostMapping
    public ResponseEntity<AdministradorDTO> create(
            @Parameter(description = "Dados do novo administrador", required = true)
            @Valid @RequestBody AdministradorDTO objDto) {

        Administrador administrador = adminService.create(objDto);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(administrador.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @Operation(summary = "Atualizar administrador por ID", description = "Atualiza as informações de um administrador específico.")
    @PutMapping(value = "/{id}")
    public ResponseEntity<AdministradorDTO> update(
            @Parameter(description = "ID do administrador a ser atualizado", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novos dados do administrador", required = true)
            @Valid @RequestBody AdministradorDTO objDto) {
        Administrador administrador = adminService.update(id, objDto);
        return ResponseEntity.ok().body(new AdministradorDTO(administrador));
    }

    @Operation(summary = "Excluir administrador por ID", description = "Remove um administrador do sistema através do ID informado.")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<AdministradorDTO> delete(
            @Parameter(description = "ID do administrador a ser removido", example = "1", required = true)
            @PathVariable Long id) {
        adminService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
