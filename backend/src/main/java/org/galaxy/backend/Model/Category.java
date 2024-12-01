package org.galaxy.backend.Model;

import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String category_id;

    private String ct_name;

    private String ct_seotitle;

    private Byte sort;

    private String icon;

    private String poster;

    @OneToMany(mappedBy = "category", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("category")
    private Set<Product> products;
}
