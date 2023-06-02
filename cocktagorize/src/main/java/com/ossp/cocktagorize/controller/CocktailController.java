package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.service.CocktailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin
@RestController
public class CocktailController {
    @Autowired
    private CocktailService cocktailService;

    private final int defaultPageSize = 20;

    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailList(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailList(modifiedPageable,authentication);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/dictionary")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByDic(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByDic(modifiedPageable,authentication);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/liked")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByLiked(@PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByLiked(modifiedPageable,authentication);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/cocktail/search/{name}")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByName(@PathVariable String name, @PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByName(name, modifiedPageable,authentication);
        return ResponseEntity.ok(cocktailList);
    }

    // null일 때도 추가
    @GetMapping("/cocktail/tag/and")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByTagAnd(@RequestParam List<String> tags, @PageableDefault Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList;
        if (tags.size() != 0) {
            cocktailList = cocktailService.getCocktailByTagAnd(tags, modifiedPageable,authentication);
        } else {
            cocktailList = cocktailService.getCocktailList(modifiedPageable,authentication);
        }
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/cocktail/tag/or")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByTagOr(@RequestParam List<String> tags, @PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<CocktailResponseDto> cocktailList;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(tags.size());
        if (tags.size() != 0) {
            cocktailList = cocktailService.getCocktailByTagOr(tags, modifiedPageable,authentication);
        } else {
            cocktailList = cocktailService.getCocktailList(modifiedPageable,authentication);
        }
        return ResponseEntity.ok(cocktailList);
    }
    @GetMapping("/cocktail/degree/{min}/{max}")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByDegree(@PathVariable BigDecimal min, @PathVariable BigDecimal max, @PageableDefault Pageable pageable){
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(cocktailService.getCocktailByDegree(min,max,authentication,modifiedPageable));
    }
}
