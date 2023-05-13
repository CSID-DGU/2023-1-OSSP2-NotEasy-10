package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.service.CocktailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CocktailController {
    @Autowired
    private CocktailService cocktailService;
    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<CocktailResponseDto>> getCocktailList(){
        List<CocktailResponseDto> cocktailList = cocktailService.getCocktailList();
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/dictionary")
    public ResponseEntity<List<CocktailResponseDto>> getCocktailByDic() {
        List<CocktailResponseDto> cocktailList = cocktailService.getCocktailByDic();
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/liked")
    public ResponseEntity<List<CocktailResponseDto>> getCocktailByLiked() {
        List<CocktailResponseDto> cocktailList = cocktailService.getCocktailByLiked();
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/update")
    public ResponseEntity<List<CocktailResponseDto>> getCocktailByUpdate() {
        List<CocktailResponseDto> cocktailList=cocktailService.getCocktailByUpdate();
        return ResponseEntity.ok(cocktailList);
    }
}
