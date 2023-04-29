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
public class CocktailReply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cocktail_reply_id")
    private int id;

    @Lob
    private String content;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int liked;

    @ManyToOne
    @JoinColumn(name = "cocktail_id")
    private Cocktail cocktail;

    Timestamp createdDate;
}
