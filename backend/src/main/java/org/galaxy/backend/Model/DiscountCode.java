package org.galaxy.backend.Model;

import jakarta.persistence.*;

@Entity
public class DiscountCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;
    private Double discountPercentage;

    @ManyToOne
    private Promotion promotion;
}
