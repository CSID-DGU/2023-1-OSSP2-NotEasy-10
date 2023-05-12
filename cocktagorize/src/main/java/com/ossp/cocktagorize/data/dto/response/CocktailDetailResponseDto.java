package com.ossp.cocktagorize.data.dto.response;

import com.ossp.cocktagorize.data.dto.CocktailReplyDto;
import com.ossp.cocktagorize.data.dto.SimilarDto;
import com.ossp.cocktagorize.data.dto.TagDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailReply;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class CocktailDetailResponseDto {
    private int id;
    private String name;
    private String recipe;
    private String glassType;
    private BigDecimal alcholeDegree;
    private int liked;
    private List<CocktailReplyDto> cocktailReplyList;
    private List<TagDto> cocktailTagList;
    private SimilarDto similarCocktail;
    public CocktailDetailResponseDto(Cocktail cocktail,Cocktail similar){
        id=cocktail.getId();
        name= cocktail.getName();
        recipe=cocktail.getRecipe();
        glassType=cocktail.getGlassType();
        alcholeDegree=cocktail.getAlcoholDegree();
        liked=cocktail.getLiked();

        cocktailReplyList=new ArrayList<>();
        for (CocktailReply cocktailReply : cocktail.getCocktailReplyList()){
            cocktailReplyList.add(new CocktailReplyDto(cocktailReply)); 
        }
        cocktailTagList=new ArrayList<>();
        for(CocktailTag cocktailTag:cocktail.getCocktailTagList()){
            cocktailTagList.add(new TagDto(cocktailTag.getTag()));
        }
        similarCocktail=new SimilarDto(similar);
    }
}
