package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserLikeCocktailDto {
    private int userId;
    private int cocktailId;
    public UserLikeCocktailDto(UserLikeCocktail userLikeCocktail){
        userId=userLikeCocktail.getUser().getId();
        cocktailId=userLikeCocktail.getCocktail().getId();
    }
}
