package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.*;
import com.ossp.cocktagorize.data.entity.Board;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.entity.UserLikeBoard;
import com.ossp.cocktagorize.data.repository.BoardRepository;
import com.ossp.cocktagorize.data.repository.UserLikeBoardRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import com.ossp.cocktagorize.data.type.BoardType;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikeBoardRepository userLikeBoardRepository;
    @Transactional
    public BoardDto createBoard(BoardRequestDto boardRequestDto, Authentication authentication){
        String content=boardRequestDto.getContent();
        BoardType boardType=boardRequestDto.getBoardType();
        String title=boardRequestDto.getTitle();
        int userId=userRepository.findByUsername(authentication.getName()).getId();
        Board board=new Board();
        board.setContent(content);
        board.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        board.setUser(userRepository.findByUsername(authentication.getName()));
        board.setTitle(title);
        board.setType(boardType);
        Board saveBoard=boardRepository.save(board);
        return new BoardDto(saveBoard,userId);
    }
    @Transactional
    public String deleteBoard(int boardId,Authentication authentication){
        Board board=boardRepository.findById(boardId);
        if(board.getUser().getId()==userRepository.findByUsername(authentication.getName()).getId()){
            boardRepository.deleteById(boardId);
            return "success";
        }
        return "fail";
    }
    @Transactional
    public BoardDto editBoard(int boardId,BoardRequestDto boardRequestDto){
        Board board=boardRepository.findById(boardId);
        if(boardRequestDto.getBoardType()!=null){
            board.setType(boardRequestDto.getBoardType());
        }
        if(boardRequestDto.getTitle()!=null){
            board.setTitle(boardRequestDto.getTitle());
        }
        if(boardRequestDto.getContent()!=null){
            board.setContent(boardRequestDto.getContent());
        }
        boardRepository.save(board);
        return new BoardDto(board);
    }
    @Transactional
    public LikedResponseDto likeBoard(int boardId,Authentication authentication){
        int userId=userRepository.findByUsername(authentication.getName()).getId();
        Optional<UserLikeBoard> likedBoard=userLikeBoardRepository.findByBoardIdAndUserId(boardId,userId);
        Board board=boardRepository.findById(boardId);
        int liked;
        if(likedBoard.isPresent()){
            userLikeBoardRepository.deleteByUserIdAndBoardId(userId,boardId);
            liked=board.getLiked()-1;
            board.setLiked(liked);
        }
        else{
            UserLikeBoard userLikeBoard=new UserLikeBoard();
            userLikeBoard.setBoard(board);
            userLikeBoard.setUser(userRepository.findById(userId));
            UserLikeBoard saveUserLikeBoard=userLikeBoardRepository.save(userLikeBoard);
            liked=board.getLiked()+1;
            board.setLiked(liked);
        }
        return new LikedResponseDto(liked);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardList(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return boardRepository.findAllByOrderByIdDesc(pageable).map(board->new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return boardRepository.findAllByOrderByIdDesc(pageable).map(BoardResponseDto::new);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardListByDic(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return boardRepository.findAllByOrderByTitle(pageable).map(board->new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return boardRepository.findAllByOrderByTitle(pageable).map(BoardResponseDto::new);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardListByLiked(Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return boardRepository.findAllByOrderByLikedDesc(pageable).map(board->new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return boardRepository.findAllByOrderByLikedDesc(pageable).map(BoardResponseDto::new);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardListByTitle(String title,Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return boardRepository.findAllByTitleContaining(title,pageable).map(board->new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return boardRepository.findAllByTitleContaining(title,pageable).map(BoardResponseDto::new);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardListByContent(String content,Pageable pageable,Authentication authentication){
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return boardRepository.findAllByContentContaining(content,pageable).map(board->new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findByUsername(authentication.getName()).getId())));
        }
        return boardRepository.findAllByContentContaining(content,pageable).map(BoardResponseDto::new);
    }
    @Transactional
    public Page<BoardResponseDto> getBoardListByUserName(String username,Pageable pageable,Authentication authentication){
        List<User> userList=userRepository.findByUsernameContaining(username);
        List<Board> boards=new ArrayList<>();
        for(User user:userList){
            boards.addAll(boardRepository.findAllByUserId(user.getId()));
        }
        List<BoardResponseDto> boardResponseDtoList = new ArrayList<>();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            for(Board board:boards){
                boardResponseDtoList.add(new BoardResponseDto(board,userLikeBoardRepository.findByBoardIdAndUserId(board.getId(),userRepository.findById(board.getUser().getId()).getId())));
            }
            final int start=(int)pageable.getOffset();
            final int end=Math.min((start+ pageable.getPageSize()),boardResponseDtoList.size());
            return new PageImpl<>(boardResponseDtoList.subList(start,end),pageable,boardResponseDtoList.size());
        }
        for(Board board:boards){
            boardResponseDtoList.add(new BoardResponseDto(board));
        }
        final int start=(int)pageable.getOffset();
        final int end=Math.min((start+ pageable.getPageSize()),boardResponseDtoList.size());
        return new PageImpl<>(boardResponseDtoList.subList(start,end),pageable,boardResponseDtoList.size());
    }
}
