package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocktailTagRepository extends JpaRepository<CocktailTag, CocktailTagId> {
    List<CocktailTag> findCocktailTagsByTagId(int tagId);
}
