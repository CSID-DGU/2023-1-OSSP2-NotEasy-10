package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.service.CocktailService;
import jakarta.websocket.server.PathParam;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
public class CocktailController {
    @Autowired
    private CocktailService cocktailService;
    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<List<CocktailResponseDto>> getCocktail(){
        List<CocktailResponseDto> cocktailList=cocktailService.getCocktailList();
        return ResponseEntity.ok(cocktailList);
    }

}
