package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.CocktailReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocktailReplyRepository extends JpaRepository<CocktailReply,Integer> {
     @SuppressWarnings("all")
     CocktailReply save(CocktailReply cocktailReply);
}
