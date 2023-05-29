package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.dto.CocktailDetailResponseDto;
import com.ossp.cocktagorize.data.dto.LikedResponseDto;
import com.ossp.cocktagorize.data.entity.Cocktail;
import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.UserLikeCocktail;
import com.ossp.cocktagorize.data.repository.*;
import com.ossp.cocktagorize.data.type.TagType;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;


@Service
public class CocktailDetailservice {

    @Autowired
    private CocktailDetailrepository cocktailDetailrepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserLikeCocktailRepository userLikeCocktailRepository;
    @Autowired
    private CocktailTagRepository cocktailTagRepository;
    @Autowired
    private CocktailRepository cocktailRepository;

    private final double PORTION = 0.4;

    @Transactional
    public CocktailDetailResponseDto getCocktailDetailAndLike(int id,Authentication authentication){
        Cocktail cocktail = cocktailDetailrepository.findById(id);
        Cocktail similar = getSimilarCocktail(id);
        return new CocktailDetailResponseDto(cocktail,similar,userLikeCocktailRepository.findByCocktailIdAndUserId(id,userRepository.findByUsername(authentication.getName()).getId()));
    }


    @Transactional
    public CocktailDetailResponseDto getCocktailDetail(int id){
        Cocktail cocktail = cocktailDetailrepository.findById(id);
        Cocktail similar = getSimilarCocktail(id);
        return new CocktailDetailResponseDto(cocktail,similar);
    }

    @Transactional
    public LikedResponseDto likeCocktail(int cocktail_id, Authentication authentication){
        int userId=userRepository.findByUsername(authentication.getName()).getId();
        Optional<UserLikeCocktail> userLikeCocktail=userLikeCocktailRepository.findByCocktailIdAndUserId(cocktail_id,userId);
        int liked;

        if(userLikeCocktail.isPresent()){
            userLikeCocktailRepository.deleteByCocktailIdAndUserId(cocktail_id,userLikeCocktail.get().getUser().getId());
            Cocktail cocktail=cocktailDetailrepository.findById(cocktail_id);
            liked = cocktail.getLiked() - 1;
            cocktail.setLiked(liked);
        }
        else {
            UserLikeCocktail userLikedCocktail=new UserLikeCocktail();
            userLikedCocktail.setCocktail(cocktailDetailrepository.findById(cocktail_id));
            userLikedCocktail.setUser(userRepository.findById(userId));
            UserLikeCocktail userLikedCocktail1=userLikeCocktailRepository.save(userLikedCocktail);

            Cocktail cocktail=cocktailDetailrepository.findById(cocktail_id);
            liked = cocktail.getLiked() + 1;
            cocktail.setLiked(liked);
        }
        return new LikedResponseDto(liked);
    }

    @Transactional
    private Cocktail getSimilarCocktail(int id) {
        Cocktail cocktail = cocktailDetailrepository.findById(id);

        List<CocktailTag> tagList=new ArrayList<>();

        // <cocktailId, score> 형식으로 저장
        HashMap<Integer, Integer> scoreList = new HashMap<>();

        // 최종적으로 선택된 칵테일들
        List<Integer> finalCocktailIdList = new ArrayList<>();

        int totalScore = 0;

        for(CocktailTag tag:cocktail.getCocktailTagList()){
            int tagId=tag.getTag().getId();

            if (tag.getTag().getCategory() != TagType.COLOR) {
                totalScore += getScore(tag);
            }

            if(tagId<643||tagId>648) {
                cocktailTagRepository.findCocktailTagsByTagId(tagId).forEach(cocktailTag -> {
                    Cocktail ckt = cocktailTag.getCocktail();
                    if (cocktail.getId() != ckt.getId()) {

                        // 같은 태그가 COLOR 라면 무조건 후보에 추가
                        if (cocktailTag.getTag().getCategory() == TagType.COLOR) {
                            finalCocktailIdList.add(ckt.getId());
                        } else {
                            // 처음 발견 되었으면 새로이 추가
                            if (!scoreList.containsKey(ckt.getId())) {
                                scoreList.put(ckt.getId(), getScore(cocktailTag));

                                //  이미 있던 태그라면 점수 추가
                            } else {
                                scoreList.put(ckt.getId(), scoreList.get(ckt.getId()) + getScore(cocktailTag));
                            }
                        }
                    }
                });
            }
        }

        System.out.println("자신의 태그 점수 : " + totalScore + ", 기준치 : " + totalScore*PORTION);
        System.out.println("색 같은거 리스트 : " + finalCocktailIdList);


        int maxScore = -1;
        int maxScoreId = -1;
        for (Map.Entry<Integer, Integer> entry : scoreList.entrySet()) {
            Integer key = entry.getKey();
            Integer value = entry.getValue();

            if (value >= maxScore) {
                maxScoreId = key;
                maxScore = value;
            }

            if (value >= totalScore * PORTION) {
                finalCocktailIdList.add(key);
            }
        }

        Random random=new Random();
        random.setSeed(System.currentTimeMillis());

        Cocktail similar = null;

        System.out.println("Max score : " + maxScore + ", Max Score Id : " + maxScoreId);

        if (finalCocktailIdList.size() != 0) {
            int randomIdx = random.nextInt(finalCocktailIdList.size());
            similar = cocktailRepository.findById(finalCocktailIdList.get(randomIdx)).get();
            System.out.println("기준치 넘는거 존재함");
            System.out.println("기준치 넘는거 리스트 : " + finalCocktailIdList);
            System.out.println("기준치 안 넘는거 리스트 : " + scoreList.entrySet());
        } else {
            similar = cocktailRepository.findById(maxScoreId);
            System.out.println("기준치 넘는거 존재하지 않음");
            System.out.println("기준치 넘는거 리스트 : " + finalCocktailIdList);
            System.out.println("기준치 안 넘는거 리스트 : " + scoreList.entrySet());
        }

        return similar;
    }

    private int getScore(CocktailTag tag) {
        if (tag.getTag().getCategory() == TagType.ALCOHOL) {
            return 9;
        }
        if (tag.getTag().getCategory() == TagType.BITTER) {
            return 6;
        }
        if (tag.getTag().getCategory() == TagType.JUICE) {
            return 6;
        }
        if (tag.getTag().getCategory() == TagType.MILK) {
            return 6;
        }
        if (tag.getTag().getCategory() == TagType.SYRUP) {
            return 3;
        }

        return 1;
    }


}
