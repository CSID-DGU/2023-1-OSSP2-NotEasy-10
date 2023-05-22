package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.Board;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.entity.UserLikeBoard;
import com.ossp.cocktagorize.data.type.BoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Optional;

@Getter
@NoArgsConstructor
@Setter
public class BoardResponseDto {
    private int id;
    private String title;
    private int liked;
    private BoardType boardType;
    private UserDto user;
    private Timestamp createdDate;
    private boolean userLikeBoard;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        private String Nickname;
        private String username;
        public UserDto(User user){
            id= user.getId();
            Nickname=user.getNickname();
            username=user.getUsername();
        }
    }
    public BoardResponseDto(Board board){
        id=board.getId();
        title=board.getTitle();
        liked=board.getLiked();
        boardType=board.getType();
        user=new UserDto(board.getUser());
        createdDate=board.getCreatedDate();
        userLikeBoard=false;
    }
    public BoardResponseDto(Board board, Optional<UserLikeBoard> userLike){
        id=board.getId();
        title=board.getTitle();
        liked=board.getLiked();
        boardType=board.getType();
        user=new UserDto(board.getUser());
        createdDate=board.getCreatedDate();
        userLikeBoard=userLike.isPresent();
    }
}
