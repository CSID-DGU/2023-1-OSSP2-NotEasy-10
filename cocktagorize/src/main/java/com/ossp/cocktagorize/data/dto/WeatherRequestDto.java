package com.ossp.cocktagorize.data.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class WeatherRequestDto {
    private String city;
    private String dong;
    private String gu;
}
