package com.ossp.cocktagorize.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import jakarta.persistence.*;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@IdClass(CocktailTagId.class)
public class CocktailTag {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id")
    
    private Cocktail cocktail;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
