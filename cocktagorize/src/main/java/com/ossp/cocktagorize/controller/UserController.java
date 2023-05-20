package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.*;
import com.ossp.cocktagorize.service.PreferCocktailService;
import com.ossp.cocktagorize.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
public class UserController {

    private final UserService userService;
    private final PreferCocktailService preferCocktailService;

    public UserController(UserService userService, PreferCocktailService preferCocktailService) {
        this.userService = userService;
        this.preferCocktailService = preferCocktailService;
    }
    @GetMapping("/cocktail/prefer/{username}")
    @ResponseBody
    public ResponseEntity<List<CocktailResponseDto>> getPrefer(@PathVariable String username){
        List<CocktailResponseDto> preferList=preferCocktailService.getPreferTagCocktail(username);
        return ResponseEntity.ok(preferList);
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
