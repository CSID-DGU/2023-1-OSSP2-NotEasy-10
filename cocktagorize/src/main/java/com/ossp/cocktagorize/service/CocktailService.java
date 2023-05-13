package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CocktailService {
    @Autowired
    private CocktailRepository cocktailRepository;

    private List<CocktailResponseDto> cocktailToCocktailResponseDtoList(List<Cocktail> cocktailList) {
        List<CocktailResponseDto> cocktailResponseDtoList = new ArrayList<>();
        return cocktailList.stream()
                .map(CocktailResponseDto::toEntity)
                .collect(Collectors.toList());
    }

    public List<CocktailResponseDto> getCocktailList(){
        List<Cocktail> cocktailList = cocktailRepository.findAll();
        return cocktailToCocktailResponseDtoList(cocktailList);
    }

    public List<CocktailResponseDto> getCocktailByDic(){
        List<Cocktail> cocktailList = cocktailRepository.findAllByOrderByName();
        return cocktailToCocktailResponseDtoList(cocktailList);
    }

    public List<CocktailResponseDto> getCocktailByLiked(){
        List<Cocktail> cocktailList = cocktailRepository.findAllByOrderByLiked();
        return cocktailToCocktailResponseDtoList(cocktailList);
    }

    public List<CocktailResponseDto> getCocktailByUpdate(){
        List<Cocktail> cocktailList = cocktailRepository.getCocktailByCocktailReplyCreationTime();
        return cocktailToCocktailResponseDtoList(cocktailList);
    }
}
