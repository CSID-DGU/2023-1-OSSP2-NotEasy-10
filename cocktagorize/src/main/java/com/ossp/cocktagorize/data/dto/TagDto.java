package com.ossp.cocktagorize.data.dto;

import com.ossp.cocktagorize.data.entity.CocktailTag;
import com.ossp.cocktagorize.data.entity.Tag;
import com.ossp.cocktagorize.data.type.TagType;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TagDto {
    private int id;
    private TagType category;
    private String name;

    public TagDto(Tag tag){
        id=tag.getId();
        category=tag.getCategory();
        name=tag.getName();
    }
}
