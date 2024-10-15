package org.galaxy.backend.Model;

import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer category_id;

    private String name;

    private String seotitle;

    private String sort;

    private String icon;

    public Category(Integer integer) {}
}
