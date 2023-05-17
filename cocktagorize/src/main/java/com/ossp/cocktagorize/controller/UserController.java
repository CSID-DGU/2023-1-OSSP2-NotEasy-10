package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.config.jwt.TokenProvider;
import com.ossp.cocktagorize.data.dto.*;
import com.ossp.cocktagorize.data.repository.UserRepository;
import com.ossp.cocktagorize.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;
    private final AuthenticationManagerBuilder managerBuilder;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TokenProvider tokenProvider;

    public UserController(UserService userService, AuthenticationManagerBuilder managerBuilder, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, TokenProvider tokenProvider) {
        this.userService = userService;

        this.managerBuilder = managerBuilder;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.tokenProvider = tokenProvider;
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
