package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.type.BoardType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class BoardRequestDto {
    BoardType boardType;
    String content;
    String title;
}
