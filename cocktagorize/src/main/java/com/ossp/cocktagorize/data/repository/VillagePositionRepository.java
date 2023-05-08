package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.VillagePosition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VillagePositionRepository extends JpaRepository<VillagePosition, Integer> {
    VillagePosition findVillagePositionByCityAndDongIsNullAndGuIsNull(String city);
    VillagePosition findVillagePositionByCityAndDongAndGuIsNull(String city, String dong);
    VillagePosition findVillagePositionByCityAndDongAndGu(String city, String dong, String gu);
    VillagePosition findVillagePositionById(int id);
}
