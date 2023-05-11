package com.ossp.cocktagorize.data.dto;


import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.type.TagType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CocktailDto {
    private int id;
    private String name;
    private String glassType;
    private String recipe;
    private BigDecimal alcoholDegree;
    private int liked;
    private List<CocktailTagDto> cocktailTagList;

    public static CocktailDto toEntity(Cocktail cocktail) {
        return CocktailDto.builder()
                .id(cocktail.getId())
                .name(cocktail.getName())
                .glassType(cocktail.getGlassType())
                .recipe(cocktail.getRecipe())
                .alcoholDegree(cocktail.getAlcoholDegree())
                .liked(cocktail.getLiked())
                .cocktailTagList(cocktail.getCocktailTagList().stream()
                        .map(cocktailTag -> new CocktailTagDto(cocktailTag.getTag().getId(), cocktailTag.getTag().getCategory(), cocktailTag.getTag().getName()))
                        .collect(Collectors.toList()))
                .build();
    }

    @AllArgsConstructor
    @Getter
    private static class CocktailTagDto {
        private int id;
        private TagType category;
        private String name;
    }

}
