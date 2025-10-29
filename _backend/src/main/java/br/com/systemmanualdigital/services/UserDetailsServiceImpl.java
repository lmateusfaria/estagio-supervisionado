package br.com.systemmanualdigital.services;


import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import br.com.systemmanualdigital.security.UserSS;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRepository repo;

    public UserDetailsServiceImpl(UsuarioRepository repo) {
        this.repo = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String rawLogin) throws UsernameNotFoundException {
        if (rawLogin == null) throw new UsernameNotFoundException("Login vazio");

        String login = rawLogin.trim();

        Optional<Usuario> opt;
        if (login.contains("@")) {
            String email = login.toLowerCase();
            opt = repo.findByEmailIgnoreCase(email);
        }else {
            String nome = login.toLowerCase();
            opt = repo.findByNomeIgnoreCase(nome);
        }

        Usuario user = opt.orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        return new UserSS(user);  // seu UserSS já retorna email como username (ótimo p/ token)
    }
}
