package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CocktailDetailrepository extends  JpaRepository<Cocktail,Integer>{

    public Cocktail findById(int id);
}