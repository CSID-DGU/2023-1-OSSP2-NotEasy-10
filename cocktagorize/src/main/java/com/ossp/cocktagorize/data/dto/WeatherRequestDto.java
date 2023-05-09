package com.ossp.cocktagorize.data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WeatherRequestDto {
    private String city;
    private String gu;
    private String dong;
}
