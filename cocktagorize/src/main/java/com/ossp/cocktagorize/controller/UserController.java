package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.service.PreferCocktailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private PreferCocktailService preferCocktailService;

    @GetMapping("/cocktail/prefer/{username}")
    @ResponseBody
    public ResponseEntity<List<CocktailResponseDto>> getPrefer(@PathVariable String username){
        List<CocktailResponseDto> preferList=preferCocktailService.getPreferTagCocktail(username);
        return ResponseEntity.ok(preferList);
    }
}
