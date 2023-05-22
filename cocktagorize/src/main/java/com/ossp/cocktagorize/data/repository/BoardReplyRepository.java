package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.BoardReply;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardReplyRepository extends JpaRepository<BoardReply,Integer> {
    @Transactional
    BoardReply save(BoardReply boardReply);
    List<BoardReply> findAllByBoardId(int id);
    @Transactional
    void deleteById(int id);
    BoardReply findById(int id);

}
