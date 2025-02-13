package org.galaxy.backend.Model;

import java.sql.Timestamp;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.*;

@Entity
@Setter
@Getter
@RequiredArgsConstructor
@Builder
@Table(name = "cart")
@AllArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String cart_id;

    private float product_price;
    private int product_quantity;

    @ManyToOne
    private Product product;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp time_add;

    @ManyToOne
    private User user;
}
