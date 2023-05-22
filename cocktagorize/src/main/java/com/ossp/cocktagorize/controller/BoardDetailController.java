package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.BoardDetailResponseDto;
import com.ossp.cocktagorize.service.BoardDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardDetailController {
    @Autowired
    private BoardDetailService boardDetailService;

    @GetMapping("/board/{boardId}")
    @ResponseBody
    public ResponseEntity<BoardDetailResponseDto> getBoard(@PathVariable int boardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        BoardDetailResponseDto boardDto;
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            boardDto=boardDetailService.getBoardDetailAndLike(boardId,authentication);
            return ResponseEntity.ok(boardDto);
        }
        boardDto=boardDetailService.getBoardDetail(boardId);
        return ResponseEntity.ok(boardDto);
    }
}
