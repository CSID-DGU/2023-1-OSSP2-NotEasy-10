package com.ossp.cocktagorize.controller.apiController;

import com.ossp.cocktagorize.service.CocktailApiSetUpService;
import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class CocktailApiSetUpController {

    public final static String BASE_URL = "https://www.thecocktaildb.com/";
    private final CocktailApiSetUpService cocktailApiSetUpService;

    public CocktailApiSetUpController(CocktailApiSetUpService cocktailApiSetUpService) {
        this.cocktailApiSetUpService = cocktailApiSetUpService;
    }

    private String getJsonDataByURL(String uri) {
        WebClient webClient = WebClient.create(BASE_URL);
        return webClient.get()
                .uri(uri)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // arrayName은 api에 담겨오는 array의 이름
    private JSONArray parsingArray(String jsonData, String arrayName) {
        JSONArray jsonArray = null;
        try {
            JSONParser parser = new JSONParser();
            JSONObject data = (JSONObject)parser.parse(jsonData);
            jsonArray = (JSONArray) data.get(arrayName);
        } catch (ParseException e) {
            System.out.println("parse 변환 실패");
        }
        return jsonArray;
    }

    @GetMapping("/getAllIngredient")
    public void getAllIngredient() {
        for (int i = 1; i < 617; i++) {

            String result = getJsonDataByURL("api/json/v1/1/lookup.php?iid=" + String.valueOf(i));

            // 예외처리 어떻게 할지, optional 쓸건지 생각해보기
            JSONArray ingredientArray = parsingArray(result, "ingredients");

            if (ingredientArray == null) continue;
            else cocktailApiSetUpService.saveIngredient(ingredientArray);
        }
    }

    @GetMapping("/getAllCocktail")
    public void getAllCocktail() {
        // 칵테일 id 범위 : 11000 ~ 17840, 178306 ~ 178369
        for (int i = 11000; i < 20000; i++) {

            String result = getJsonDataByURL("api/json/v1/1/lookup.php?i=" + String.valueOf(i));

            JSONArray cocktailArray = parsingArray(result, "drinks");

//            if (cocktailArray == null) continue;
//            else cocktailApiSetUpService.saveCocktail(cocktailArray);

            System.out.println(i);

            if (cocktailArray == null) {
                continue;
            }
            else {
                System.out.println(i);
                cocktailApiSetUpService.saveCocktail(cocktailArray);
            }
        }
    }
}
