package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private int id;
    private String username;
    private String email;
    private String nickname;
    private Double alcoholCapacity;

    public UserResponseDto(User user) {
        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        nickname = user.getNickname();
        alcoholCapacity = user.getAlcoholCapacity();
    }
}
