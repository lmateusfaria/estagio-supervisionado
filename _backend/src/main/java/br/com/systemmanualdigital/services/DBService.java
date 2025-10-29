package br.com.systemmanualdigital.services;

import br.com.systemmanualdigital.domains.doc.Campo;
import br.com.systemmanualdigital.domains.doc.Documento;
import br.com.systemmanualdigital.domains.enums.StatusDocumento;
import br.com.systemmanualdigital.domains.flow.FluxoDocumentos;
import br.com.systemmanualdigital.domains.user.Administrador;
import br.com.systemmanualdigital.domains.user.Colaborador;
import br.com.systemmanualdigital.domains.user.Gestor;
import br.com.systemmanualdigital.domains.user.Usuario;
import br.com.systemmanualdigital.repositories.doc.CampoRepository;
import br.com.systemmanualdigital.repositories.doc.DocumentoRepository;
import br.com.systemmanualdigital.repositories.flow.FluxoDocumentosRepository;
import br.com.systemmanualdigital.repositories.user.AdministradorRepository;
import br.com.systemmanualdigital.repositories.user.ColaboradorRepository;
import br.com.systemmanualdigital.repositories.user.GestorRepository;
import br.com.systemmanualdigital.repositories.user.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;

@Service
public class DBService {

    @Autowired
    private UsuarioRepository usuarioRepo;
    @Autowired
    private AdministradorRepository administradorRepo;
    @Autowired
    private GestorRepository gestorRepository;
    @Autowired
    private ColaboradorRepository colaboradorRepository;
    @Autowired
    private FluxoDocumentosRepository fluxoDocumentosRepository;
    @Autowired
    private DocumentoRepository documentoRepository;
    @Autowired
    private CampoRepository campoRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public void initDB() {

        Administrador administrador01 = new Administrador(null, "admin@email.com.br", passwordEncoder.encode("senha1234"), "Nome Administrador", "Nome Empresa");

        Gestor gestor01 = new Gestor(null, "gestor@email.com.br", passwordEncoder.encode("senha1234"), "Nome Gestor", "Nome Empresa");

        Colaborador colaborador01 = new Colaborador(null, "colaborador@email.com.br", passwordEncoder.encode("senha1234"), "Nome Colaborador", "Nome Empresa", gestor01);

        FluxoDocumentos fluxo01 = new FluxoDocumentos(null, "Fluxo Impressao", "Preenchimento de Checklist", 1, gestor01, gestor01);

        Documento documento = new Documento(null,"Checklist Impressao","caminho",1, gestor01, fluxo01);

        Campo campo01 = new Campo(
                null,                     // ID será gerado automaticamente
                "Nome Completo",          // Nome do campo
                "João da Silva",          // Conteúdo do campo
                new BigDecimal("10.5"),   // Posição X
                new BigDecimal("15.2"),   // Posição Y
                1,                        // Página onde o campo está
                documento                      // Documento relacionado (adicionar instância, se necessário)
        );

        Campo campo02 = new Campo(
                null,
                "Data de Nascimento",
                "01/01/1990",             // Exemplo de valor de data
                new BigDecimal("20.0"),
                new BigDecimal("25.5"),
                1,
                documento
        );

        Campo campo03 = new Campo(
                null,
                "Código de Registro",
                "123456789",              // Código arbitrário
                new BigDecimal("5.0"),
                new BigDecimal("8.5"),
                2,                        // Página diferente para mostrar variação
                documento
        );

        administradorRepo.save(administrador01);
        gestorRepository.save(gestor01);
        colaboradorRepository.save(colaborador01);
        fluxoDocumentosRepository.save(fluxo01);
        documentoRepository.save(documento);

        campoRepository.save(campo01);
        campoRepository.save(campo02);
        campoRepository.save(campo03);

        System.out.println("DB Inicializada!");

    }

}
