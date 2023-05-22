package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.Board;
import com.ossp.cocktagorize.data.entity.BoardReply;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.entity.UserLikeBoard;
import com.ossp.cocktagorize.data.type.BoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Getter
@NoArgsConstructor
public class BoardDetailResponseDto {
    private int id;
    private BoardType type;
    private String title;
    private String content;
    private int liked;
    private UserDto user;
    private List<BoardReplyDto> boardReplyList;
    private Timestamp createdDate;
    private boolean userLikeBoard;
    @Getter
    @NoArgsConstructor
    static
    class UserDto{
        private int id;
        private String name;
        public UserDto(User user){
            id= user.getId();
            name=user.getNickname();
        }
    }
    public BoardDetailResponseDto(Board board, Optional<UserLikeBoard> userLike){
        id= board.getId();
        type=board.getType();
        title= board.getTitle();
        content= board.getContent();
        liked= board.getLiked();
        user=new UserDto(board.getUser());
        boardReplyList=new ArrayList<>();
        for(BoardReply boardReply:board.getBoardReplyList()){
            boardReplyList.add(new BoardReplyDto(boardReply));
        }
        createdDate=board.getCreatedDate();
        userLikeBoard=userLike.isPresent();
    }
    public BoardDetailResponseDto(Board board){
        id= board.getId();
        type=board.getType();
        title= board.getTitle();
        content= board.getContent();
        liked= board.getLiked();
        user=new UserDto(board.getUser());
        boardReplyList=new ArrayList<>();
        for(BoardReply boardReply:board.getBoardReplyList()){
            boardReplyList.add(new BoardReplyDto(boardReply));
        }
        createdDate=board.getCreatedDate();
        userLikeBoard=false;
    }
}
