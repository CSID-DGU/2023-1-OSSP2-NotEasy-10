package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.Tag;
import com.ossp.cocktagorize.data.idClass.CocktailTagId;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import com.ossp.cocktagorize.data.repository.CocktailTagRepository;
import com.ossp.cocktagorize.data.repository.TagRepository;
import com.ossp.cocktagorize.data.type.TagType;
import org.hibernate.id.IdentifierGenerationException;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.StringTokenizer;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

// 나중에 여유되면 stream으로 갈아끼우기
@Service
public class CocktailApiSetUpService {

    private final CocktailRepository cocktailRepository;
    private final TagRepository tagRepository;
    private final CocktailTagRepository cocktailTagRepository;

    public CocktailApiSetUpService(CocktailRepository cocktailRepository, TagRepository tagRepository, CocktailTagRepository cocktailTagRepository) {
        this.cocktailRepository = cocktailRepository;
        this.tagRepository = tagRepository;
        this.cocktailTagRepository = cocktailTagRepository;
    }

//    private BigDecimal fractionToDecimal(String fraction) {
//        String[] parts = fraction.split("/");
//        BigDecimal numerator = new BigDecimal(parts[0]);
//        BigDecimal denominator = new BigDecimal(parts[1]);
//        return numerator.divide(denominator);
//    }

    @Transactional
    public void saveIngredient(JSONArray ingredientArray) {
        for (Object obj : ingredientArray) {
            JSONObject jsonIngredient = (JSONObject) obj;
            int id = Integer.parseInt((String) jsonIngredient.get("idIngredient"));

            String name = (String) jsonIngredient.get("strIngredient");

            System.out.println(name);

            int alcoholDegree = 0;
            String alcoholDegreeTmp = (String) jsonIngredient.get("strABV");
            if (alcoholDegreeTmp != null) {
                alcoholDegree = Integer.parseInt(alcoholDegreeTmp);
            }

            TagType category =  null;
            if (alcoholDegree != 0) {
                category = TagType.ALCOHOL;
            } else {
                category = TagType.INGREDIENT;
            }

            Tag tag = Tag.builder()
                    .id(id)
                    .name(name)
                    .alcoholDegree(alcoholDegree)
                    .category(category)
                    .build();

            tagRepository.save(tag);
        }

    }

    @Transactional
    public void saveCocktail(JSONArray cocktailArray) {

        for (Object obj : cocktailArray) {
            JSONObject jsonCocktail = (JSONObject) obj;

            int cocktailId = Integer.parseInt((String) jsonCocktail.get("idDrink"));

            String name = (String) jsonCocktail.get("strDrink");

            String glassType = (String) jsonCocktail.get("strGlass");

            String recipe = ((String) jsonCocktail.get("strInstructions")).trim();

            Cocktail cocktail = Cocktail.builder()
                    .id(cocktailId)
                    .name(name)
                    .recipe(recipe)
                    .glassType(glassType)
                    .alcoholDegree(BigDecimal.ZERO)
                    .build();

            cocktailRepository.save(cocktail);
            System.out.println(recipe);

            System.out.println("칵테일 번호 : " + cocktailId);

            String ingredient = null;
            Tag ingredientTag = null;

            for (int ingredientNum = 1; ingredientNum < 16; ingredientNum++) {
                ingredient = (String) jsonCocktail.get("strIngredient" + ingredientNum);
                if (ingredient == null) {
                    break;
                }
                ingredientTag = tagRepository.findTagByName(ingredient);
                CocktailTag cocktailTag = CocktailTag.builder()
                        .cocktail(cocktail)
                        .tag(ingredientTag)
                        .build();
                cocktailTagRepository.save(cocktailTag);
            }
        }
    }
}
