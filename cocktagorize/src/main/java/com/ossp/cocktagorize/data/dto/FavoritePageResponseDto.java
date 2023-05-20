package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoritePageResponseDto {
    private List<LikedCocktailDto> likeCocktailList;

    public FavoritePageResponseDto(List<Cocktail> likeCocktails, List<UserLikeCocktail> userLikedCocktails) {
        this.likeCocktailList = mapToLikeCocktailDtoList(likeCocktails, userLikedCocktails);
    }

    private List<LikedCocktailDto> mapToLikeCocktailDtoList(List<Cocktail> likeCocktails, List<UserLikeCocktail> userLikedCocktails) {
        List<LikedCocktailDto> likeCocktailDtoList = new ArrayList<>();
        for (UserLikeCocktail userLikeCocktail : userLikedCocktails) {
            Optional<Cocktail> matchingCocktail = likeCocktails.stream()
                    .filter(cocktail -> cocktail.getId() == userLikeCocktail.getCocktail().getId())
                    .findFirst();

            matchingCocktail.ifPresent(cocktail -> {
                LikedCocktailDto likeCocktailDto = new LikedCocktailDto(cocktail);
                likeCocktailDtoList.add(likeCocktailDto);
            });
        }
        return likeCocktailDtoList;
    }
    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LikedCocktailDto implements Serializable {
        private int id;
        private String name;
        private List<TagDto> cocktailTagList;

        public LikedCocktailDto(Cocktail cocktail) {
            this.id = cocktail.getId();
            this.name = cocktail.getName();
            this.cocktailTagList = mapToTagDtoList(cocktail.getCocktailTagList());
        }

        private List<TagDto> mapToTagDtoList(List<CocktailTag> cocktailTagList) {
            return cocktailTagList.stream()
                    .map(cocktailTag -> new TagDto(cocktailTag.getTag()))
                    .collect(Collectors.toList());
        }
    }
}
