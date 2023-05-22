package com.ossp.cocktagorize.controller;

import com.ossp.cocktagorize.service.VillageService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
public class VillageController {

    private final VillageService villageService;

    public VillageController(VillageService villageService) {
        this.villageService = villageService;
    }

    @GetMapping("/city")
    public List<String> getCity() {
        return villageService.getCityList();
    }

    @GetMapping("/dong")
    public List<String> getDongByCity(@RequestParam String city) {
        System.out.println(city);
        return villageService.getDongList(city);
    }

    @GetMapping("/gu")
    public List<String> getGuByDong(@RequestParam String dong) {
        System.out.println(dong);
        return villageService.getGuList(dong);
    }
}
