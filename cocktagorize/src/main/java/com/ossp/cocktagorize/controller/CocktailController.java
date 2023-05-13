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
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailByDic(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByDic(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/liked")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailByLiked(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList = cocktailService.getCocktailByLiked(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }

    @GetMapping("/update")
    public ResponseEntity<Page<CocktailResponseDto>> getCocktailByUpdate(@PageableDefault Pageable pageable) {
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(),
                (pageable.getPageNumber() == 0) ? firstPageSize : defaultPageSize);
        Page<CocktailResponseDto> cocktailList=cocktailService.getCocktailByUpdate(modifiedPageable);
        return ResponseEntity.ok(cocktailList);
    }
}
