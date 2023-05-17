package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.type.RoleType;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
@Builder
@AllArgsConstructor
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
    private String nickname;

    @Column(nullable = false)
    private Double alcoholCapacity;

    @Column(nullable = false)
    private String city;

    @Column
    private String dong;

    @Column
    private String gu;

    @Enumerated(EnumType.STRING)
    private RoleType role;

    @OneToMany(mappedBy = "user")
    private List<Board> boardList = new ArrayList<Board>();

    @OneToMany(mappedBy = "user")
    private List<BoardReply> boardReplyList = new ArrayList<BoardReply>();

    @OneToMany(mappedBy = "user")
    private List<CocktailReply> cocktailReplyList = new ArrayList<CocktailReply>();

    @OneToMany(mappedBy = "user")
    private List<UserLikeBoard> likeBoardList = new ArrayList<UserLikeBoard>();

    @OneToMany(mappedBy = "user")
    private List<UserLikeCocktail> likeCocktailList = new ArrayList<UserLikeCocktail>();

    @OneToMany(mappedBy = "user")
    private List<PreferTag> preferTagList = new ArrayList<PreferTag>();
}