package com.ossp.cocktagorize.config.jwt;

public interface JwtProperties {
    String SECRET = "cocktagorize"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 10;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
