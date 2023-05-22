package com.ossp.cocktagorize.service;

import com.ossp.cocktagorize.data.repository.VillagePositionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class VillageService {
    private final VillagePositionRepository villagePositionRepository;

    public VillageService(VillagePositionRepository villagePositionRepository) {
        this.villagePositionRepository = villagePositionRepository;
    }

    @Transactional
    public List<String> getCityList() {
        System.out.println(villagePositionRepository.findDistinctByCity());
        return villagePositionRepository.findDistinctByCity();
    }

    @Transactional
    public List<String> getDongList(String city) {
        return villagePositionRepository.findDistinctAllByCity(city);
    }

    @Transactional
    public List<String> getGuList(String dong) {
        return villagePositionRepository.findDistinctAllByDong(dong);
    }
}
