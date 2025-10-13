package br.com.systemmanualdigital.resources;

import br.com.systemmanualdigital.domains.dtos.CredenciaisDTO;
import br.com.systemmanualdigital.domains.dtos.TokenDTO;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import br.com.systemmanualdigital.security.JWTUtils;
import br.com.systemmanualdigital.security.UserSS;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtils jwtUtils;
    private final UsuarioRepository usuarioRepository;

    public AuthController(AuthenticationManager authenticationManager, JWTUtils jwtUtils, UsuarioRepository usuarioRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody CredenciaisDTO credenciais) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            credenciais.getLogin(),  // nome OU email
                            credenciais.getPassword()
                    )
            );

            // PEGA O "username" do UserDetails (no seu UserSS é o e-mail)
            String subject = authentication.getName(); // equivale a ((UserDetails) authentication.getPrincipal()).getUsername()

            String token = jwtUtils.generateToken(subject);
            return ResponseEntity.ok(new TokenDTO(token));

        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não autenticado");
        }

        Object principal = auth.getPrincipal();

        if (principal instanceof UserSS userSS) {
            // Buscar o usuário completo pelo e-mail (username)
            var usuarioOpt = usuarioRepository.findByEmailIgnoreCase(userSS.getUsername());
            if (usuarioOpt.isPresent()) {
                var usuario = usuarioOpt.get();
                return ResponseEntity.ok(Map.of(
                        "id", usuario.getId(),
                        "login", usuario.getEmail(),
                        "nome", usuario.getNome(),
                        "roles", userSS.getAuthorities()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado no banco");
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário inválido");
    }



}
