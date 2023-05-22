package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailDetailResponseDto;
import com.ossp.cocktagorize.data.dto.LikedResponseDto;
import com.ossp.cocktagorize.service.CocktailDetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/cocktail")
public class CocktailDetailController {

    @Autowired
    private CocktailDetailservice cocktailDetailservice;

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<CocktailDetailResponseDto> getCocktail(@PathVariable int id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CocktailDetailResponseDto cocktailDto;
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            cocktailDto = cocktailDetailservice.getCocktailDetailAndLike(id, authentication);
        }
        else{
            cocktailDto=cocktailDetailservice.getCocktailDetail(id);

        }
        return ResponseEntity.ok(cocktailDto);
    }
    @PutMapping("/{cocktail_id}/like")
    public ResponseEntity<LikedResponseDto> likeCocktail(@PathVariable int cocktail_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(cocktailDetailservice.likeCocktail(cocktail_id, authentication));
        }
        return ResponseEntity.notFound().build();
    }
}