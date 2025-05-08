package br.com.systemmanualdigital.config;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("v1") // Nome do grupo
                .pathsToMatch("/**") // Caminhos das suas APIs para documentar
                .build();
    }

    @Bean
    public io.swagger.v3.oas.models.OpenAPI customOpenAPI() {
        return new io.swagger.v3.oas.models.OpenAPI()
                .info(new Info()
                        .title("API de Sistema Manual Digital")
                        .version("1.0.0")
                        .description("Documentação interativa das APIs do Sistema Manual Digital.")
                        .contact(new Contact()
                                .name("Devs: [Luis Mateus] [Matheus Queiroz]")
                                .email("devs@smd.com")));
    }
}