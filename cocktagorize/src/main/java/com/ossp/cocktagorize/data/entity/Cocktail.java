package com.ossp.cocktagorize.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cocktail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_id")
    private int id;

    @Column(nullable = false)
    private String name;

    private String glassType;

    @Lob
    @Column(nullable = false)
    private String recipe;

    @Column(nullable = false)
    private int alcoholDegree;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @OneToMany(mappedBy = "cocktail")
    private List<CocktailReply> cocktailReplyList = new ArrayList<CocktailReply>();

    @OneToMany(mappedBy = "cocktail")
    private List<CocktailTag> cocktailTagList = new ArrayList<CocktailTag>();
}
