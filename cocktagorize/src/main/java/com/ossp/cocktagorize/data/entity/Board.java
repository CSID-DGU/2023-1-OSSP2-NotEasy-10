package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.type.BoardType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int id;

    @Column(nullable = false)
    private BoardType type;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int liked;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board")
    private List<BoardReply> boardReplyList = new ArrayList<BoardReply>();

    @OneToMany(mappedBy = "board")
    private List<UserLikeBoard> likeUserList = new ArrayList<UserLikeBoard>();

    private Timestamp createdDate;
}
