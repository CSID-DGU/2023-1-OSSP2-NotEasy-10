package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocktailTagRepository extends JpaRepository<CocktailTag, CocktailTagId> {
    long countByTagId(int weatherTagId);
    List<CocktailTag> findCocktailTagsByTagId(int tagId);
    Page<CocktailTag> findCocktailTagsByTagId(int tagId, Pageable pageable);
}
