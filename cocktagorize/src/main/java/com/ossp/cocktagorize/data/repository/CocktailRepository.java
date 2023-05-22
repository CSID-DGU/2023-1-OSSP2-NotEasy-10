package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
    Cocktail findById(int id);
    @SuppressWarnings("all")
    Page<Cocktail> findAll(Pageable pageable);
    Page<Cocktail> findAllByOrderByName(Pageable pageable);
    Page<Cocktail> findAllByOrderByLikedDesc(Pageable pageable);
    Page<Cocktail> findAllByNameContaining(String name, Pageable pageable);
    @Query("SELECT c FROM Cocktail c JOIN c.cocktailTagList ct WHERE ct.tag.name IN :tagNames GROUP BY c HAVING COUNT(DISTINCT ct.tag) = :tagCount")
    Page<Cocktail> findByTagsByAnd(@Param("tagNames") List<String> tagNames, @Param("tagCount") long tagCount, Pageable pageable);
    @Query("SELECT DISTINCT c FROM Cocktail c JOIN c.cocktailTagList ct WHERE ct.tag.name IN :tagNames")
    Page<Cocktail> findByTagsByOr(@Param("tagNames") List<String> tagNames, Pageable pageable);
}
