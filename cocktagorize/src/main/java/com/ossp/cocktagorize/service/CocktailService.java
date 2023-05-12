package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CocktailService {
    @Autowired
    private CocktailRepository cocktailRepository;

    public List<CocktailResponseDto> getCocktailList(){
        List<Cocktail> cocktailList=cocktailRepository.findAll();
        List<CocktailResponseDto> cocktailResponseDtos=new ArrayList<>();
        for(Cocktail cocktail:cocktailList){
            cocktailResponseDtos.add(CocktailResponseDto.toEntity(cocktail));
        }
        return cocktailResponseDtos;
    }
}
