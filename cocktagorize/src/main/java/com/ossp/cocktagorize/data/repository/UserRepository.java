package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String username);
    User findById(int id);
    boolean existsByUsername(String username);
    boolean existsByNickname(String nickname);

    List<User> findByUsernameContaining(String username);

}
