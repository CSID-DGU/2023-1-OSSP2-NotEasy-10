package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.VillagePosition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VillagePositionRepository extends JpaRepository<VillagePosition, Integer> {
    VillagePosition findVillagePositionByCityAndDongIsNullAndGuIsNull(String city);
    VillagePosition findVillagePositionByCityAndDongAndGuIsNull(String city, String dong);
    VillagePosition findVillagePositionByCityAndDongAndGu(String city, String dong, String gu);
    VillagePosition findVillagePositionById(int id);

    @Query(value = "SELECT DISTINCT v.city from VillagePosition v")
    List<String> findDistinctByCity();
    @Query(value = "SELECT DISTINCT v.dong from VillagePosition v where v.city=:city")
    List<String> findDistinctAllByCity(@Param("city") String city);
    @Query(value = "SELECT DISTINCT v.gu from VillagePosition v where v.dong=:dong")
    List<String> findDistinctAllByDong(@Param("dong") String dong);
}
