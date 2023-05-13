package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
    List<Cocktail> findAllByOrderByLiked();
    List<Cocktail> findAllByOrderByName();

    @Query(value = "select c.*, MAX(cr.created_date) as creation_time from cocktail c left outer join cocktail_reply cr On c.cocktail_id = cr.cocktail_id group by c.cocktail_id order by creation_time", nativeQuery = true)
    List<Cocktail> getCocktailByCocktailReplyCreationTime();

}
