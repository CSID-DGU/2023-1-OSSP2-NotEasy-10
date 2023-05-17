package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);
}
