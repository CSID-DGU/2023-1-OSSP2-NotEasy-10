package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.UserJoinDto;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.repository.UserRepository;
import com.ossp.cocktagorize.data.type.RoleType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

   @Transactional
    public void join(UserJoinDto userJoinDto) {
        userRepository.save(userJoinDto.toEntity(bCryptPasswordEncoder.encode(userJoinDto.getPassword()), RoleType.USER));
    }

    @Transactional
    public boolean checkDuplicateId(String username) {
        return userRepository.existsByUsername(username);
    }

    @Transactional
    public boolean checkDuplicateNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }
}

