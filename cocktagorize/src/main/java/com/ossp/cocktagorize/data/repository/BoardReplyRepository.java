package com.ossp.cocktagorize.data.repository;

import com.ossp.cocktagorize.data.entity.BoardReply;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardReplyRepository extends JpaRepository<BoardReply,Integer> {
    @Transactional
    BoardReply save(BoardReply boardReply);

    @Transactional
    void deleteById(int id);
    BoardReply findById(int id);

}
