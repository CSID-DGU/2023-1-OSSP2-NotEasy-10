package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class UserResponseDto {
    private int id;
    private String username;
    private String email;
    private String nickname;
    private Double alcoholCapacity;
    private String city;
    private String dong;
    private String gu;
    private List<TagDto> preferTagList;

    public UserResponseDto(User user) {
        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        nickname = user.getNickname();
        alcoholCapacity = user.getAlcoholCapacity();
        city = user.getCity();
        dong = user.getDong();
        gu = user.getGu();
        preferTagList = user.getPreferTagList().stream()
                .map(preferTag -> new TagDto(preferTag.getTag()))
                .collect(Collectors.toList());
    }
}
