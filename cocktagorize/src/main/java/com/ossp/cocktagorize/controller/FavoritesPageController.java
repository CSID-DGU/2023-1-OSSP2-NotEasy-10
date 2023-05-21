package com.ossp.cocktagorize.controller;
import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.dto.FavoritePageResponseDto;
import com.ossp.cocktagorize.data.dto.UsernameRequestDto;
import com.ossp.cocktagorize.data.entity.*;
import com.ossp.cocktagorize.data.idClass.UserLikeCocktailId;
import com.ossp.cocktagorize.data.repository.UserLikeBoardRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class FavoritesPageController {
    private final UserRepository userRepository;
    private final UserLikeCocktailRepository userLikeCocktailRepository;

    private final UserLikeBoardRepository userLikeBoardRepository;

    @Autowired
    public FavoritesPageController(UserRepository userRepository, UserLikeCocktailRepository userLikeCocktailRepository, UserLikeBoardRepository userLikeBoardRepository) {
        this.userRepository = userRepository;
        this.userLikeCocktailRepository = userLikeCocktailRepository;
        this.userLikeBoardRepository = userLikeBoardRepository;
    }

    @GetMapping("/liked-cocktails")
    public ResponseEntity<FavoritePageResponseDto> getLikedCocktailsByUsername(@RequestBody UsernameRequestDto requestDto) {
        String username = requestDto.getUsername();
        User user = userRepository.findByUsername(username);

        int userId = user.getId();

        List<UserLikeCocktail> userLikedCocktails = userLikeCocktailRepository.findCocktailsByUserId(userId);

        List<UserLikeBoard> userLikedBoards = userLikeBoardRepository.findBoardsByUserId(userId);

        List<Cocktail> likedCocktails = userLikedCocktails.stream()
                .map(UserLikeCocktail::getCocktail)
                .collect(Collectors.toList());

        List<Board> likedBoards = userLikedBoards.stream()
                .map(UserLikeBoard::getBoard)
                .collect(Collectors.toList());

        FavoritePageResponseDto responseDto = new FavoritePageResponseDto(likedCocktails, userLikedCocktails, likedBoards, userLikedBoards);

        return ResponseEntity.ok(responseDto);
    }
}


