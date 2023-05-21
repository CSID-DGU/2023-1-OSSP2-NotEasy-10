package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.*;
import com.ossp.cocktagorize.data.type.BoardType;
import lombok.*;

import java.io.Serializable;
import java.sql.Timestamp;
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

    private List<LikedBoardDto> likeBoardList;

    public FavoritePageResponseDto(List<Cocktail> likeCocktails, List<UserLikeCocktail> userLikedCocktails, List<Board> likeBoards, List<UserLikeBoard> userLikedBoards) {
        this.likeCocktailList = mapToLikeCocktailDtoList(likeCocktails, userLikedCocktails);
        this.likeBoardList = mapToLikeBoardDtoList(likeBoards, userLikedBoards);
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

    private List<LikedBoardDto> mapToLikeBoardDtoList(List<Board> likeBoards, List<UserLikeBoard> userLikedBoards) {
        List<LikedBoardDto> likeBoardDtoList = new ArrayList<>();

        for (UserLikeBoard userLikeBoard : userLikedBoards) {
            Optional<Board> matchingBoard = likeBoards.stream()
                    .filter(cocktail -> cocktail.getId() == userLikeBoard.getBoard().getId())
                    .findFirst();

            matchingBoard.ifPresent(board -> {
                LikedBoardDto likeBoardDto = new LikedBoardDto(board);
                likeBoardDtoList.add(likeBoardDto);
            });
        }
        return likeBoardDtoList;
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

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LikedBoardDto implements Serializable {
        private int id;

        private String title;

        private BoardType type;

        private Timestamp createdDate;

        public LikedBoardDto(Board board) {
            this.id = board.getId();
            this.title = board.getTitle();
            this.createdDate = board.getCreatedDate();
            this.type = board.getType();
        }

    }
}
