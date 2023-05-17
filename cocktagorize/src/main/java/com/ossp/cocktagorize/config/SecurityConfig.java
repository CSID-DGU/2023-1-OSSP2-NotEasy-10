package com.ossp.cocktagorize.config;

import com.ossp.cocktagorize.config.jwt.JwtAccessDeniedHandler;
import com.ossp.cocktagorize.config.jwt.JwtAuthenticationEntryPoint;
import com.ossp.cocktagorize.config.jwt.JwtSecurityConfig;
import com.ossp.cocktagorize.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 우리는 jwt 토큰을 이용해서 인증할 것이기 때문에, 세션을 사용하지 않겠다.

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .formLogin().disable() // 우리는 jwt 토큰을 이용해서 인증할 것이기 때문에, form 태그를 만들어서 로그인 하는 방식을 사용하지 않겠다.
                .httpBasic().disable() // 우리는 jwt 토큰을 이용해서 인증할 것이기 때문에, httpBasic 방식을 사용하지 않겠다.
                .apply(new JwtSecurityConfig(tokenProvider)) // 커스텀 필터 등록

                .and()
                .authorizeHttpRequests()
                .anyRequest().permitAll()
        ;
        return http.build();
    }

//    public class JWTHttpConfigurer extends AbstractHttpConfigurer<JWTHttpConfigurer, HttpSecurity> {
//        @Override
//        public void configure(HttpSecurity http) throws Exception {
//            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
//            http
//                    .addFilter(corsConfig.corsFilter())// @CrossOrigin(인증 X), 시큐리티 필터에 등록 인증(O)
//                    .addFilter(new JwtAuthenticationFilter(authenticationManager)) // AuthenticationManager을 던져줘야 됨.
//                    .addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
//        }
//    }
}
