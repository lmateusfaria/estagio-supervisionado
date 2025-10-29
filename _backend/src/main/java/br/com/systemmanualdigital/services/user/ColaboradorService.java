package br.com.systemmanualdigital.services.user;


import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.user.Colaborador;
// ...existing imports...
import br.com.systemmanualdigital.repositories.user.ColaboradorRepository;
// ...existing imports...
import br.com.systemmanualdigital.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ColaboradorService {
    @Autowired
    private ColaboradorRepository colaboradorRepo;
    // GestorRepository no longer required; we resolve gestores via UsuarioRepository
    @Autowired
    private br.com.systemmanualdigital.repositories.user.UsuarioRepository usuarioRepository;

    public List<ColaboradorDTO> findAll(){
        //retorna uma lista de ColaboradorDTO
        return colaboradorRepo.findAll().stream()
                .map(obj -> new ColaboradorDTO(obj))
                .collect(Collectors.toList());
    }

    public Colaborador findbyId(Long id){
        Optional<Colaborador> obj = colaboradorRepo.findById(id);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + id ));
    }

//    public Colaborador findbyCpf(String cpf){
//        Optional<Colaborador> obj = ColaboradorRepo.findByCpf(cpf);
//        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto não encontrado! Id: " + cpf ));
//    }

    public Colaborador findbyEmail(String email){
        Optional<Colaborador> obj = colaboradorRepo.findByEmail(email);
        return obj.orElseThrow(() -> new ObjectNotFoundException("Objeto(Email) não encontrado! Email: " + email ));
    }

    public Colaborador create(ColaboradorDTO objDto){
        objDto.setId(null);
        validaColaborador(objDto);

    var usuarioGestor = usuarioRepository.findById(objDto.getGestorId())
        .orElseThrow(() -> new RuntimeException("Gestor (usuário) não encontrado!"));

    Colaborador obj = new Colaborador(objDto, usuarioGestor);
        return colaboradorRepo.save(obj);
    }

    public Colaborador update(Long id, ColaboradorDTO objDto){
        objDto.setId(id);
        Colaborador oldObj = findbyId(id);
        if(oldObj.getGestor().getId() != objDto.getGestorId()){
            throw new RuntimeException("Gestor não pode alterar esse Colaborador!");
        }
        var usuarioGestor = usuarioRepository.findById(objDto.getGestorId())
                .orElseThrow(() -> new RuntimeException("Gestor (usuário) não encontrado!"));
        oldObj = new Colaborador(objDto, usuarioGestor);
        return colaboradorRepo.save(oldObj);
    }

    public void delete(Long id){
        Colaborador obj = findbyId(id);
        if (!obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Colaborador não pode ser deletado! Possui documento vinculado.");
        }
        if (!obj.getFluxosCriados().isEmpty()){
            throw new DataIntegrityViolationException("Colaborador não pode ser deletado! Possui fluxo de documentos vinculado.");
        }

        colaboradorRepo.deleteById(id);
    }

    private void validaColaborador(ColaboradorDTO objDto){
        System.out.println("Validando Colaborador: "+ objDto.getEmail());
//        Optional<Colaborador> obj = ColaboradorRepo.findByEmail(objDto.getEmail());
//        if(obj.isPresent() && obj.get().getId() != objDto.getId()){
//            throw new ObjectNotFoundException("Email já cadastrado... Tente outro!");
//        }
    }
}
