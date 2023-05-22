package com.ossp.cocktagorize.data.dto;

public class TTSRequestDto {

    private String content;

    public TTSRequestDto() {
        // 기본 생성자
    }

    public TTSRequestDto(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
