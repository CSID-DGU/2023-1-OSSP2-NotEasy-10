package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CocktailTagRepository extends JpaRepository<CocktailTag, CocktailTagId> {
}
