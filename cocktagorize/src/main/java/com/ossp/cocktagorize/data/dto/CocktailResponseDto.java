package com.ossp.cocktagorize.data.dto;


import com.ossp.cocktagorize.data.entity.Cocktail;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class CocktailResponseDto {
    private int id;
    private String name;
    private String glassType;
    private String recipe;
    private BigDecimal alcoholDegree;
    private int liked;
    private List<TagDto> cocktailTagList;

    // 여유 될 떄 생성자로 바꾸기 builder, allargs 태그도 없애고, cocktailservice도 바꾸기
//    public static CocktailResponseDto toEntity(Cocktail cocktail) {
//        return CocktailResponseDto.builder()
//                .id(cocktail.getId())
//                .name(cocktail.getName())
//                .glassType(cocktail.getGlassType())
//                .recipe(cocktail.getRecipe())
//                .alcoholDegree(cocktail.getAlcoholDegree())
//                .liked(cocktail.getLiked())
//                .cocktailTagList(cocktail.getCocktailTagList().stream()
//                        .map(cocktailTag -> new TagDto(cocktailTag.getTag()))
//                        .collect(Collectors.toList()))
//                .build();
//    }

    public CocktailResponseDto (Cocktail cocktail) {
        id = cocktail.getId();
        name = cocktail.getName();
        recipe = cocktail.getRecipe();
        glassType = cocktail.getGlassType();
        alcoholDegree = cocktail.getAlcoholDegree();
        liked = cocktail.getLiked();
        cocktailTagList = cocktail.getCocktailTagList().stream()
                .map(cocktailTag -> new TagDto(cocktailTag.getTag()))
                .collect(Collectors.toList());
    }
}
