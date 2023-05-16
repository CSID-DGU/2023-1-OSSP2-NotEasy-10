package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CocktailService {
    @Autowired
    private CocktailRepository cocktailRepository;

    public Page<CocktailResponseDto> getCocktailList(Pageable pageable){
        return cocktailRepository.findAll(pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByDic(Pageable pageable){
        return cocktailRepository.findAllByOrderByName(pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByLiked(Pageable pageable){
        return cocktailRepository.findAllByOrderByLiked(pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByUpdate(Pageable pageable){
        return cocktailRepository.findAllByCocktailReplyCreationTime(pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByName(String name, Pageable pageable){
        return cocktailRepository.findAllByNameContaining(name, pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByTagAnd(List<String> tags, Pageable pageable){
        return cocktailRepository.findByTagsByAnd(tags, tags.size(), pageable).map(CocktailResponseDto::toEntity);
    }

    public Page<CocktailResponseDto> getCocktailByTagOr(List<String> tags, Pageable pageable){
        return cocktailRepository.findByTagsByOr(tags, pageable).map(CocktailResponseDto::toEntity);
    }

}
