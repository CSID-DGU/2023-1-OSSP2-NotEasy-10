package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.FavoritePageResponseDto;
import com.ossp.cocktagorize.data.entity.*;
import com.ossp.cocktagorize.data.repository.UserLikeBoardRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
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
    public ResponseEntity<FavoritePageResponseDto> getLikedCocktailsByUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
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


