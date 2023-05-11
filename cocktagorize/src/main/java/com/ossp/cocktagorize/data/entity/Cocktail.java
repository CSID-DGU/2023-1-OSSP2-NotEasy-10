package com.ossp.cocktagorize.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Cocktail {
    @Id
    @Column(name = "cocktail_id")
    private int id;

    @Column(nullable = false)
    private String name;

    private String glassType;

    @Lob
    @Column(nullable = false, length = 500)
    private String recipe;

    @Column(nullable = false)
    private BigDecimal alcoholDegree;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @OneToMany(mappedBy = "cocktail")
    private List<CocktailReply> cocktailReplyList = new ArrayList<CocktailReply>();

    @OneToMany(mappedBy = "cocktail")
    private List<CocktailTag> cocktailTagList = new ArrayList<CocktailTag>();
}
