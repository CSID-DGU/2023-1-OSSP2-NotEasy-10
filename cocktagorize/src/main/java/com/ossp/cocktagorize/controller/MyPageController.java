package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.data.dto.UserJoinDto;
import com.ossp.cocktagorize.data.dto.UserResponseDto;
import com.ossp.cocktagorize.data.dto.UsernameRequestDto;
import com.ossp.cocktagorize.service.MyPageService;
import com.ossp.cocktagorize.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class MyPageController {
    private final MyPageService mypageService;
    private final UserService userService;

    public MyPageController(MyPageService mypageService, UserService userService) {
        this.mypageService = mypageService;
        this.userService = userService;
    }

    @PostMapping // 회원 정보 조회
    public ResponseEntity<?> getUserByUsername(@RequestBody UsernameRequestDto requestDto) {
        try {
            String username = requestDto.getUsername();
            UserResponseDto userResponseDto = mypageService.getUserByUsername(username);
            if (userResponseDto == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(userResponseDto);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 조회에 실패하였습니다.");
        }
    }

    @PutMapping() //회원 정보 수정
    public ResponseEntity<String> updateUserProfile(@RequestBody UserJoinDto userJoinDto) {
        try {
            mypageService.updateUserProfile(userJoinDto);
            userService.registerPreferTag(userJoinDto);
            return ResponseEntity.ok("회원 정보 수정에 성공하였습니다.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 정보 수정에 실패하였습니다.");
        }
    }

    @DeleteMapping("/{username}") //회원 탈퇴 기능
    public ResponseEntity<String> deleteUser(@PathVariable String username) {
        try {
            mypageService.deleteUserByUsername(username);
            return ResponseEntity.ok("회원 탈퇴가 성공적으로 진행되었습니다.");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 탈퇴에 실패하였습니다.");
        }
    }
}

