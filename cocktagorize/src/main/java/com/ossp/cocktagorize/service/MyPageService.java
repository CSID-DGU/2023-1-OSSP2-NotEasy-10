package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.UserJoinDto;
import com.ossp.cocktagorize.data.entity.User;
import com.ossp.cocktagorize.data.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

@Component
@Service
public class MyPageService {
    private final UserRepository userRepository;

    public MyPageService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserJoinDto getUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return null;
        }
        UserJoinDto userJoinDto = new UserJoinDto();
        userJoinDto.setUsername(user.getUsername());
        userJoinDto.setPassword(user.getPassword());
        userJoinDto.setEmail(user.getEmail());
        userJoinDto.setNickname(user.getNickname());
        userJoinDto.setAlcoholCapacity(user.getAlcoholCapacity());
        return userJoinDto;
    }
    @Transactional
    public UserJoinDto updateUserProfile(String username, UserJoinDto userJoinDto) {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new NotFoundException("User not found");
        }

        user.setUsername(userJoinDto.getUsername());
        user.setPassword(userJoinDto.getPassword());
        user.setEmail(userJoinDto.getEmail());
        user.setNickname(userJoinDto.getNickname());
        user.setAlcoholCapacity(userJoinDto.getAlcoholCapacity());
        userRepository.save(user);

        return userJoinDto;
    }

    @Transactional
    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user != null) {
            userRepository.delete(user);
        } else {
            throw new IllegalArgumentException("User not found.");
        }
    }
}

