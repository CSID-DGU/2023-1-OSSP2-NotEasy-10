package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.UserLikeBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserLikeBoardRepository extends JpaRepository<UserLikeBoard,Integer> {

    @SuppressWarnings("all")
    Optional<UserLikeBoard> findByBoardIdAndUserId(int boardId, int userId);
    List<UserLikeBoard> findBoardsByUserId(int userId);
    UserLikeBoard save(UserLikeBoard userLikeBoard);
    void deleteByUserIdAndBoardId(int userId,int boardId);

}