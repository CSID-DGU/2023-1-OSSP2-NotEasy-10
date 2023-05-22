package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.BoardReplyDto;
import com.ossp.cocktagorize.data.dto.BoardReplyRequestDto;
import com.ossp.cocktagorize.data.entity.BoardReply;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.repository.BoardReplyRepository;
import com.ossp.cocktagorize.data.repository.BoardRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class BoardReplyService {
    @Autowired
    private BoardReplyRepository boardReplyRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BoardRepository boardRepository;

    @Transactional
    public BoardReplyDto createReply(BoardReplyRequestDto boardReplyRequestDto,int board_id ,Authentication authentication){
        String content=boardReplyRequestDto.getContent();
        User user=userRepository.findByUsername(authentication.getName());
        BoardReply boardReply=new BoardReply();
        boardReply.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        boardReply.setUser(user);
        boardReply.setContent(content);
        boardReply.setBoard(boardRepository.findById(board_id));
        BoardReply saveReply=boardReplyRepository.save(boardReply);
        return new BoardReplyDto(saveReply,board_id,user.getId());
    }
    @Transactional
    public String deleteReply(int replyId,int boardId,Authentication authentication){
        BoardReply boardReply=boardReplyRepository.findById(replyId);
        if(boardId==boardReply.getBoard().getId()&&boardReply.getUser().getId()==userRepository.findByUsername(authentication.getName()).getId()){
            boardReplyRepository.deleteById(replyId);
            return "success";
        }
        return "fail";
    }
    @Transactional
    public BoardReplyDto editReply(int replyId,BoardReplyRequestDto boardReplyRequestDto,Authentication authentication){
        BoardReply boardReply=boardReplyRepository.findById(replyId);
        if(boardReply.getUser().getId()!=userRepository.findByUsername(authentication.getName()).getId()){
            return null;
        }
        boardReply.setContent(boardReplyRequestDto.getContent());
        boardReplyRepository.save(boardReply);
        return new BoardReplyDto(boardReply);
    }
}
