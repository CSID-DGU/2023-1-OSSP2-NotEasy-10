package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@IdClass(CocktailTagId.class)
public class CocktailTag {
    @Id
    @ManyToOne
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    @Id
    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
