package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.PreferTag;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.type.RoleType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.List;

@Getter
@NoArgsConstructor
public class UserJoinDto {
    private String username;
    private String password;
    private String email;
    private String realName;
    private String nickname;
    private Double alcoholCapacity;
    private String city;
    private String dong;
    private String gu;
    private List<String> preferTagList;

    public User toEntity(String encryptPassword, RoleType role) {

        return User.builder()
                .username(this.getUsername())
                .password(encryptPassword)
                .email(this.getEmail())
                .realName(this.getRealName())
                .nickname(this.getNickname())
                .alcoholCapacity(this.getAlcoholCapacity())
                .city(this.getCity())
                .dong(this.getDong())
                .gu(this.getGu())
                .role(role)
                .build();
    }
}
