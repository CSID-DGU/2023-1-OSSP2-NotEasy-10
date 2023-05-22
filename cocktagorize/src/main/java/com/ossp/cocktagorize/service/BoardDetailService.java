package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.BoardDetailResponseDto;
import com.ossp.cocktagorize.data.entity.Board;
import com.ossp.cocktagorize.data.entity.UserLikeBoard;
import com.ossp.cocktagorize.data.repository.BoardRepository;
import com.ossp.cocktagorize.data.repository.UserLikeBoardRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BoardDetailService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserLikeBoardRepository userLikeBoardRepository;
    @Autowired
    private UserRepository userRepository;

    public BoardDetailResponseDto getBoardDetail(int id){
        Board board= boardRepository.findById(id);
        return new BoardDetailResponseDto(board);
    }
    public BoardDetailResponseDto getBoardDetailAndLike(int id, Authentication authentication){
        Optional<UserLikeBoard> userLikeBoard=userLikeBoardRepository.findByBoardIdAndUserId(id,userRepository.findByUsername(authentication.getName()).getId());
        return new BoardDetailResponseDto(boardRepository.findById(id),userLikeBoard);
    }
}
