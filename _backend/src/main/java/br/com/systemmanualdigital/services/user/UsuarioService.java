package br.com.systemmanualdigital.services.user;


import br.com.systemmanualdigital.domains.dtos.user.AdministradorDTO;
import br.com.systemmanualdigital.domains.dtos.user.UsuarioDTO;
import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.repositories.user.AdministradorRepository;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepo;

    public List<UsuarioDTO> findAll(){
        //retorna uma lista de usuarioRepoDTO
        return usuarioRepo.findAll().stream()
                .map(UsuarioDTO::new)
                .collect(Collectors.toList());
    }

    public Usuario findbyId(Long id){
        Optional<Usuario> obj = usuarioRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id ));
    }

//    public Administrador findbyCpf(String cpf){
//        Optional<Administrador> obj = AdministradorRepo.findByCpf(cpf);
//        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + cpf ));
//    }

    public Usuario findbyEmail(String email){
        Optional<Usuario> obj = usuarioRepo.findByEmail(email);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto(Email) não encontrado! Email: " + email ));
    }

    public Usuario create(UsuarioDTO objDto){
        objDto.setId(null);
        Usuario obj = new Usuario(objDto);
        return usuarioRepo.save(obj);
    }

    public Usuario update(Long id, UsuarioDTO objDto){
        objDto.setId(id);
        Usuario oldObj = findbyId(id);
        oldObj = new Usuario(objDto);
        return usuarioRepo.save(oldObj);
    }

    public void delete(Long id){
        Usuario obj = findbyId(id);
        if (!obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Usuario não pode ser deletado! Possui documento vinculado.");
        }
        if (!obj.getFluxosCriados().isEmpty()){
            throw new DataIntegrityViolationException("Usuario não pode ser deletado! Possui fluxo de documentos vinculado.");
        }

        usuarioRepo.deleteById(id);
    }

    private void validaAdministrador(AdministradorDTO objDto){
        System.out.println("Validando Administrador: "+ objDto.getEmail());
//        Optional<Administrador> obj = AdministradorRepo.findByEmail(objDto.getEmail());
//        if(obj.isPresent() && obj.get().getId() != objDto.getId()){
//            throw new ObjectNotFoundException("Email já cadastrado... Tente outro!");
//        }
    }
}
