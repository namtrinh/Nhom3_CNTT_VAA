package org.galaxy.backend.Model;

import java.util.Set;

import jakarta.persistence.*;

import org.hibernate.annotations.GenericGenerator;

import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@Table(name = "order_detail")
@NoArgsConstructor
public class OrderDetail {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private String order_detail_id;

    private Integer total_amount;

    private Double total_price;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Product> products;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<Promotion> promotion;
}
