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
    private int liked;
    private Timestamp createdDate;
    private UserDto user;
    @Getter
    @NoArgsConstructor
    class UserDto{
        private int id;
        private String name;
        public UserDto(User user){
            id= user.getId();
            name=user.getNickname();
        }
    }
    public CocktailReplyDto(CocktailReply cocktailReply){
        id=cocktailReply.getId();
        content= cocktailReply.getContent();;
        liked= cocktailReply.getLiked();
        createdDate=cocktailReply.getCreatedDate();
        user=new UserDto(cocktailReply.getUser());
    }

}
