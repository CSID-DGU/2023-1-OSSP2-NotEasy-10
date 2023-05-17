package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private int id;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private Double alcoholCapacity;
    private String city;
    private String dong;
    private String gu;

    public UserResponseDto(User user) {
        id = user.getId();
        username = user.getUsername();
        password = user.getPassword();
        email = user.getEmail();
        nickname = user.getNickname();
        alcoholCapacity = user.getAlcoholCapacity();
        city = user.getCity();
        dong = user.getDong();
        gu = user.getGu();
    }
}
