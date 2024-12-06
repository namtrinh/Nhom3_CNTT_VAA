package org.galaxy.backend.Model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.*;
import org.springframework.cglib.core.Local;

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
    @GeneratedValue(strategy = GenerationType.UUID)
    private String product_id;

    private String name;
    private String seotitle;
    private String image;
    private Integer quantity;
    private Double price;
    private String description;

    @Enumerated(EnumType.STRING)
    private StockStatusPr stockStatus;


    private LocalDateTime time_created = LocalDateTime.now();

    @ManyToOne
    @JsonIgnoreProperties("products")
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties("product")
    private Promotion promotion;

    public enum StockStatusPr{
            In_Stock, Out_of_Stock
    }

    private String clazz_;


}
