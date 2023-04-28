package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.idClass.UserLikeBoardId;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@IdClass(UserLikeBoardId.class)
public class UserLikeBoard {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
}
