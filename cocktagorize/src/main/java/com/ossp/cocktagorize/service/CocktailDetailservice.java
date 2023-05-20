package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailDetailResponseDto;
import com.ossp.cocktagorize.data.dto.UserLikeCocktailDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import com.ossp.cocktagorize.data.repository.CocktailDetailrepository;
import com.ossp.cocktagorize.data.repository.CocktailTagRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;


@Service
public class CocktailDetailservice {

    @Autowired
    private CocktailDetailrepository cocktailDetailrepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikeCocktailRepository userLikeCocktailRepository;
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
    @Transactional
    public UserLikeCocktailDto likeCocktail(int cocktail_id, Authentication authentication){
        int userId=userRepository.findByUsername(authentication.getName()).getId();
        Optional<UserLikeCocktail> userLikeCocktail=userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail_id,userId);
        if(userLikeCocktail.isPresent()){
            userLikeCocktailRepository.deleteByCocktailIdAndUserId(cocktail_id,userLikeCocktail.get().getUser().getId());
            Cocktail cocktail=cocktailDetailrepository.findById(cocktail_id);
            cocktail.setLiked(cocktail.getLiked()-1);
        }
        else{
            UserLikeCocktail userLikedCocktail=new UserLikeCocktail();
            userLikedCocktail.setCocktail(cocktailDetailrepository.findById(cocktail_id));
            userLikedCocktail.setUser(userRepository.findById(userId));
            UserLikeCocktail userLikedCocktail1=userLikeCocktailRepository.save(userLikedCocktail);

            Cocktail cocktail=cocktailDetailrepository.findById(cocktail_id);
            cocktail.setLiked(cocktail.getLiked()+1);
            return new UserLikeCocktailDto(userLikedCocktail1);
        }
        return null;
    }

}
