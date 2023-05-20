package com.ossp.cocktagorize.controller;
import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.dto.FavoritePageResponseDto;
import com.ossp.cocktagorize.data.dto.UsernameRequestDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import com.ossp.cocktagorize.data.idClass.UserLikeCocktailId;
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

    @Autowired
    public FavoritesPageController(UserRepository userRepository, UserLikeCocktailRepository userLikeCocktailRepository) {
        this.userRepository = userRepository;
        this.userLikeCocktailRepository = userLikeCocktailRepository;
    }

    @GetMapping("/liked-cocktails")
    public ResponseEntity<FavoritePageResponseDto> getLikedCocktailsByUsername(@RequestBody UsernameRequestDto requestDto) {
        String username = requestDto.getUsername();
        User user = userRepository.findByUsername(username);

        int userId = user.getId();

        List<UserLikeCocktail> userLikedCocktails = userLikeCocktailRepository.findCocktailsByUserId(userId);

        List<Cocktail> likedCocktails = userLikedCocktails.stream()
                .map(UserLikeCocktail::getCocktail)
                .collect(Collectors.toList());

        FavoritePageResponseDto responseDto = new FavoritePageResponseDto(likedCocktails, userLikedCocktails);

        return ResponseEntity.ok(responseDto);
    }
}


