package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserLikeCocktailRepository extends JpaRepository<UserLikeCocktail,Integer> {
    void deleteByCocktailIdAndUserId(int cocktailId,int userId);
    UserLikeCocktail save(UserLikeCocktail userLikeCocktail);
    Optional<UserLikeCocktail> findByCocktailIdAndUserId(int cocktailId, int userId);
}
