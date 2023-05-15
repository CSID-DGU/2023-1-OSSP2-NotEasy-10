package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailDetailResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.repository.CocktailDetailrepository;
import com.ossp.cocktagorize.data.repository.CocktailTagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
public class CocktailDetailservice {

    @Autowired
    private CocktailDetailrepository cocktailDetailrepository;
    @Autowired
    private CocktailTagRepository cocktailTagRepository;
    public CocktailDetailResponseDto getCocktailDetail(int id){
        Cocktail cocktail=cocktailDetailrepository.findById(id);
        List<CocktailTag> tagList=new ArrayList<>();
        for(CocktailTag tag:cocktail.getCocktailTagList()){
            int tagId=tag.getTag().getId();
            if(tagId<643||tagId>648) {
                tagList.addAll(cocktailTagRepository.findCocktailTagsByTagId(tagId));
            }
        }
        Random random=new Random();
        random.setSeed(System.currentTimeMillis());
        Cocktail similar=cocktailDetailrepository.findById(tagList.get(random.nextInt(tagList.size())).getCocktail().getId());
        while(similar.getId()==cocktail.getId()){
            similar=cocktailDetailrepository.findById(tagList.get(random.nextInt(tagList.size())).getCocktail().getId());
        }
        return new CocktailDetailResponseDto(cocktail,similar);
    }
}
