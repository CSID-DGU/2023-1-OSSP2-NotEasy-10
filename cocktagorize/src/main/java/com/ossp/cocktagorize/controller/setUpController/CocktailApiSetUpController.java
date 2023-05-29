package com.ossp.cocktagorize.controller.setUpController;

import com.ossp.cocktagorize.service.CocktailApiSetUpService;
import org.apache.commons.io.FileUtils;
import org.apache.tika.Tika;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class CocktailApiSetUpController {

    public final static String BASE_URL = "https://www.thecocktaildb.com/";
    private final CocktailApiSetUpService cocktailApiSetUpService;
    private final ApiUtils apiUtils;
    // api 에서 분류 해놓은 태그 종류들
    List<String> typeList = new ArrayList<>();

    public CocktailApiSetUpController(CocktailApiSetUpService cocktailApiSetUpService, ApiUtils apiUtils) {
        this.cocktailApiSetUpService = cocktailApiSetUpService;
        this.apiUtils = apiUtils;
    }
    
    // arrayName은 api에 담겨오는 array의 이름
    @GetMapping("/getAllIngredient")
    public void getAllIngredient() {
        for (int i = 1; i < 617; i++) {

            String result = apiUtils.getJsonDataByURL(BASE_URL + "api/json/v1/1/lookup.php?iid=" + String.valueOf(i));

            // 예외처리 어떻게 할지, optional 쓸건지 생각해보기
            JSONArray ingredientArray = apiUtils.parsingArray(result, "ingredients");

            if (ingredientArray == null) continue;
            else typeList.add(cocktailApiSetUpService.saveIngredient(ingredientArray));
        }

        // api 에서 분류 해놓은 태그 종류들
        typeList = typeList.stream().distinct().collect(Collectors.toList());
        System.out.println("태그 분류 완료");
    }

    @GetMapping("/getAllCocktail")
    public void getAllCocktail() {
        // 칵테일 id 범위 : 11000 ~ 17840, 178306 ~ 178369
        for (int i = 178306; i < 178370; i++) {

            String result = apiUtils.getJsonDataByURL(BASE_URL + "api/json/v1/1/lookup.php?i=" + String.valueOf(i));

            JSONArray cocktailArray = apiUtils.parsingArray(result, "drinks");

            if (cocktailArray == null) {
                continue;
            }
            else {
                cocktailApiSetUpService.saveCocktail(cocktailArray);
            }
        }
    }

    @GetMapping("/getAllImages")
    public void getAllImages() {
        // 칵테일 id 범위 : 11000 ~ 17840, 178306 ~ 178369
        for (int i = 178306; i < 178370; i++) {
            String result = apiUtils.getJsonDataByURL(BASE_URL + "api/json/v1/1/lookup.php?i=" + String.valueOf(i));

            JSONArray cocktailArray = apiUtils.parsingArray(result, "drinks");

            if (cocktailArray == null) continue;

            try {
                JSONObject jsonCocktail = (JSONObject) cocktailArray.get(0);
                URL url = new URL((String) jsonCocktail.get("strDrinkThumb"));
                File cocktailImg = new File("./src/main/frontend/src/images", (String) jsonCocktail.get("idDrink") + ".jpeg");
                FileUtils.copyURLToFile(url, cocktailImg);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    public static String getContentType(File image) {
        String contentType = null;
        Tika tika = new Tika();
        try {
            contentType = tika.detect(image);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return contentType;
    }
}
