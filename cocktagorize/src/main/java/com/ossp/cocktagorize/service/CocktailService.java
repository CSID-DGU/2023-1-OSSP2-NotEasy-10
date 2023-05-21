package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
            Page<Cocktail> cocktails = cocktailRepository.findAll(pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findAll(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByDic(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser") {
            Page<Cocktail> cocktails = cocktailRepository.findAllByOrderByName(pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findAllByOrderByName(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByLiked(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            Page<Cocktail> cocktails=cocktailRepository.findAllByOrderByLiked(pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findAllByOrderByLiked(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByUpdate(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            Page<Cocktail> cocktails=cocktailRepository.findAllByCocktailReplyCreationTime(pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findAllByCocktailReplyCreationTime(pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByName(String name, Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            Page<Cocktail> cocktails=cocktailRepository.findAllByNameContaining(name, pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findAllByNameContaining(name, pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByTagAnd(List<String> tags, Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            Page<Cocktail> cocktails=cocktailRepository.findByTagsByAnd(tags, tags.size(), pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findByTagsByAnd(tags, tags.size(), pageable).map(CocktailResponseDto::new);
    }

    @Transactional
    public Page<CocktailResponseDto> getCocktailByTagOr(List<String> tags, Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            Page<Cocktail> cocktails=cocktailRepository.findByTagsByOr(tags, pageable);
            List<CocktailResponseDto> cocktailList = new ArrayList<>();
            for (Cocktail cocktail : cocktails) {
                cocktailList.add(new CocktailResponseDto(cocktail, userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail.getId(), userRepository.findByUsername(authentication.getName()).getId())));
            }
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), cocktailList.size());
            return new PageImpl<>(cocktailList.subList(start, end));
        }
        return cocktailRepository.findByTagsByOr(tags, pageable).map(CocktailResponseDto::new);
    }

}
