package com.ossp.cocktagorize.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String realName;

    @Column(nullable = false)
    private String nickname;

    private Double alcoholCapacity;

    @OneToMany(mappedBy = "user")
    private List<Board> boardList = new ArrayList<Board>();

    @OneToMany(mappedBy = "user")
    private List<UserLikeBoard> likeBoardList = new ArrayList<UserLikeBoard>();

    @OneToMany(mappedBy = "user")
    private List<UserLikeCocktail> likeCocktailList = new ArrayList<UserLikeCocktail>();

    @OneToMany(mappedBy = "user")
    private List<PreferTag> preferTagList = new ArrayList<PreferTag>();
}
