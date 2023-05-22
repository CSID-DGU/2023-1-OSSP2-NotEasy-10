package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.BoardDto;
import com.ossp.cocktagorize.data.dto.BoardRequestDto;
import com.ossp.cocktagorize.data.dto.BoardResponseDto;
import com.ossp.cocktagorize.data.dto.LikedResponseDto;
import com.ossp.cocktagorize.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoardController {
    @Autowired
    private BoardService boardService;

    private final int defaultPageSize = 4;

    @PostMapping("/board")
    public ResponseEntity<BoardDto> createBoard(@RequestBody BoardRequestDto boardRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(boardService.createBoard(boardRequestDto,authentication));
        }
        return ResponseEntity.ok(null);
    }
    @DeleteMapping("/board/{boardId}")
    public ResponseEntity<String> deleteBoard(@PathVariable int boardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(boardService.deleteBoard(boardId,authentication));
        }
        return ResponseEntity.ok("fail");
    }
    @PutMapping("/board/{boardId}")
    public ResponseEntity<BoardDto> editReply(@PathVariable int boardId,@RequestBody BoardRequestDto boardRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(boardService.editBoard(boardId,boardRequestDto));
        }
        return ResponseEntity.notFound().build();
    }
    @PutMapping("/board/{boardId}/like")
    public ResponseEntity<LikedResponseDto> likeBoard(@PathVariable int boardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(boardService.likeBoard(boardId,authentication));
        }
        return ResponseEntity.notFound().build();
    }
    @GetMapping("/board")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardList(@PageableDefault Pageable pageable){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardList(modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
    @GetMapping("/board/dictionary")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardListByDic(@PageableDefault Pageable pageable){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardListByDic(modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
    @GetMapping("/board/liked")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardListByLiked(@PageableDefault Pageable pageable){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardListByLiked(modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
    @GetMapping("/board/title/{board_title}")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardListByTitle(@PageableDefault Pageable pageable,@PathVariable String board_title){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardListByTitle(board_title,modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
    @GetMapping("board/content/{content}")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardListByContent(@PageableDefault Pageable pageable,@PathVariable String content){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardListByContent(content,modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
    @GetMapping("/board/user/{username}")
    @ResponseBody
    public ResponseEntity<Page<BoardResponseDto>> getBoardListByUserName(@PageableDefault Pageable pageable,@PathVariable String username){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Pageable modifiedPageable = PageRequest.of(pageable.getPageNumber(), defaultPageSize);
        Page<BoardResponseDto> boardList=boardService.getBoardListByUserName(username,modifiedPageable,authentication);
        return ResponseEntity.ok(boardList);
    }
}
