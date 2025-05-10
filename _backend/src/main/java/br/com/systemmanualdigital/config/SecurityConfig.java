//package br.com.systemmanualdigital.config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .authorizeHttpRequests(authorize -> authorize
//                        .requestMatchers(
//                                "/v3/api-docs/**",       // Documentação OpenAPI (JSON)
//                                "/swagger-ui/**",        // Recursos do Swagger UI
//                                "/swagger-ui.html"       // Página principal do Swagger UI
//                        ).permitAll()              // Libera os endpoints do Swagger
//                        .anyRequest().authenticated() // Exige autenticação para os demais endpoints
//                )
//                .csrf(csrf -> csrf.disable())  // Desabilita CSRF para simplificar (opcional)
//                ;                  // Ativa o formulário de login padrão
//        return http.build();
//    }
//}
