package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.CocktailTag;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CocktailTagDto {
    private TagDto tagDto;
    private String amount;

    public CocktailTagDto(CocktailTag cocktailTag){
        tagDto=new TagDto(cocktailTag.getTag());
        amount=cocktailTag.getAmount();
    }
}
