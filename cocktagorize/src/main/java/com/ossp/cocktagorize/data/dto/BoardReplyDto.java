package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.BoardReply;
import com.ossp.cocktagorize.data.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@NoArgsConstructor
public class BoardReplyDto {
    private int id;
    private String content;
    private int liked;
    private UserDto user;
    private Timestamp createdDate;
    private int boardId;
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
    public BoardReplyDto(BoardReply boardReply){
        id=boardReply.getId();
        content= boardReply.getContent();
        liked= boardReply.getLiked();
        user=new UserDto(boardReply.getUser());
        createdDate=boardReply.getCreatedDate();
        boardId=boardReply.getBoard().getId();
        userId=boardReply.getUser().getId();
    }
    public BoardReplyDto(BoardReply boardReply,int boardId,int userId){
        id=boardReply.getId();
        content= boardReply.getContent();
        liked= boardReply.getLiked();
        createdDate=boardReply.getCreatedDate();
        this.boardId=boardId;
        this.userId=userId;
    }
}
