package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.config.SecurityUtil;
import com.ossp.cocktagorize.config.jwt.TokenProvider;
import com.ossp.cocktagorize.data.dto.TokenDto;
import com.ossp.cocktagorize.data.dto.UserJoinDto;
import com.ossp.cocktagorize.data.dto.UserRequestDto;
import com.ossp.cocktagorize.data.dto.UserResponseDto;
import com.ossp.cocktagorize.data.entity.PreferTag;
import com.ossp.cocktagorize.data.repository.PreferTagRepository;
import com.ossp.cocktagorize.data.repository.TagRepository;
import com.ossp.cocktagorize.data.repository.UserRepository;
import com.ossp.cocktagorize.data.type.RoleType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final TagRepository tagRepository;
    private final PreferTagRepository preferTagRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;

    public UserService(UserRepository userRepository, TagRepository tagRepository, PreferTagRepository preferTagRepository, BCryptPasswordEncoder bCryptPasswordEncoder, AuthenticationManagerBuilder managerBuilder, TokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.tagRepository = tagRepository;
        this.preferTagRepository = preferTagRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.managerBuilder = managerBuilder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public UserResponseDto getMyInfoBySecurity() {
        return new UserResponseDto(userRepository.findByUsername(SecurityUtil.getCurrentMember()));
    }

    @Transactional
    public TokenDto login(UserRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

    @Transactional
    public void join(UserJoinDto userJoinDto) {
        userRepository.save(userJoinDto.toEntity(bCryptPasswordEncoder.encode(userJoinDto.getPassword()), RoleType.USER));
    }

    @Transactional
    public void registerPreferTag(UserJoinDto userJoinDto) {
        PreferTag preferTag = null;
        for (String tagName : userJoinDto.getPreferTagList()) {
            preferTag = new PreferTag(userRepository.findByUsername(userJoinDto.getUsername()), tagRepository.findTagByName(tagName));
            preferTagRepository.save(preferTag);
        }
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

