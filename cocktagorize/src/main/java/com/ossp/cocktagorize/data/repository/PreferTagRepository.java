package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.PreferTag;
import com.ossp.cocktagorize.data.idClass.PreferTagId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PreferTagRepository extends JpaRepository<PreferTag, PreferTagId> {
}
