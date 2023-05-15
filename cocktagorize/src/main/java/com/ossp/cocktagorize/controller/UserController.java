package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.UserJoinDto;
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
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/user/join/id")
    public ResponseEntity<Boolean> idCheck(@RequestParam("username") String username) {
        boolean duplicateIdExist = userService.checkDuplicateId(username);
        return ResponseEntity.ok(duplicateIdExist);
    }

    @PostMapping("/user/join/nickname")
    public ResponseEntity<Boolean> nicknameCheck(@RequestParam("nickname") String nickname) {
        boolean duplicateNicknameExist = userService.checkDuplicateNickname(nickname);
        return ResponseEntity.ok(duplicateNicknameExist);
    }
}
