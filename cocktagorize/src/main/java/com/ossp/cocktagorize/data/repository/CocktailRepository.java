package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
    Cocktail findById(int id);
    Page<Cocktail> findAll(Pageable pageable);
    Page<Cocktail> findAllByOrderByName(Pageable pageable);
    Page<Cocktail> findAllByOrderByLiked(Pageable pageable);
    Page<Cocktail> findAllByNameContaining(String name, Pageable pageable);
    @Query(value = "select c.*, MAX(cr.created_date) as creation_time from cocktail c left outer join cocktail_reply cr on c.cocktail_id = cr.cocktail_id group by c.cocktail_id order by creation_time", nativeQuery = true)
    Page<Cocktail> findAllByCocktailReplyCreationTime(Pageable pageable);
    @Query("SELECT c FROM Cocktail c JOIN c.cocktailTagList ct WHERE ct.tag.name IN :tagNames GROUP BY c HAVING COUNT(DISTINCT ct.tag) = :tagCount")
    Page<Cocktail> findByTagsByAnd(List<String> tagNames, long tagCount, Pageable pageable);
    @Query("SELECT DISTINCT c FROM Cocktail c JOIN c.cocktailTagList ct WHERE ct.tag.name IN :tagNames")
    Page<Cocktail> findByTagsByOr(List<String> tagNames, Pageable pageable);
}
