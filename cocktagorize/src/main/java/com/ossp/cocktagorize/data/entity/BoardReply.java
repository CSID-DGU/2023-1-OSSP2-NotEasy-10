package com.ossp.cocktagorize.data.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class BoardReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_reply_id")
    private int id;

    @Lob
    private String content;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    Timestamp createdDate;
}
