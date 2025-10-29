package br.com.systemmanualdigital.config;

import br.com.systemmanualdigital.security.JWTAuthenticationFilter;
import br.com.systemmanualdigital.security.JWTUtils;
import br.com.systemmanualdigital.services.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import java.util.Arrays;

@Configuration
//@EnableMethodSecurity // use se precisar de @PreAuthorize
public class SecurityConfig {

    private final Environment env;
    private final JWTUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(Environment env, JWTUtils jwtUtils, UserDetailsServiceImpl userDetailsService) {
        this.env = env;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {

        MvcRequestMatcher.Builder mvc = new MvcRequestMatcher.Builder(introspector);

        if (Arrays.asList(env.getActiveProfiles()).contains("dev") ||
            Arrays.asList(env.getActiveProfiles()).contains("test")) {
            http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));
        }

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // MVC endpoints (controlados pelo DispatcherServlet)
                        .requestMatchers(mvc.pattern("/auth/**")).permitAll()
                        .requestMatchers(mvc.pattern("/swagger-ui.html")).permitAll()
                        .requestMatchers(mvc.pattern("/swagger-ui/**")).permitAll()
                        .requestMatchers(mvc.pattern("/v3/api-docs/**")).permitAll()
                        .requestMatchers(mvc.pattern("/api-docs/**")).permitAll()

                        // H2 console (AntPath ainda é necessário)
                        .requestMatchers(new AntPathRequestMatcher("/h2-console/**")).permitAll()

                        .anyRequest().authenticated()
                );

        http.addFilterBefore(
                new JWTAuthenticationFilter(jwtUtils, userDetailsService),
                UsernamePasswordAuthenticationFilter.class
        );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // frontend Vite
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setExposedHeaders(Arrays.asList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        AuthenticationManagerBuilder auth = http.getSharedObject(AuthenticationManagerBuilder.class);
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
        return auth.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
