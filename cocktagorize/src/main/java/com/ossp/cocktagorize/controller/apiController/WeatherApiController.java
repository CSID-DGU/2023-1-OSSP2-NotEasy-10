package com.ossp.cocktagorize.controller.apiController;

import com.ossp.cocktagorize.controller.setUpController.ApiUtils;
import com.ossp.cocktagorize.data.dto.CocktailResponseDto;
import com.ossp.cocktagorize.data.dto.WeatherRequestDto;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.VillagePosition;
import com.ossp.cocktagorize.data.repository.CocktailRepository;
import com.ossp.cocktagorize.data.repository.CocktailTagRepository;
import com.ossp.cocktagorize.data.repository.TagRepository;
import com.ossp.cocktagorize.data.repository.VillagePositionRepository;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class WeatherApiController {

    private final String encodedServiceKey = "LRZW5zkCYDpglLoZvNXqEhT0z%2Fe%2B7%2FeOl9BGjVA8A8i%2B2Pfg%2BTwRe47iFRTT1rynQSd%2BzEUqBrvx3oX3VyxCdw%3D%3D";

    private final VillagePositionRepository villagePositionRepository;
    private final CocktailTagRepository cocktailTagRepository;
    private final CocktailRepository cocktailRepository;
    private final TagRepository tagRepository;
    private final ApiUtils apiUtils;

    public WeatherApiController(VillagePositionRepository villagePositionRepository, CocktailTagRepository cocktailTagRepository, CocktailRepository cocktailRepository, TagRepository tagRepository, ApiUtils apiUtils) {
        this.villagePositionRepository = villagePositionRepository;
        this.cocktailTagRepository = cocktailTagRepository;
        this.cocktailRepository = cocktailRepository;
        this.tagRepository = tagRepository;
        this.apiUtils = apiUtils;
    }

    private static JSONObject getItemFromResult(String result) {
        JSONObject items;
        try {
            JSONParser parser = new JSONParser();
            JSONObject jObject = (JSONObject)parser.parse(result);
            JSONObject response = (JSONObject) jObject.get("response");
            JSONObject body = (JSONObject) response.get("body");
            items = (JSONObject) body.get("items");

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return items;
    }

    private int getTagIdByTempAndRain(double temp, int isRainy) {
        if (isRainy == 0) {
            if (temp < 5) {
                return tagRepository.findTagByName("NotRainyAndWinter").getId();
            } else if (temp >= 20) {
                return tagRepository.findTagByName("NotRainyAndSummer").getId();
            } else {
                return tagRepository.findTagByName("NotRainyAndSpring").getId();
            }

        } else if (isRainy == 1) {
            if (temp < 5) {
                return tagRepository.findTagByName("RainyAndWinter").getId();
            } else if (temp >= 20) {
                return tagRepository.findTagByName("RainyAndSummer").getId();
            } else {
                return tagRepository.findTagByName("RainyAndSpring").getId();
            }
        } else {
            System.out.println("지정되지 않은 강우 여부 값이 들어옴.");
        }

        return -1;
    }

    @GetMapping("/hahaha")
    public ResponseEntity<Boolean> haha() {
        return ResponseEntity.ok(true);
    }


    @GetMapping("/cocktail/weather")
    public List<CocktailResponseDto> getWeatherMatchCocktails(@RequestBody WeatherRequestDto weatherRequestDto) {
        // 사용자 위치 x, y
        String city = weatherRequestDto.getCity();
        String dong = weatherRequestDto.getDong();
        String gu = weatherRequestDto.getGu();

        VillagePosition villagePosition = null;

        if (gu.equals("") && dong.equals("")) {
            // ex)서울특별시 NULL NULL
            villagePosition = villagePositionRepository.findVillagePositionByCityAndDongIsNullAndGuIsNull(city);
        } else if (gu.equals("")) {
            // ex)서울특별시 종로구 NULL
            villagePosition = villagePositionRepository.findVillagePositionByCityAndDongAndGuIsNull(city, dong);
        } else {
            // ex)서울특별시 종로구 사직동
            villagePosition = villagePositionRepository.findVillagePositionByCityAndDongAndGu(city, dong, gu);
        }

        String village_x = Integer.toString(villagePosition.getX());
        String village_y = Integer.toString(villagePosition.getY());

        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH");

        String formatedNowDate, formatedNowTime;
        if (nowTime.getHour() != 0) {
            formatedNowDate = nowDate.format(dateFormatter);
            formatedNowTime = nowTime.minusHours(1).format(timeFormatter) + "00";
        } else {
            // 00시면 23시껄 불러옴
            formatedNowDate = nowDate.minusDays(1).format(dateFormatter);
            formatedNowTime = "23";
        }

        StringBuilder weatherApiURL = new StringBuilder("https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst");
        weatherApiURL.append("?" + URLEncoder.encode("serviceKey", StandardCharsets.UTF_8) + "=" + encodedServiceKey); /*Service Key*/
        weatherApiURL.append("&" + URLEncoder.encode("pageNo", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("1", StandardCharsets.UTF_8)); /*페이지번호*/
        weatherApiURL.append("&" + URLEncoder.encode("numOfRows", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("1000", StandardCharsets.UTF_8)); /*한 페이지 결과 수*/
        weatherApiURL.append("&" + URLEncoder.encode("dataType", StandardCharsets.UTF_8) + "=" + URLEncoder.encode("JSON", StandardCharsets.UTF_8)); /*요청자료형식(XML/JSON) Default: XML*/
        weatherApiURL.append("&" + URLEncoder.encode("base_date", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(formatedNowDate, StandardCharsets.UTF_8)); /*‘21년 6월 28일 발표*/
        weatherApiURL.append("&" + URLEncoder.encode("base_time", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(formatedNowTime, StandardCharsets.UTF_8)); /*06시 발표(정시단위) */
        weatherApiURL.append("&" + URLEncoder.encode("nx", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(village_x, StandardCharsets.UTF_8)); /*예보지점의 X 좌표값*/
        weatherApiURL.append("&" + URLEncoder.encode("ny", StandardCharsets.UTF_8) + "=" + URLEncoder.encode(village_y, StandardCharsets.UTF_8)); /*예보지점의 Y 좌표값*/

        String result = apiUtils.getJsonDataByURL(weatherApiURL.toString());

        System.out.println(weatherApiURL);
        System.out.println(result);

        JSONObject items = getItemFromResult(result);

        JSONArray item = apiUtils.parsingArray(items.toString(), "item");

        double temp = -1;
        int isRainy = 0;

        for (Object obj : item) {
            JSONObject jsonItem = (JSONObject) obj;

            String category = (String) jsonItem.get("category");
            String obsrValue = (String) jsonItem.get("obsrValue");

            if (category.equals("T1H")) {
                temp = Double.parseDouble(obsrValue);
            } else if (category.equals("PTY")) {
                isRainy = Integer.parseInt(obsrValue);
            } else {
                continue;
            }
        }

//        System.out.println("현재 온도 : " + temp);
//        System.out.println("현재 강우여부 : " + isRainy);

//        int weatherTagId = getTagIdByTempAndRain(temp, isRainy);
        int weatherTagId = getTagIdByTempAndRain(temp, isRainy);
        // 받아온 태그 정보들 갖고 칵테일 검색해서 JSON 으로 반환하는 로직 짜기
        List<CocktailTag> weatherCocktailTags = cocktailTagRepository.findCocktailTagsByTagId(weatherTagId);
        List<CocktailResponseDto> weatherCocktails = new ArrayList<>();

        weatherCocktailTags.forEach(cocktailTag -> {
            weatherCocktails.add(CocktailResponseDto.toEntity(cocktailTag.getCocktail()));
        });

        // 태그 리스트 담아서 보내기 구현해야 함.
        return weatherCocktails;
    }
}
