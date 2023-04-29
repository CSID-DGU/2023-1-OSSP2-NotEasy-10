package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.type.TagType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private int id;

    @Column(nullable = false)
    TagType category;

    @Column(nullable = false)
    String name;

    @OneToMany(mappedBy = "tag")
    private List<PreferTag> tagPreferUserList = new ArrayList<PreferTag>();

    @OneToMany(mappedBy = "tag")
    private List<CocktailTag> tagCocktailList = new ArrayList<CocktailTag>();
}
