package com.ossp.cocktagorize.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@Configuration
public class SecurityConfig {

    private final AuthenticationFailureHandler customAuthFailureHandler;

    public SecurityConfig(AuthenticationFailureHandler customAuthFailureHandler) {
        this.customAuthFailureHandler = customAuthFailureHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().disable()
                .authorizeHttpRequests( request -> request
                        .anyRequest().permitAll()
                )
                .formLogin(login -> login
                        .loginPage("http://localhost:3000/login")
                        .failureHandler(customAuthFailureHandler)
                        .usernameParameter("id")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("http://localhost:3000/", true)
                )
                .logout()
                    .logoutSuccessUrl("http://localhost:3000/")
        ;
        return http.build();
    }
}
