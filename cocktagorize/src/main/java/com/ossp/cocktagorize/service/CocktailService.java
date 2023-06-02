package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class CocktailService {
    @Autowired
    private CocktailRepository cocktailRepository;
    @Autowired
    private UserLikeCocktailRepository userLikeCocktailRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Page<CocktailResponseDto> getCocktailList(Pageable pageable, Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findAll(pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findAll(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByDic(Pageable pageable, Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findAllByOrderByName(pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findAllByOrderByName(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByLiked(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findAllByOrderByLikedDesc(pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findAllByOrderByLikedDesc(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByName(String name, Pageable pageable, Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findAllByNameContaining(name, pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findAllByNameContaining(name, pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByTagAnd(List<String> tags, Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findByTagsByAnd(tags, tags.size(), pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findByTagsByAnd(tags, tags.size(), pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByTagOr(List<String> tags, Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return cocktailRepository.findByTagsByOr(tags, pageable).map(cocktail -> new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findByTagsByOr(tags, pageable).map(CocktailResponseDto::new);
    }

    public Page<CocktailResponseDto> getCocktailByDegree(BigDecimal min, BigDecimal max, Authentication authentication, Pageable pageable){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return cocktailRepository.findByAlcoholDegreeBetweenOrderByAlcoholDegreeAsc(min,max,pageable).map(cocktail -> new CocktailResponseDto(cocktail,userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return cocktailRepository.findByAlcoholDegreeBetweenOrderByAlcoholDegreeAsc(min,max,pageable).map(CocktailResponseDto::new);
    }
}
