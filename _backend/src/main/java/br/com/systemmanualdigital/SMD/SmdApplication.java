package br.com.systemmanualdigital.SMD;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = "br.com.systemmanualdigital")
@EntityScan(basePackages = {"br.com.systemmanualdigital.domains","br.com.systemmanualdigital.domains.enums"})
@EnableJpaRepositories(basePackages = "br.com.systemmanualdigital.repositories")
@SpringBootApplication
public class SmdApplication {

	public static void main(String[] args) {
		System.out.println("Hello World");
		SpringApplication.run(SmdApplication.class, args);
	}

}
