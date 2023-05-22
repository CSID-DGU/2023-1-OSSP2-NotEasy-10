package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.CocktailReply;
import com.ossp.cocktagorize.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class CocktailReplyDto {
    private int id;
    private String content;
    private Timestamp createdDate;
    private UserDto user;
    private int userId;
    private int cocktailId;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        private String username;
        private String nickname;
        public UserDto(User user){
            id= user.getId();
            username = user.getUsername();
            nickname=user.getNickname();
        }
    }
    public CocktailReplyDto(CocktailReply cocktailReply){
        id=cocktailReply.getId();
        content= cocktailReply.getContent();
        createdDate=cocktailReply.getCreatedDate();
        user= new UserDto(cocktailReply.getUser());
        cocktailId=cocktailReply.getCocktail().getId();
        userId=user.getId();
    }
    public CocktailReplyDto(CocktailReply cocktailReply, int cocktailId1, int userId1){
        id=cocktailReply.getId();
        content=cocktailReply.getContent();
        createdDate=cocktailReply.getCreatedDate();
        userId=userId1;
        cocktailId=cocktailId1;
    }

}