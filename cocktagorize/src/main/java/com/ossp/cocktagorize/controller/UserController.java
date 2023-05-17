package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.*;
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

    @PostMapping("/user/login")
    public ResponseEntity<TokenDto> login(@RequestBody UserRequestDto requestDto) {
        return ResponseEntity.ok(userService.login(requestDto));
    }

    @GetMapping("/user/info")
    public ResponseEntity<UserResponseDto> getMyMemberInfo() {
        UserResponseDto myInfoBySecurity = userService.getMyInfoBySecurity();
        return ResponseEntity.ok(myInfoBySecurity);
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/user/join")
    public ResponseEntity<String> signUp(@RequestBody UserJoinDto userJoinDto) {
        userService.join(userJoinDto);
        userService.registerPreferTag(userJoinDto);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/user/join/id")
    public ResponseEntity<Boolean> idCheck(@RequestBody UserRequestDto usernameRequestDto) {
        boolean duplicateIdExist = userService.checkDuplicateId(usernameRequestDto.getUsername());
        return ResponseEntity.ok(duplicateIdExist);
    }

    @PostMapping("/user/join/nickname")
    public ResponseEntity<Boolean> nicknameCheck(@RequestBody NicknameRequestDto nicknameRequestDto) {
        boolean duplicateNicknameExist = userService.checkDuplicateNickname(nicknameRequestDto.getNickname());
        return ResponseEntity.ok(duplicateNicknameExist);
    }
}
