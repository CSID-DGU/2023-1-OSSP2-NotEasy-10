package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.Board;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.type.BoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class BoardDto {
    private int id;
    private BoardType type;
    private String content;
    private int liked;
    private UserDto user;
    private Timestamp createdDate;
    private int userId;
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
    public BoardDto(Board board){
        id= board.getId();
        type=board.getType();
        content= board.getContent();
        liked= board.getLiked();
        user=new UserDto(board.getUser());
        createdDate=board.getCreatedDate();
    }
    public BoardDto(Board board,int userId){
        id= board.getId();
        type=board.getType();
        content= board.getContent();
        liked= board.getLiked();
        createdDate=board.getCreatedDate();
        this.userId=userId;
    }
}
