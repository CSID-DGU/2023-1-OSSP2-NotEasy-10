package com.ossp.cocktagorize.data.idClass;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@EqualsAndHashCode
@NoArgsConstructor
public class CocktailTagId implements Serializable {
    private int cocktail;
    private int tag;
}
