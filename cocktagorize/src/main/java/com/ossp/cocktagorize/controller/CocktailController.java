package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.service.CocktailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class CocktailController {
    private final int firstPageSize = 20;
    private final int defaultPageSize = 20;

    @Autowired
    private CocktailService cocktailService;
    @GetMapping("/")
    @ResponseBody
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailList(@PageableDefault Pageable pageable){
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailList(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/dictionary")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByDic(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByDic(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/liked")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByLiked(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByLiked(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/update")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByUpdate(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByUpdate(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/cocktail/search/{name}")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByName(@PathVariable String name, @PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByName(name, modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    // null일 때도 추가
    @GetMapping("/cocktail/tag/and")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByTagAnd(@RequestParam List<String> tags, @PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList;
        if (tags.size() != 0) {
            cocktailList = cocktailService.getCocktailByTagAnd(tags, modifiedPageable);
        } else {
            cocktailList = cocktailService.getCocktailList(modifiedPageable);
        }
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/cocktail/tag/or")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailListByTagOr(@RequestParam List<String> tags, @PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList;
        System.out.println(tags.size());
        if (tags.size() != 0) {
            cocktailList = cocktailService.getCocktailByTagOr(tags, modifiedPageable);
        } else {
            cocktailList = cocktailService.getCocktailList(modifiedPageable);
        }
        return ResponseEntity.ok(cocktailList);
    }
}
