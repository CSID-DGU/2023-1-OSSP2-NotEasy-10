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
        System.out.println("어디야");
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            cocktailDto = cocktailDetailservice.getCocktailDetailAndLike(id, authentication);
            System.out.println("어디야2");
        }
        else{
            cocktailDto=cocktailDetailservice.getCocktailDetail(id);
            System.out.println("어디야3");

        }
        return ResponseEntity.ok(cocktailDto);
    }
    @PutMapping("/{cocktail_id}/like")
    public ResponseEntity<LikedResponseDto> likeCocktail(@PathVariable int cocktail_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(cocktailDetailservice.likeCocktail(cocktail_id, authentication));
        }
        System.out.println("허허허");
        return ResponseEntity.notFound().build();
    }
}