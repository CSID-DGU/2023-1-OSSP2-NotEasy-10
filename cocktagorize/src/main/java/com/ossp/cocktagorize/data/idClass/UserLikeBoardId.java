package com.ossp.cocktagorize.data.idClass;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@NoArgsConstructor
public class UserLikeBoardId implements Serializable {
    private int user;
    private int board;
}
