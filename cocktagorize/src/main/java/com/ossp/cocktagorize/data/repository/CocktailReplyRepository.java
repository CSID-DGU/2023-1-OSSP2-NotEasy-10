package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.CocktailReply;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CocktailReplyRepository extends JpaRepository<CocktailReply,Integer> {
     @SuppressWarnings("all")
     @Transactional
     CocktailReply save(CocktailReply cocktailReply);
     @Transactional
     void deleteById(int id);
     CocktailReply findById(int replyId);
}
