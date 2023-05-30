package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.Tag;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import com.ossp.cocktagorize.data.repository.CocktailTagRepository;
import com.ossp.cocktagorize.data.repository.TagRepository;
import com.ossp.cocktagorize.data.type.TagType;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

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

    // 분수를 반올림해서 리턴
    private BigDecimal fractionToDecimal(String fraction) {
        String[] parts = fraction.split("/");
        BigDecimal numerator = new BigDecimal(parts[0]);
        BigDecimal denominator = new BigDecimal(parts[1]);
        return numerator.divide(denominator).setScale(2, RoundingMode.HALF_UP);
    }

    @Transactional
    public String saveIngredient(JSONArray ingredientArray) {
        String category = null;
        for (Object obj : ingredientArray) {
            JSONObject jsonIngredient = (JSONObject) obj;
            int id = Integer.parseInt((String) jsonIngredient.get("idIngredient"));

            String name = (String) jsonIngredient.get("strIngredient");

//            System.out.println(name);

            int alcoholDegree = 0;
            String alcoholDegreeTmp = (String) jsonIngredient.get("strABV");
            if (alcoholDegreeTmp != null) {
                alcoholDegree = Integer.parseInt(alcoholDegreeTmp);
            }

            String type = (String) jsonIngredient.get("strType");

            if (type == null) {
                continue;
            }

            if (type.equals("Liqueur") || type.equals("Liquor")) {
                System.out.println("바뀐 Tag id : " + id + "   태그 타입 : " + type);
                Tag tag = Tag.builder()
                        .id(id)
                        .name(name)
                        .alcoholDegree(alcoholDegree)
                        .category(TagType.ALCOHOL)
                        .build();

                tagRepository.save(tag);
            }

            if (type.equals("Syrup")) {
                System.out.println("바뀐 Tag id : " + id + "   태그 타입 : " + type);
                Tag tag = Tag.builder()
                        .id(id)
                        .name(name)
                        .alcoholDegree(alcoholDegree)
                        .category(TagType.SYRUP)
                        .build();

                tagRepository.save(tag);
            }

            if (type.equals("Fruit Juice") || type.equals("Juice")) {
                System.out.println("바뀐 Tag id : " + id + "   태그 타입 : " + type);
                Tag tag = Tag.builder()
                        .id(id)
                        .name(name)
                        .alcoholDegree(alcoholDegree)
                        .category(TagType.JUICE)
                        .build();

                tagRepository.save(tag);
            }

            if (type.equals("Bitters")) {
                System.out.println("바뀐 Tag id : " + id + "   태그 타입 : " + type);
                Tag tag = Tag.builder()
                        .id(id)
                        .name(name)
                        .alcoholDegree(alcoholDegree)
                        .category(TagType.BITTER)
                        .build();

                tagRepository.save(tag);
            }

            if (type.equals("Milk")) {
                System.out.println("바뀐 Tag id : " + id + "   태그 타입 : " + type);
                Tag tag = Tag.builder()
                        .id(id)
                        .name(name)
                        .alcoholDegree(alcoholDegree)
                        .category(TagType.MILK)
                        .build();

                tagRepository.save(tag);
            }

            if (alcoholDegree != 0) {
                category = TagType.ALCOHOL.toString();
            } else {
//                category = TagType.INGREDIENT;
                category = type;
            }


        }

        return category;
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


            System.out.println("칵테일 번호 : " + cocktailId);

            String ingredient = null;
            String ingredientAmount = null;
            Tag ingredientTag = null;

            for (int ingredientNum = 1; ingredientNum < 16; ingredientNum++) {
                ingredient = (String) jsonCocktail.get("strIngredient" + ingredientNum);
                ingredientAmount = (String) jsonCocktail.get("strMeasure" + ingredientNum);

                if (ingredient == null) {
                    break;
                }
                ingredientTag = tagRepository.findTagByName(ingredient);
                CocktailTag cocktailTag = CocktailTag.builder()
                        .cocktail(cocktail)
                        .tag(ingredientTag)
                        .amount(ingredientAmount)
                        .build();

                cocktailTagRepository.save(cocktailTag);
            }
        }
    }
}