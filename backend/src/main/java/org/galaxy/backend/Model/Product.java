package org.galaxy.backend.Model;

import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "product")
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String product_id;

    private String name;
    private String seotitle;
    private String image;
    private Integer quantity;
    private Double price;
    private String description;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Category category;

    @ManyToOne
    private Brand brand;

    @OneToOne(mappedBy = "product")
    @JsonManagedReference
    private Promotion promotion;
}
