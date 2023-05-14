package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.Cocktail;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SimilarDto {
    private int id;
    private String name;
    private int liked;

    public SimilarDto(Cocktail cocktail){
        id=cocktail.getId();
        name=cocktail.getName();
        liked= cocktail.getLiked();
    }
}
