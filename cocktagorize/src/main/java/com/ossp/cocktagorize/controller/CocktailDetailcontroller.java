package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.response.CocktailDetailResponseDto;
import com.ossp.cocktagorize.service.CocktailDetailservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CocktailDetailcontroller {

    @Autowired
    private CocktailDetailservice cocktailDetailservice;

    @GetMapping("/cocktail/{id}")
    @ResponseBody
    public ResponseEntity<CocktailDetailResponseDto> getCocktail(@PathVariable int id){
        CocktailDetailResponseDto cocktailDto= cocktailDetailservice.getCocktailDetail(id);
        return ResponseEntity.ok(cocktailDto);
    }

}