package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import reactor.util.annotation.NonNullApi;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findTagByName(String name);
    List<Tag> findAll();
}
