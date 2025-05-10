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
public class AdministradorService {
    @Autowired
    private AdministradorRepository administradorRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;


    public List<AdministradorDTO> findAll(){
        //retorna uma lista de AdministradorDTO
        return administradorRepo.findAll().stream()
                .map(obj -> new AdministradorDTO(obj))
                .collect(Collectors.toList());
    }

    public List<UsuarioDTO> findAllUsers(){
        //retorna uma lista de AdministradorDTO
        return usuarioRepo.findAll().stream()
                .map(obj -> new UsuarioDTO(obj))
                .collect(Collectors.toList());
    }



    public Administrador findbyId(Long id){
        Optional<Administrador> obj = administradorRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id ));
    }

//    public Administrador findbyCpf(String cpf){
//        Optional<Administrador> obj = AdministradorRepo.findByCpf(cpf);
//        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + cpf ));
//    }

    public Administrador findbyEmail(String email){
        Optional<Administrador> obj = administradorRepo.findByEmail(email);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto(Email) não encontrado! Email: " + email ));
    }

    public Administrador create(AdministradorDTO objDto){
        objDto.setId(null);
        validaAdministrador(objDto);
        Administrador obj = new Administrador(objDto);
        return administradorRepo.save(obj);
    }

    public Administrador update(Long id, AdministradorDTO objDto){
        objDto.setId(id);
        Administrador oldObj = findbyId(id);
        oldObj = new Administrador(objDto);
        return administradorRepo.save(oldObj);
    }

    public void delete(Long id){
        Administrador obj = findbyId(id);
        if (obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Administrador não pode ser deletado! Possui documento vinculado.");
        }
        if (obj.getFluxoDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Administrador não pode ser deletado! Possui fluxo de documentos vinculado.");
        }

        administradorRepo.deleteById(id);
    }

    private void validaAdministrador(AdministradorDTO objDto){
        System.out.println("Validando Administrador: "+ objDto.getEmail());
//        Optional<Administrador> obj = AdministradorRepo.findByEmail(objDto.getEmail());
//        if(obj.isPresent() && obj.get().getId() != objDto.getId()){
//            throw new ObjectNotFoundException("Email já cadastrado... Tente outro!");
//        }
    }
}
