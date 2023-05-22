package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.BoardReplyDto;
import com.ossp.cocktagorize.data.dto.BoardReplyRequestDto;
import com.ossp.cocktagorize.service.BoardReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin

@RestController
@RequestMapping("/board/{boardId}")
public class BoardReplyController {
    @Autowired
    private BoardReplyService boardReplyService;

    @PostMapping("/reply")
    public ResponseEntity<BoardReplyDto> createReply(@RequestBody BoardReplyRequestDto boardReplyRequestDto,@PathVariable int boardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(boardReplyService.createReply(boardReplyRequestDto,boardId,authentication));
        }
        return ResponseEntity.ok(null);
    }
    @DeleteMapping("/reply/{replyId}")
    public ResponseEntity<String> delete(@PathVariable int replyId,@PathVariable int boardId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(boardReplyService.deleteReply(replyId,boardId,authentication));
        }
        return ResponseEntity.ok("fail");
    }
    @PutMapping("/reply/{replyId}")
    public ResponseEntity<BoardReplyDto> editReply(@PathVariable int replyId,@RequestBody BoardReplyRequestDto boardREplyRequestDto){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && authentication.getPrincipal() != "anonymousUser"){
            return ResponseEntity.ok(boardReplyService.editReply(replyId,boardREplyRequestDto,authentication));
        }
        return ResponseEntity.notFound().build();
    }
}
