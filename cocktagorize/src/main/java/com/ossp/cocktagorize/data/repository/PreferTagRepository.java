package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.PreferTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreferTagRepository extends JpaRepository<PreferTag,Integer> {
    List<PreferTag> findPreferTagsByUserId(int userId);
}
