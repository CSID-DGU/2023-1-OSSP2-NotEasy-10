package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.CocktailReply;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailReplyRepository extends JpaRepository<CocktailReply,Integer> {
    public CocktailReply save(CocktailReply cocktailReply);
}
