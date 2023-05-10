package com.ossp.cocktagorize.data.entity;

import com.ossp.cocktagorize.data.type.TagType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.util.ArrayList;
import java.util.List;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Tag {
    @Id
    @Column(name = "tag_id")
    private int id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TagType category;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int alcoholDegree;

    @OneToMany(mappedBy = "tag")
    private List<PreferTag> tagPreferUserList = new ArrayList<PreferTag>();

    @OneToMany(mappedBy = "tag")
    private List<CocktailTag> tagCocktailList = new ArrayList<CocktailTag>();
}
