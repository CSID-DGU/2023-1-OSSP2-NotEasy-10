package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.idClass.UserLikeCocktailId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@IdClass(UserLikeCocktailId.class)
public class UserLikeCocktail {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;
}
