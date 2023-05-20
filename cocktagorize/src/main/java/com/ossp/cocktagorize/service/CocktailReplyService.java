package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailReplyDto;
import com.ossp.cocktagorize.data.dto.CocktailReplyRequestDto;
import com.ossp.cocktagorize.data.entity.CocktailReply;
import com.ossp.cocktagorize.data.repository.CocktailDetailrepository;
import com.ossp.cocktagorize.data.repository.CocktailReplyRepository;
import com.ossp.cocktagorize.data.repository.UserLikeCocktailRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class CocktailReplyService {
    @Autowired
    private CocktailReplyRepository cocktailReplyRepository;
    @Autowired
    private CocktailDetailrepository cocktailDetailrepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikeCocktailRepository userLikeCocktailRepository;

    public CocktailReplyDto createReply(CocktailReplyRequestDto cocktailReplyDto, int cocktail_id, Authentication authentication){
        String content=cocktailReplyDto.getContent();
        int userId=userRepository.findByUsername(authentication.getName()).getId();
        CocktailReply cocktailReply=new CocktailReply();
        cocktailReply.setContent(content);
        cocktailReply.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        cocktailReply.setUser(userRepository.findById(userId));
        cocktailReply.setCocktail(cocktailDetailrepository.findById(cocktail_id));
        CocktailReply saveReply=cocktailReplyRepository.save(cocktailReply);
        return new CocktailReplyDto(saveReply,cocktail_id,userId);
    }
}
