package br.com.systemmanualdigital.services.user;


import br.com.systemmanualdigital.domains.dtos.user.GestorDTO;
import br.com.systemmanualdigital.domains.dtos.user.GestorDTO;
import br.com.systemmanualdigital.domains.dtos.user.UsuarioDTO;
import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.repositories.user.GestorRepository;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GestorService {
    @Autowired
    private GestorRepository gestorRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;


    public List<GestorDTO> findAll(){
        //retorna uma lista de GestorDTO
        return gestorRepo.findAll().stream()
                .map(obj -> new GestorDTO(obj))
                .collect(Collectors.toList());
    }

    public Gestor findbyId(Long id){
        Optional<Gestor> obj = gestorRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id ));
    }

//    public Gestor findbyCpf(String cpf){
//        Optional<Gestor> obj = GestorRepo.findByCpf(cpf);
//        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + cpf ));
//    }

    public Gestor findbyEmail(String email){
        Optional<Gestor> obj = gestorRepo.findByEmail(email);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto(Email) não encontrado! Email: " + email ));
    }

    public Gestor create(GestorDTO objDto){
        objDto.setId(null);
        validaGestor(objDto);
        Gestor obj = new Gestor(objDto);
        return gestorRepo.save(obj);
    }

    public Gestor update(Long id, GestorDTO objDto){
        objDto.setId(id);
        Gestor oldObj = findbyId(id);
        oldObj = new Gestor(objDto);
        return gestorRepo.save(oldObj);
    }

    public void delete(Long id){
        Gestor obj = findbyId(id);
        if (obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Gestor não pode ser deletado! Possui documento vinculado.");
        }
        if (obj.getFluxoDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Gestor não pode ser deletado! Possui fluxo de documentos vinculado.");
        }

        gestorRepo.deleteById(id);
    }

    private void validaGestor(GestorDTO objDto){
        System.out.println("Validando Gestor: "+ objDto.getEmail());
//        Optional<Gestor> obj = GestorRepo.findByEmail(objDto.getEmail());
//        if(obj.isPresent() && obj.get().getId() != objDto.getId()){
//            throw new ObjectNotFoundException("Email já cadastrado... Tente outro!");
//        }
    }
}
