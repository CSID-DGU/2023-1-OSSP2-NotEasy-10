package com.ossp.cocktagorize.data.dto;


import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.type.TagType;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CocktailResponseDto {
    private int id;
    private String name;
    private String glassType;
    private String recipe;
    private BigDecimal alcoholDegree;
    private int liked;
    private List<TagDto> cocktailTagList;

    public static CocktailResponseDto toEntity(Cocktail cocktail) {
        return CocktailResponseDto.builder()
                .id(cocktail.getId())
                .name(cocktail.getName())
                .glassType(cocktail.getGlassType())
                .recipe(cocktail.getRecipe())
                .alcoholDegree(cocktail.getAlcoholDegree())
                .liked(cocktail.getLiked())
                .cocktailTagList(cocktail.getCocktailTagList().stream()
                        .map(cocktailTag -> new TagDto(cocktailTag.getTag()))
                        .collect(Collectors.toList()))
                .build();
    }
}
