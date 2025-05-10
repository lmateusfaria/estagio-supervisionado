package br.com.systemmanualdigital.services.user;


import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.dtos.user.ColaboradorDTO;
import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.repositories.user.ColaboradorRepository;
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
        Colaborador obj = new Colaborador(objDto);
        return colaboradorRepo.save(obj);
    }

    public Colaborador update(Long id, ColaboradorDTO objDto){
        objDto.setId(id);
        Colaborador oldObj = findbyId(id);
        oldObj = new Colaborador(objDto);
        return colaboradorRepo.save(oldObj);
    }

    public void delete(Long id){
        Colaborador obj = findbyId(id);
        if (obj.getDocumentos().isEmpty()){
            throw new DataIntegrityViolationException("Colaborador não pode ser deletado! Possui documento vinculado.");
        }
        if (obj.getFluxoDocumentos().isEmpty()){
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
