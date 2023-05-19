package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailReplyDto;
import com.ossp.cocktagorize.data.dto.CocktailReplyRequestDto;
import com.ossp.cocktagorize.data.entity.CocktailReply;
import com.ossp.cocktagorize.data.repository.CocktailDetailrepository;
import com.ossp.cocktagorize.data.repository.CocktailReplyRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public CocktailReplyDto createReply(CocktailReplyRequestDto cocktailReplyDto,int cocktail_id){
        String content=cocktailReplyDto.getContent();
        int cocktailId=cocktail_id;
        int userId=cocktailReplyDto.getUserId();
        CocktailReply cocktailReply=new CocktailReply();
        cocktailReply.setContent(content);
        cocktailReply.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        cocktailReply.setUser(userRepository.findById(userId));
        cocktailReply.setCocktail(cocktailDetailrepository.findById(cocktailId));
        CocktailReply saveReply=cocktailReplyRepository.save(cocktailReply);
        CocktailReplyDto saveReplyDto=new CocktailReplyDto(saveReply,cocktailId,userId);
        return saveReplyDto;
    }


}
