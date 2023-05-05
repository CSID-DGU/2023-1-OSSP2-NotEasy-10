package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer>  {
    Tag findTagByName(String name);
}
