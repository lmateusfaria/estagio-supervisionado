//package br.com.systemmanualdigital;
//
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.test.web.servlet.MockMvc;
//
//@SpringBootTest
//@AutoConfigureMockMvc
//public class AdministradorResourceTests {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Test
//    public void deveRetornarTipoUsuarioNaResposta() throws Exception {
//        mockMvc.perform(get("/api/admin") // Endpoint que lista os administradores
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$[0].tipoUsuario").isNotEmpty()); // Verifique se o tipoUsuario está preenchido
//    }
//}