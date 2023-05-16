package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.NicknameRequestDto;
import com.ossp.cocktagorize.data.dto.UserJoinDto;
import com.ossp.cocktagorize.data.dto.UsernameRequestDto;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/user/join")
    public ResponseEntity<String> signUp(@RequestBody UserJoinDto userJoinDto) {
        userService.join(userJoinDto);
        userService.registerPreferTag(userJoinDto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/user/join/id")
    public ResponseEntity<Boolean> idCheck(@RequestBody UsernameRequestDto usernameRequestDto) {
        boolean duplicateIdExist = userService.checkDuplicateId(usernameRequestDto.getUsername());
        return ResponseEntity.ok(duplicateIdExist);
    }

    @PostMapping("/user/join/nickname")
    public ResponseEntity<Boolean> nicknameCheck(@RequestBody NicknameRequestDto nicknameRequestDto) {
        boolean duplicateNicknameExist = userService.checkDuplicateNickname(nicknameRequestDto.getNickname());
        return ResponseEntity.ok(duplicateNicknameExist);
    }
}
