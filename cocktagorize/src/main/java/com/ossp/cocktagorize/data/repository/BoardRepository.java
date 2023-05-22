package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board,Integer> {
    public Board findById(int id);
    Board save(Board board);
    void deleteById(int id);
    Page<Board> findAllByOrderByIdDesc(Pageable pageable);
    Page<Board> findAllByOrderByTitle(Pageable pageable);
    Page<Board> findAllByOrderByLikedDesc(Pageable pageable);
    Page<Board> findAllByTitleContaining(String title,Pageable pageable);
    Page<Board> findAllByContentContaining(String content,Pageable pageable);
    List<Board> findAllByUserId(int userId);
}
