package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CocktailRepository extends JpaRepository<Cocktail, Integer> {
    public List<Cocktail> findAll();
}
