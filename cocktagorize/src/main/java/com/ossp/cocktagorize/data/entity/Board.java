package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.type.BoardType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BoardType type;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    @ColumnDefault("0")
    @Column(nullable = false)
    private int liked;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE)
    private List<BoardReply> boardReplyList = new ArrayList<BoardReply>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.REMOVE)
    private List<UserLikeBoard> likeUserList = new ArrayList<UserLikeBoard>();

    @CreationTimestamp
    private Timestamp createdDate;
}
