package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.CocktailReplyDto;
import com.ossp.cocktagorize.data.dto.CocktailReplyRequestDto;
import com.ossp.cocktagorize.service.CocktailReplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class CocktailReplyController {
    @Autowired
    private CocktailReplyService cocktailReplyService;
    @PostMapping("/cocktail/{cocktail_id}/reply")
    public ResponseEntity<CocktailReplyDto> createReply(@RequestBody CocktailReplyRequestDto cocktailReplyDto, @PathVariable int cocktail_id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() != "anonymousUser") {
            return ResponseEntity.ok(cocktailReplyService.createReply(cocktailReplyDto,cocktail_id,authentication));
        }
        return ResponseEntity.ok(null);
    }
}
