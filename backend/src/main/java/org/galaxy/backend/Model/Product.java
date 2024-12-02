package org.galaxy.backend.Model;

import java.sql.Timestamp;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "product")

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

    @Enumerated(EnumType.STRING)
    private StockStatusPr stockStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_created;

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties("product")
    private Promotion promotion;

    public enum StockStatusPr{
            In_Stock, Out_of_Stock
    }
}
